import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ncov-medkonnect-landing',
  templateUrl: './medkonnect-landing.component.html',
  styleUrls: ['./medkonnect-landing.component.scss']
})
export class MedkonnectLandingComponent {

  constructor(
    private readonly router: Router
  ) { }

  public onRoute(route: string): void {
    this.router.navigate([route]);
  }

}
