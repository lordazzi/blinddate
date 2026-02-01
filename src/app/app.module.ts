import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AsyncModalModule } from '@belomonte/async-modal-ngx';
import { NgIconsModule, provideNgIconsConfig } from '@ng-icons/core';
import { tablerHeart, tablerHeartBroken } from '@ng-icons/tabler-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatingModule } from './pages/chating/chating.module';
import { SearchingBlinddateModule } from './pages/searching-blinddate/searching-blinddate.module';
import { SelectAttractedGenderModule } from './pages/select-attracted-gender/select-attracted-gender.module';
import { SelectUserGenderModule } from './pages/select-user-gender/select-user-gender.module';
import { DisconnectModalModule } from './shared/disconnect-modal/disconnect-modal.module';
import { ErrorHandlingModule } from './shared/error-handling/error-handling.module';
import { ParodyConfigModule } from './shared/parody-config/parody-config.module';
import { TryAgainModule } from './pages/try-again/try-again.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AsyncModalModule,
    NgIconsModule.withIcons({
      tablerHeart,
      tablerHeartBroken
    }),
    ChatingModule,
    TryAgainModule,
    ParodyConfigModule,
    ErrorHandlingModule,
    DisconnectModalModule,
    SelectUserGenderModule,
    SearchingBlinddateModule,
    SelectAttractedGenderModule
  ],
  providers: [
    provideNgIconsConfig({
      size: '1rem'
    })
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
