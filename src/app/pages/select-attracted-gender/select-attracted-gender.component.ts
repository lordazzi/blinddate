import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, timer } from 'rxjs';
import { Gender } from '../../domain/gender.enum';

@Component({
  selector: 'blind-select-attracted-gender',
  templateUrl: './select-attracted-gender.component.html',
  styleUrl: './select-attracted-gender.component.scss'
})
export class SelectAttractedGenderComponent implements OnInit {

  genderMale = Gender.MALE;
  genderFemale = Gender.FEMALE;

  attracted: Gender | null = null;
  animateOut = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.validateRouteData();
  }
  
  private validateRouteData(): void {
    const user = history.state.user;

    if (!user) {
      this.router.navigate(['select-gender']);
    }  
  }

  async attractedChoose(gender: Gender | null): Promise<void> {
    const user = history.state.user;
    this.attracted = gender;
    await firstValueFrom(timer(800));
    this.animateOut = true;
    await firstValueFrom(timer(700));
    await this.router.navigate(['/searching'], {
      state: {
        user,
        search: this.attracted
      }
    });
  }
}
