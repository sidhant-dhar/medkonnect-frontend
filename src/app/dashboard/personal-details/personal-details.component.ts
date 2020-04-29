import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../common/services/authentication/auth.service';

@Component({
  selector: 'ncov-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  public personalData: any;
  public logoutFlag: boolean;
  public showRegistration = true;
  constructor(
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe( x => {
      if (x) {
      this.personalData = x.userData.profile[0];
      console.log(this.personalData, 'personal data');
      if (this.personalData.company_registration_number === '') {
        this.showRegistration = false;
      }
      this.logoutFlag = false;
    }
    });
   }

  public ngOnInit() {
  }

}
