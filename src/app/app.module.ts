import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
    AlphaNumericDirective,
    NumericDirective
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
    RemoteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
