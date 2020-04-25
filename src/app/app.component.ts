import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'ncov-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'isso-ncov-frontend';
  public isRouteDashboard: boolean;

  constructor(
    private readonly router: Router
  ) {
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationStart) {
        this.isRouteDashboard = routerEvent.url === '/dash';
      }
    });
  }
}
