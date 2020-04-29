import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DataService } from '../common/services/data.service';
import { PPEItemResponse, PPEItem } from '../common/models/models';
import {HaveppeService} from './haveppe.service';
import { DialogService } from '../common/components/dialog/dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../common/services/shared-service.service';
import { AuthService } from '../common/services/authentication/auth.service';
import { first } from 'rxjs/operators';




@Component({
  selector: 'ncov-haveppe',
  templateUrl: './haveppe.component.html',
  styleUrls: ['./haveppe.component.scss']
})
export class HaveppeComponent implements OnInit {

  public haveppeForm: FormGroup;
 // public materialsRequired: FormGroup;
  public ppeList: PPEItem[];
  public addFlag = true;
  public registrationFlag = false;
  public ppeItemSelected = true;
  public data: any;
  public loading: boolean;
  public returnUrl: string;
  public error: string;
  public states: any;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dataService: DataService,
    private readonly haveppeService: HaveppeService,
    private readonly dialogService: DialogService,
    private readonly router: Router,
    private sharedService: SharedService,
    private authService: AuthService,
    public route: ActivatedRoute

  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/dash']);
    }
    this.haveppeForm = this.formBuilder.group({
     // materialsRequired: new FormArray([]),
      pinCode: ['', [ Validators.required ]],
      companyRegnNo: [''],
      // homeMade: ['true', [Validators.required]],
      name: ['', [ Validators.required ]],
      city: ['', [ Validators.required ]],
      state: ['Andaman and Nicobar Islands', [ Validators.required ]],
      address: [''],
      phoneNo: ['', [ Validators.required ]],
      tnc: [false, [ Validators.required ]]
    });
      this.dataService.getStates().subscribe((res: {indianStates: string[]}) => {
       this.states = res.indianStates;
     });
   }

  public onSubmit() {

    const result = Object.assign({}, this.haveppeForm.value);
    result.email = this.data.email;
    result.password = this.data.password;
    delete result.tnc;
    this.login(result);

  }

  public login(payload): void { // This way of using observables is absolutely wrong and must be refactored. Under severe time
                                // pressure hence churning out crap code :(.
    // stop here if form is invalid
    if (this.haveppeForm.invalid) {
        return;
    }

    this.loading = true;
    this.authService.signUp(payload)
        .pipe(first())
        .subscribe(
            res => {

              this.authService.login(this.data.email, this.data.password)
              .pipe(first())
              .subscribe(
                    data => {
                    console.log('success', data);
                    // this.router.navigate([this.returnUrl]);
                    this.dialogService.open({
                      title: 'Success!',
                      content: 'Request submitted successfully',
                      actions: [{primary: true, text: 'Ok'}]
                    });
                    this.dialogService.closeDialogEvent.subscribe((event) => {
                      if (event.action === 'Ok') {
                        this.router.navigate(['dash']);
                      }
                    });
            },
            error => {
                this.error = error;
                console.log(error, 'error login');
                this.loading = false;
                this.dialogService.open({
                  title: 'Error!',
                  content: 'Request cannot be processed, please try again after sometime',
                  actions: [{primary: true, text: 'Ok'}]
                });
            });
            },
            (error) => {
              console.log(error, 'error signup');
            });
   }

  public ngOnInit() {
    this.sharedService.currentData.subscribe(data => this.data = data);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dash';  // test
  }

}
