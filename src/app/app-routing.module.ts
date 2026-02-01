import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatingComponent } from './pages/chating/chating.component';
import { SearchingBlinddateComponent } from './pages/searching-blinddate/searching-blinddate.component';
import { SelectAttractedGenderComponent } from './pages/select-attracted-gender/select-attracted-gender.component';
import { SelectUserGenderComponent } from './pages/select-user-gender/select-user-gender.component';
import { TryAgainComponent } from './pages/try-again/try-again.component';

const routes: Routes = [
  {
    path: 'select-gender',
    component: SelectUserGenderComponent
  },

  {
    path: 'attracted',
    component: SelectAttractedGenderComponent
  },

  {
    path: 'searching',
    component: SearchingBlinddateComponent
  },

  {
    path: 'chating',
    component: ChatingComponent
  },

  {
    path: 'try-again',
    component: TryAgainComponent
  },

  {
    path: '',
    redirectTo: 'select-gender',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }