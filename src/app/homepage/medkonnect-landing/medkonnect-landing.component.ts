import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../common/services/shared-service.service';


@Component({
  selector: 'ncov-medkonnect-landing',
  templateUrl: './medkonnect-landing.component.html',
  styleUrls: ['./medkonnect-landing.component.scss']
})
export class MedkonnectLandingComponent implements OnInit {
  public data: any;
  public signupForm: FormGroup;
  public loginForm: FormGroup;
  public needFlag = false;
  public provideFlag = false;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private sharedService: SharedService
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
      confirmPassword: ['', [Validators.required, Validators.min(6)]]
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
    });
   }

   public setRequestFlag(flag: string): void {  // very crude method needs rework
    if (flag === 'need') {                      // We have to set both flags as there is a scenarion in which the user clicks
      this.needFlag = true;                     // on a modal and then pops out of it. That may result in both flags being true/false
      this.provideFlag = false;
    } else if (flag === 'provide') {
      this.provideFlag = true;
      this.needFlag = false;
    }
   }

   public onSubmit(res: string): void {
      if (res === 'login') {
        console.log('Login api here');
      } else if (res === 'signUp' && this.needFlag) {
        this.router.navigate(['/need']);             // Have and need may be clubbed to a single page at a later date
        this.onChangeData(this.signupForm.controls.email.value, this.signupForm.controls.password.value);
      } else if (res === 'signUp' && this.provideFlag) {
        this.router.navigate(['/have']);
        this.onChangeData(this.signupForm.controls.email, this.signupForm.controls.password);
      }
   }

   public ngOnInit() {
    this.sharedService.currentData.subscribe(data => this.data = data);
  }

  public onChangeData(email, pass) {
    const newData = {
      email: email,
      password: pass
    };
    this.sharedService.changeData(newData);
  }
  // public onRoute(route: string): void {
  //   this.router.navigate([route]);
  // }
}
