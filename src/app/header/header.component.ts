import { Component, AfterViewInit, HostBinding } from '@angular/core';
import { fromEvent } from 'rxjs';
import { first } from 'rxjs/operators';
import { VisibilityState, Direction } from '../common/enums/enums';
import { SharedService } from '../common/services/shared-service.service';
import { AuthService } from '../common/services/authentication/auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  filter,
  map,
  pairwise,
  share,
  throttleTime
} from 'rxjs/operators';

import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'ncov-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('toggle', [
      state(
        VisibilityState.Hidden,
        style({ opacity: 0, transform: 'translateY(-100%)' })
      ),
      state(
        VisibilityState.Visible,
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
      transition('* => *', animate('200ms ease-in'))
    ])
  ]
})
export class HeaderComponent implements AfterViewInit {
  public data: any;
  public loading: any;
  public error: any;
  public signupForm: FormGroup;
  public loginForm: FormGroup;
  public returnUrl: string;
  public isLoggedIn: boolean;
  constructor(
  private route: ActivatedRoute,
  private router: Router,
  public sharedService: SharedService,
  public authService: AuthService,
  private readonly formBuilder: FormBuilder
  ) {
    if (this.authService.currentUserValue) {
      this.isLoggedIn = true;
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
    this.sharedService.currentData.subscribe(data => this.data = data);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dash';  // test
  }



  public isVisible = true;
  public showActive = false;
  @HostBinding('@toggle')
  get toggle(): VisibilityState {
    return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
  }

  public ngAfterViewInit(): void {
    const scroll$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => window.pageYOffset),
      pairwise(),
      map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
      share()
    );

    const goingUp$ = scroll$.pipe(
      filter(direction => direction === Direction.Up)
    );

    const goingDown$ = scroll$.pipe(
      filter(direction => direction === Direction.Down)
    );

    goingUp$.subscribe(() => {
        this.isVisible = true;
        this.showActive = window.pageYOffset > 40;
      });
    goingDown$.subscribe(() => (this.isVisible = false));
  }

  public login() {
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

  public passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
        return {invalid: true};
    }
}

public onSubmit(res: string): void {
  if (res === 'login') {
    console.log('Login api here');
    this.login();
  } else if (res === 'signUp') {
    this.router.navigate(['/have']);             // Have and need may be clubbed to a single page at a later date
    this.onChangeData(this.signupForm.controls.email.value, this.signupForm.controls.password.value);
   }
  }

  public onChangeData(email, pass) {
    const newData = {
      email: email,
      password: pass
    };
    console.log(newData);
    this.sharedService.changeData(newData);
  }
}
