import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AirlineListComponent } from './pages/airline-list/airline-list.component';
import { canActivate } from './guards/auth.guard';
import { AppRoles } from './app.roles';
import { AirlineDetailComponent } from './pages/airline-detail/airline-detail.component';
import { AircraftDetailsComponent } from './pages/aircraft-details/aircraft-details.component';
import { AircraftListComponent } from './pages/aircraft-list/aircraft-list.component';
import { PassengerListComponent } from './pages/passenger-list/passenger-list.component';
import { PassengerDetailComponent } from './pages/passenger-detail/passenger-detail.component';

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
