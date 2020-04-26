import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {BuildppeComponent } from './buildppe/buildppe.component';
import {NeedppeComponent} from './needppe/needppe.component';
import {HaveppeComponent} from './haveppe/haveppe.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TncComponent } from './tnc/tnc.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthguardService} from './common/services/authentication/authguard.service';
import { SubmitBidComponent } from './dashboard/submit-bid/submit-bid.component';

const routes: Routes = [

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomepageComponent},
  {path: 'build', component: BuildppeComponent},
  {path: 'need', component: NeedppeComponent},
  {path: 'have', component: HaveppeComponent},
  {path: 'submitbid', component: SubmitBidComponent},
  {path: 'about', component: AboutUsComponent},
  {path: 'tnc', component: TncComponent},
  {path: 'dash', component: DashboardComponent, canActivate: [AuthguardService]},
  { path: '**', component: HomepageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
