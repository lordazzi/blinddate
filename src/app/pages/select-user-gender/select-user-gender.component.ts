import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, timer } from 'rxjs';
import { Gender } from '../../domain/gender.enum';

@Component({
  selector: 'blind-select-user-gender',
  templateUrl: './select-user-gender.component.html',
  styleUrl: './select-user-gender.component.scss'
})
export class SelectUserGenderComponent {

  genderMale = Gender.MALE;
  genderFemale = Gender.FEMALE;

  gender: Gender | null = null;

  constructor(
    private router: Router
  ) { }

  async genderChoose(gender: Gender | null): Promise<void> {
    this.gender = gender;
    await firstValueFrom(timer(1000));
    this.router.navigate(['/attracted'], {
      state: {
        user: gender
      }
    });
  }
}
