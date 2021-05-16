import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddscreenComponent } from './addscreen/addscreen.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoggedoutComponent } from './loggedout/loggedout.component';

const routes: Routes = [
  // { path: 'movies/:userName', component: MoviesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'loggedout', component: LoggedoutComponent },
  { path: '**', component: AddscreenComponent },
  { path: 'edit/:id', component: AddscreenComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
