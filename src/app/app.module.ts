import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterOutlet } from '@angular/router';
import { AuthConfig, OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';

import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AutofocusDirective } from './directives/autofocus-directive';
import { IsInRoleDirective } from './directives/is.in.role.directive';
import { IsInRolesDirective } from './directives/is.in.roles.directive';
import { HttpXSRFInterceptor } from './interceptors/http.csrf.interceptor';
import { AircraftDetailsComponent } from './pages/aircraft-details/aircraft-details.component';
import { AircraftListComponent } from './pages/aircraft-list/aircraft-list.component';
import { AirlineDetailComponent } from './pages/airline-detail/airline-detail.component';
import { AirlineListComponent } from './pages/airline-list/airline-list.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PassengerDetailComponent } from './pages/passenger-detail/passenger-detail.component';
import { PassengerListComponent } from './pages/passenger-list/passenger-list.component';
import { SeatListComponent } from './pages/seat-list/seat-list.component';
import { AuthService } from './services/auth.service';
import { FlightDetailComponent } from './pages/flight-detail/flight-detail.component';
import { FlightListComponent } from './pages/flight-list/flight-list.component';



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
    ConfirmDialogComponent,
    LoginComponent,
    HomeComponent,
    AirlineListComponent,
    AirlineDetailComponent,
    AircraftListComponent,
    AircraftDetailsComponent,
    PassengerListComponent,
    PassengerDetailComponent,
    SeatListComponent,
    FlightDetailComponent,
    FlightListComponent,
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
