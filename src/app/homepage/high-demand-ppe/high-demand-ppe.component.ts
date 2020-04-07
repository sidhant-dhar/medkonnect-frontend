import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ppeItems } from './ppe-items';

@Component({
  selector: 'ncov-high-demand-ppe',
  templateUrl: './high-demand-ppe.component.html',
  styleUrls: ['./high-demand-ppe.component.scss']
})
export class HighDemandPpeComponent {

  public tilesArray = ppeItems;

  constructor(
    private readonly router: Router
  ) {}

  public onRoute(route: string): void {
    this.router.navigate([route]);
  }
}
