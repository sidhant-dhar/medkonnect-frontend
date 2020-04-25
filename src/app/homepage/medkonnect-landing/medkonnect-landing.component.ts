import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SharedService } from '../../common/services/shared-service.service';
import { AuthService } from '../../common/services/authentication/auth.service';
import { first } from 'rxjs/operators';


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
  public returnUrl: string;
  public loading: boolean;
  public error = '';

  constructor(
    private readonly router: Router,
    private route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private sharedService: SharedService,
    private authService: AuthService
  ) {
     // redirect to home if already logged in
     if (this.authService.currentUserValue) {
      this.router.navigate(['/dash']);
    }

    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
      confirmPassword: ['', [Validators.required]]
    },
    {validator: this.passwordConfirming});

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
        this.login();
      } else if (res === 'signUp' && this.needFlag) {
        this.router.navigate(['/need']);             // Have and need may be clubbed to a single page at a later date
        this.onChangeData(this.signupForm.controls.email.value, this.signupForm.controls.password.value);
      } else if (res === 'signUp' && this.provideFlag) {
        this.router.navigate(['/have']);
        this.onChangeData(this.signupForm.controls.email, this.signupForm.controls.password);
      }
   }

   public login(): void {

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
        .pipe(first())
        .subscribe(
            data => {
                console.log('success', data);
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
   }

   public ngOnInit() {
    this.sharedService.currentData.subscribe(data => this.data = data);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dash';  // test
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

  public passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
        return {invalid: true};
    }
}
}
