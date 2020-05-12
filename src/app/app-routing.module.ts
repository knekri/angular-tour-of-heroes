import {NgModule} from '@angular/core';
import {HeroesComponent} from './heroes/heroes.component';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './heroes/hero-detail/hero-detail.component';


const routes: Routes = [
  // typical Angular Route has two properties:
  // This tells the router to match that URL to path: 'heroes' and display the HeroesComponent
  // when the URL is something like localhost:4200/heroes.
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  // The colon (:) in the path indicates that :id is a placeholder for a specific hero id.
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

// The @NgModule metadata initializes the router and starts it listening for browser location changes
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] // AppRoutingModule exports RouterModule so it will be available throughout the app.
})
export class AppRoutingModule { }
