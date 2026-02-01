import { Component } from '@angular/core';
import { ModalableDirective } from '@belomonte/async-modal-ngx';
import { Subject } from 'rxjs';

@Component({
  selector: 'blind-disconnect-modal',
  templateUrl: './disconnect-modal.component.html',
  styleUrl: './disconnect-modal.component.scss'
})
export class DisconnectModalComponent extends ModalableDirective<void, boolean> {

  override response = new Subject<boolean | void>();
  
  breakHeart(): void {
    this.response.next(true);
    //  close method will complete the response observable
    this.close();
  }

  cancel(): void {
    this.response.next(false);
    this.close();
  }
}
