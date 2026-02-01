import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FindStrangerParody } from '@belomonte/ngx-parody-api';

@Component({
  selector: 'blind-searching-blinddate',
  templateUrl: './searching-blinddate.component.html',
  styleUrl: './searching-blinddate.component.scss'
})
export class SearchingBlinddateComponent implements OnInit {

  controller = new AbortController();

  constructor(
    private router: Router,
    private findStrangerParody: FindStrangerParody
  ) { }

  ngOnInit(): void {
    if (this.validateRouteData()) {
      this.findStranger();
    } else {
      this.router.navigate(['select-gender']);
    }
  }

  private validateRouteData(): boolean {
    const { user, search } = history.state;
    if (!user || !search) {
      return false;
    }

    return true;
  }

  private findStranger(): void {
    const { user, search } = history.state;
    this.controller.signal.onabort = () => console.info('ABORT WAS LAUNCHED!!');

    this.findStrangerParody
      .searchStranger({
        signal: this.controller.signal,
        searchFor: search,
        userIs: user
      })
      .then(partner => {
        this.router.navigate(['/chating'], {
          state: {
            user,
            search,
            partner: { ...partner, gender: search }
          }
        });
      }).catch(e => {
        // FIXME: preciso incluir uma modal de erro aqui
        this.controller.abort();
        this.router.navigate(['select-gender']);
      });
  }

  quit(): void {
    this.controller.abort();
    this.router.navigate(['select-gender']);
  }
}
