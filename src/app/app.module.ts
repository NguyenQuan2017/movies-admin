import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './directives/header/header.component';
import { SideBarComponent } from './directives/side-bar/side-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './pages/users/user/user.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import {FormsModule} from '@angular/forms';
import {UserService} from './services/user.service';
import {TokenService} from './services/token.service';
import {JwtInterceptor} from './helpers/jwt.interceptor';
import {AuthGuard} from './auth/auth.guard';
import {AuthenticatedService} from './services/authenticated.service';
import {AuthErrorHandler} from './auth/auth.error.handler';
import {RefreshInterceptor} from './helpers/refresh.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    UserComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    AuthGuard,
    AuthenticatedService,
    TokenService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: RefreshInterceptor ,
        multi: true
    },
    {
        provide: ErrorHandler,
        useClass: AuthErrorHandler
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
