import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/authentication/auth.service';
import { Router } from '@angular/router';
import { PersonalData } from '../common/models/hospitalmodel';

@Component({
  selector: 'ncov-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public mobile: boolean;
  public logoutFlag: boolean;
  public personalData: PersonalData;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.authService.currentUser.subscribe( x => {
      this.personalData = x.userData.profile[0];
      console.log(this.personalData, 'personal data');
      this.logoutFlag = false;
    });
   }

   public logout(): void {
     this.authService.logout();
     this.router.navigate(['/home']);
   }

  public ngOnInit() {
      if (window.screen.width === 360) { // 768px portrait
        this.mobile = true;
      }
    }
}
