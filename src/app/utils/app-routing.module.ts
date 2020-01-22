import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './../app.component';

// import { PageNotFoundComponent } from './containers/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'abc', component: AppComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
