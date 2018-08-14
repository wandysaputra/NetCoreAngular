import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService, ValidatorService, AuthGuardService } from './services';
import { SharedModule } from './shared/shared.module';
import { AppRoutesModule } from './app.routes.module';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { ShowPostComponent  } from './show/showPost.component';
import { ShowPostResolver } from './resolves';
import { ShowPostService } from './services';

@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      ShowPostComponent 
  ],
  imports: [
      SharedModule,     
      BrowserModule,
      Ng4LoadingSpinnerModule.forRoot(),
      AppRoutesModule
  ],
  providers: [
      AuthService, AuthGuardService, ValidatorService, ShowPostService, ShowPostResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
