import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BuildppeComponent } from './buildppe/buildppe.component';
import { NeedppeComponent } from './needppe/needppe.component';
import { HaveppeComponent } from './haveppe/haveppe.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RemoteService } from './common/services/remote.service';
import { HeaderComponent } from './header/header.component';
import { MedkonnectLandingComponent } from './homepage/medkonnect-landing/medkonnect-landing.component';
import { HighDemandPpeComponent } from './homepage/high-demand-ppe/high-demand-ppe.component';
import { MedkonnectAboutusComponent } from './homepage/medkonnect-aboutus/medkonnect-aboutus.component';
import { AlphaNumericDirective } from './common/directives/alpha-numeric/alpha-numeric.directive';
import { NumericDirective } from './common/directives/numeric/numeric.directive';
import { FooterComponent } from './footer/footer.component';
import { HomepageBuildSectionComponent } from './homepage/homepage-build-section/homepage-build-section.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { DialogComponent } from './common/components/dialog/dialog.component';
import { DialogService } from './common/components/dialog/dialog.service';
import { TncComponent } from './tnc/tnc.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorInterceptorService } from './common/services/authentication/errorInterceptor.service';
import { JwtInterceptorService } from './common/services/authentication/jwt-interceptor.service';
import { LiveDemandsComponent } from './dashboard/live-demands/live-demands.component';
import { PersonalDetailsComponent } from './dashboard/personal-details/personal-details.component';
import { SubmitBidComponent } from './dashboard/submit-bid/submit-bid.component';
import { DemandsDashboardComponent } from './homepage/demands-dashboard/demands-dashboard.component';
import { RequestHistoryComponent } from './dashboard/request-history/request-history.component';

@NgModule({
  declarations: [
    AppComponent,
    BuildppeComponent,
    NeedppeComponent,
    HaveppeComponent,
    HomepageComponent,
    HeaderComponent,
    MedkonnectLandingComponent,
    HighDemandPpeComponent,
    MedkonnectAboutusComponent,
    HighDemandPpeComponent,
    AlphaNumericDirective,
    NumericDirective,
    FooterComponent,
    HomepageBuildSectionComponent,
    AboutUsComponent,
    DialogComponent,
    TncComponent,
    DashboardComponent,
    LiveDemandsComponent,
    PersonalDetailsComponent,
    SubmitBidComponent,
    DemandsDashboardComponent,
    RequestHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    RemoteService,
    DialogService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
