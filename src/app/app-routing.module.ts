import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {BuildppeComponent } from './buildppe/buildppe.component';
import {NeedppeComponent} from './needppe/needppe.component';
import {HaveppeComponent} from './haveppe/haveppe.component';
const routes: Routes = [ 

  {path: '', redirectTo:'/home', pathMatch: 'full'},
  {path: 'home',component: HomepageComponent},
  {path: 'build', component: BuildppeComponent},
  {path: 'need', component: NeedppeComponent},
  {path: 'have', component: HaveppeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
