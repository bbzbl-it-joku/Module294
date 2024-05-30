import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoles } from './app.roles';
import { canActivate } from './guards/auth.guard';
import { AircraftDetailsComponent } from './pages/aircraft-details/aircraft-details.component';
import { AircraftListComponent } from './pages/aircraft-list/aircraft-list.component';
import { AirlineDetailComponent } from './pages/airline-detail/airline-detail.component';
import { AirlineListComponent } from './pages/airline-list/airline-list.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PassengerDetailComponent } from './pages/passenger-detail/passenger-detail.component';
import { PassengerListComponent } from './pages/passenger-list/passenger-list.component';
import { SeatListComponent } from './pages/seat-list/seat-list.component';
import { FlightDetailComponent } from './pages/flight-detail/flight-detail.component';
import { FlightListComponent } from './pages/flight-list/flight-list.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent, pathMatch: "full"
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "airlines", component: AirlineListComponent
  },
  {
    path: "airline", component: AirlineDetailComponent, canActivate: [canActivate], data: { roles: [AppRoles.Staff, AppRoles.Admin] }
  },
  {
    path: "airline/:id", component: AirlineDetailComponent, canActivate: [canActivate], data: { roles: [AppRoles.Staff, AppRoles.Admin] }
  },
  {
    path: "aircrafts", component: AircraftListComponent
  },
  {
    path: "aircraft", component: AircraftDetailsComponent, canActivate: [canActivate], data: { roles: [AppRoles.Staff, AppRoles.Admin] }
  },
  {
    path: "aircraft/:id", component: AircraftDetailsComponent, canActivate: [canActivate], data: { roles: [AppRoles.Staff, AppRoles.Admin] }
  },
  {
    path: "passengers", component: PassengerListComponent
  },
  {
    path: "passenger", component: PassengerDetailComponent, canActivate: [canActivate], data: { roles: [AppRoles.Staff, AppRoles.Admin] }
  },
  {
    path: "passenger/:id", component: PassengerDetailComponent, canActivate: [canActivate], data: { roles: [AppRoles.Staff, AppRoles.Admin] }
  },
  {
    path: "seats", component: SeatListComponent
  },
  {
    path: "flights", component: FlightListComponent
  },
  {
    path: "flight", component: FlightDetailComponent, canActivate: [canActivate], data: { roles: [AppRoles.Staff, AppRoles.Admin] }
  },
  {
    path: "flight/:id", component: FlightDetailComponent, canActivate: [canActivate], data: { roles: [AppRoles.Staff, AppRoles.Admin] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
