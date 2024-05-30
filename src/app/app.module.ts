import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http'
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthConfig, OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { RouterOutlet } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { IsInRoleDirective } from './directives/is.in.role.directive';
import { IsInRolesDirective } from './directives/is.in.roles.directive';
import { AutofocusDirective } from './directives/autofocus-directive';
import { HttpXSRFInterceptor } from './interceptors/http.csrf.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AirlineListComponent } from './pages/airline-list/airline-list.component';
import { AirlineDetailComponent } from './pages/airline-detail/airline-detail.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AircraftListComponent } from './pages/aircraft-list/aircraft-list.component';
import { AircraftDetailsComponent } from './pages/aircraft-details/aircraft-details.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { PassengerListComponent } from './pages/passenger-list/passenger-list.component';
import { PassengerDetailComponent } from './pages/passenger-detail/passenger-detail.component';



export const authConfig: AuthConfig = {
  issuer: environment.authServerBaseUrl,
  requireHttps: false,
  redirectUri: environment.frontendBaseUrl,
  postLogoutRedirectUri: environment.frontendBaseUrl,
  clientId: 'ch.kunz.joshua.flugbuchungsapi',
  scope: 'openid profile roles offline_access',
  responseType: 'code',
  showDebugInformation: true,
  requestAccessToken: true,
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  silentRefreshTimeout: 500,
  clearHashAfterLogin: true,
};

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

@NgModule({
  declarations: [
    AppComponent,
    IsInRoleDirective,
    IsInRolesDirective,
    AutofocusDirective,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    AirlineListComponent,
    AirlineDetailComponent,
    ConfirmDialogComponent,
    AircraftListComponent,
    AircraftDetailsComponent,
    PassengerListComponent,
    PassengerDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterOutlet,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    OAuthModule.forRoot({ resourceServer: { sendAccessToken: true } }),
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatSelectModule,
    MatOptionModule,
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: AuthConfig, useValue: authConfig },
    { provide: HTTP_INTERCEPTORS, useClass: HttpXSRFInterceptor, multi: true },
    { provide: OAuthStorage, useFactory: storageFactory },
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private authService: AuthService) {
    authService.initAuth().finally();
  }
}
