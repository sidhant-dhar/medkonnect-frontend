import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuildppeComponent } from './buildppe/buildppe.component';
import { NeedppeComponent } from './needppe/needppe.component';
import { HaveppeComponent } from './haveppe/haveppe.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RemoteService } from './common/services/remote.service';
import { HeaderComponent } from './header/header.component';
import { MedkonnectLandingComponent } from './homepage/medkonnect-landing/medkonnect-landing.component';

@NgModule({
  declarations: [
    AppComponent,
    BuildppeComponent,
    NeedppeComponent,
    HaveppeComponent,
    HomepageComponent,
    HeaderComponent,
    MedkonnectLandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    RemoteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
