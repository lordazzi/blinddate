import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@belomonte/async-modal-ngx';
import { FindStrangerParody, TalkToStrangerParody } from '@belomonte/ngx-parody-api';
import { NostrEvent } from '@nostrify/nostrify';
import { Subscription } from 'rxjs';
import { ChatParticipant } from '../../domain/chat-participant.model';
import { Gender } from '../../domain/gender.enum';
import { Message } from '../../domain/message.model';
import { DisconnectModalComponent } from '../../shared/disconnect-modal/disconnect-modal.component';
import { GlobalErrorHandler } from '../../shared/error-handling/global.error-handler';
import { HeaderTitleFactory } from './header-title.factory';

@Component({
  selector: 'blind-chating',
  templateUrl: './chating.component.html',
  styleUrl: './chating.component.scss',
  providers: [
    HeaderTitleFactory
  ]
})
export class ChatingComponent implements OnInit, OnDestroy {

  @ViewChild('history')
  historyElement!: ElementRef;

  title: {
    who: string,
    adjective: string
  } | null = null;
  messages = new Array<Message>();

  genderMale = Gender.MALE;
  genderFemale = Gender.FEMALE;

  youDisconnected = false;
  partnerDisconnected = false;

  userIsTyping = false;
  partnerIsTyping = false;

  userGender!: Gender;
  searchGender!: Gender;

  partner!: ChatParticipant;
  user!: ChatParticipant;
  typingTimeoutId = 0;

  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private findStrangerParody: FindStrangerParody,
    private globalErrorHandler: GlobalErrorHandler,
    private headerTitleFactory: HeaderTitleFactory,
    private talkToStrangerParody: TalkToStrangerParody,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.fetchRouteData();
    this.generateTitle();
    this.scrollBottom();
    this.startConversation();
    this.listenCurrentUser();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  triggerDisconnect(): void {
    if (this.youDisconnected || this.partnerDisconnected) {
      this.redirectTryAgain();
    } else {
      this.modalService
      .createModal(DisconnectModalComponent)
      .build()
      .subscribe({
        next: response => {
          if (response) {
            this.findStrangerParody
              .endSession()
              .then(() => this.redirectTryAgain());
          }
        }
      });
    }
  }

  private redirectTryAgain(): void {
    this.router.navigate(['/try-again'], {
      state: {
        user: this.userGender,
        search: this.searchGender
      }
    });
  }

  private fetchRouteData(): void {
    const { user, search, partner } = history.state;

    this.userGender = user;
    this.searchGender = search;
    this.partner = partner;
  }

  private scrollBottom(): void {
    setTimeout(() => {
      const el = this.historyElement.nativeElement;
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth'
      });
    });
  }

  private generateTitle(): void {
    this.title = this.headerTitleFactory.getTitle(this.searchGender);
  }

  private startConversation(): void {
    this.subscriptions.add(this.talkToStrangerParody
      .listenMessages(this.partner)
      .subscribe({
        next: event => this.addMessageFromPartner(event)
      }));

    this.subscriptions.add(this.talkToStrangerParody
      .listenStrangerStatus(this.partner)
      .subscribe({
        next: event => this.onPartnerStatusChange(event)
      }));
  }

  private onPartnerStatusChange(event: NostrEvent): void {
    if (event.content === 'typing') {
      this.partnerIsTyping = true;
      this.scrollConversationToTheEnd();
    } else if (event.content === 'disconnected') {
      this.partnerIsTyping = false;
      this.youDisconnected = false;
      this.partnerDisconnected = true;
      this.findStrangerParody.endSession();
    } else {
      this.partnerIsTyping = false;
    }
  }

  private listenCurrentUser(): void {
    this.subscriptions.add(this.talkToStrangerParody.listenCurrentUser().subscribe(
      user => {
        this.user = {
          ...user,
          gender: this.userGender,
          me: true
        };
      }
    ));
  }

  private addMessageFromPartner(event: NostrEvent): void {
    this.talkToStrangerParody
      .openEncryptedDirectMessage(this.partner, event)
      .then(text => {
        const paragraphs = text
          .replace(/\r/g, '')
          .split('\n')
          .map(p => p.trim());

        this.messages.push({
          paragraphs,
          author: this.partner,
          time: event.created_at
        });

        this.scrollConversationToTheEnd();
      });
  }

  scrollConversationToTheEnd(): void {
    setTimeout(() => {
      const el = this.historyElement.nativeElement;
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth'
      });
    });
  }

  async sendMessage(el: { value: string }): Promise<void> {
    const text = el.value;
    const partner = this.partner;
    setTimeout(() => {
      el.value = '';
      this.userIsTyping = false;
    });

    if (partner && text.length) {
      const message: Message = {
        author: this.user,
        paragraphs: text.split('\n'),
        time: Math.floor(new Date().getTime() / 1000)
      };

      this.messages.push(message);
      this.scrollConversationToTheEnd();

      try {
        const typingPromise = this.talkToStrangerParody.stopTyping();
        const messagePromise = this.talkToStrangerParody.sendMessage(partner, text);
        await Promise.all([typingPromise, messagePromise]);
      } catch (e) {
        message.error = this.globalErrorHandler.getErrorMessage(e as Error).join('; ');
      }
    }
  }

  onTyping(): void {
    const typingTimeoutAmount = 2_000;
    this.userIsTyping = true;
    if (!this.typingTimeoutId) {
      this.talkToStrangerParody.isTyping();
    }

    clearTimeout(this.typingTimeoutId);
    this.typingTimeoutId = Number(setTimeout(() => {
      this.talkToStrangerParody.stopTyping();
      this.typingTimeoutId = 0;
      this.userIsTyping = false;
    }, typingTimeoutAmount));
  }
}
