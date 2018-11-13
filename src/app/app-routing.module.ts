import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent }      from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

/*router will match URL to path: 'heroes' and display the HeroesComponent
Also matches a path to the DashboardComponent*/
const routes: Routes = [
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'detail/:id', component: HeroDetailComponent }, /*see Comments** */
	{ path: 'heroes', component: HeroesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

/*Comments
configures the router at the application's root level. 
The forRoot() method supplies the service providers and directives 
needed for routing, and performs the initial navigation based on 
the current browser URL. 

**The colon (:) in the 'detail/:id' path indicates that :id is a placeholder for a specific hero id.
*/