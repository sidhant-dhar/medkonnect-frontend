import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ncov-high-demand-ppe',
  templateUrl: './high-demand-ppe.component.html',
  styleUrls: ['./high-demand-ppe.component.scss']
})
export class HighDemandPpeComponent {

  // Temporary array, later array with actual images will be created.
  public tilesArray = Array(6).fill({
    title: 'Covers All',
    path: 'assets/images/coversall.png'
  });

  constructor(
    private readonly router: Router
  ) {}

  public onRoute(route: string): void {
    this.router.navigate([route]);
  }
}
