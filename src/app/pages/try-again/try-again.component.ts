import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gender } from '../../domain/gender.enum';

@Component({
  selector: 'blind-try-again',
  templateUrl: './try-again.component.html',
  styleUrl: './try-again.component.scss'
})
export class TryAgainComponent implements OnInit {

  userGender!: Gender;
  searchGender!: Gender;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchRouteData();
    this.redirect();
  }

  tryAgain(): void {
    this.router.navigate(['/searching'], {
      state: {
        user: this.userGender,
        search: this.searchGender
      }
    });
  }

  quit(): void {
    this.router.navigate(['select-gender']);
  }

  private fetchRouteData(): void {
    const { user, search } = history.state;

    this.userGender = user;
    this.searchGender = search;
  }

  private redirect(): void {
    if (!this.userGender || !this.searchGender) {
      this.quit();
    }
  }
}
