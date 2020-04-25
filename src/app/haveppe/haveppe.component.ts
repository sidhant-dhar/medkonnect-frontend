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
      address: ['', [ Validators.required ]],
      phoneNo: ['', [ Validators.required ]],
      tnc: [true, [ Validators.required ]]
    });
    // this.dataService.getPPEList().subscribe((res: PPEItemResponse) => {
    //   this.ppeList = res.list;
    //   this.createRequiredPPeList();
    // });

      this.dataService.getStates().subscribe((res: {indianStates: string[]}) => {
       this.states = res.indianStates;
     });
   }

  //  get formArr() {
  //   return this.haveppeForm.get('materialsRequired') as FormArray;
  // }

  // public createRequiredPPeList(): void {
  //   this.ppeList.forEach((item: PPEItem, i) => {
  //     const fg = this.formBuilder.group({});
  //     fg.addControl(this.ppeList[i].ppe, this.formBuilder.control(false));
  //     fg.addControl(this.ppeList[i].required, this.formBuilder.control(null));
  //     fg.addControl(this.ppeList[i].otherPpe, this.formBuilder.control(null));
  //     fg.controls.quantity.disable();
  //     if (this.ppeList[i].ppe === 'Others') {
  //       fg.controls.other.disable();
  //     }
  //     this.formArr.push(fg);
  //   });
  // }

  // public toggleAdd(element) {
  //   if (this.addFlag) {
  //     this.haveppeForm.controls['materialsRequired'].disable();
  //     this.addFlag = !this.addFlag;
  //     element.textContent = 'Edit';
  //   } else {
  //     this.haveppeForm.controls['materialsRequired'].enable();
  //     this.addFlag = !this.addFlag;
  //     element.textContent = 'Add';
  //   }
  // }

  public onSubmit() {

    // this.haveppeForm.controls['materialsRequired'].enable();
    const result = Object.assign({}, this.haveppeForm.value);
    result.email = this.data.email.value;
    result.password = this.data.password.value;
    // result.materialsRequired = Object.assign({}, result.materialsRequired);
    // const reqBody = {...this.haveppeForm.value};
    // const matRequired = reqBody.materialsRequired.reduce((acc, cur) => {
    //   const ppeItem = Object.keys(cur)[0];
    //   if (cur.quantity && cur[ppeItem]) {
    //     acc.push({
    //       quantity: cur.quantity,
    //       approved: 'true',
    //       ppeName: ppeItem === 'Others' ? cur.other : ppeItem
    //     });
    //   }
    //   return acc;
    // }, []);

    delete result.tnc;
    // const finalBody =  {
    //   newSupplierDetails : { ...reqBody } ,
    //   ppeArray: ''  // do not use spread operator as creates an array.
    // };
    // finalBody.ppeArray = Object.assign(matRequired);
    // this.ppeItemSelected = finalBody.ppeArray.length > 0;
    console.log(result);
    // if (!this.ppeItemSelected) {
    //   return;
    // }
    this.login(result);
    // this.haveppeService.vendorSignIn(result).subscribe((res) => {
    //   this.haveppeForm.reset();

    //   this.dialogService.open({
    //     title: 'Success!',
    //     content: 'Request submitted successfully',
    //     actions: [{primary: true, text: 'Ok'}]
    //   });
    //   this.dialogService.closeDialogEvent.subscribe((event) => {
    //     if (event.action === 'Ok') {
    //       this.router.navigate(['home']);
    //     }
    //     console.log('close event', event);
    //   });
    // }, () => {
    //   this.dialogService.open({
    //     title: 'Error!',
    //     content: 'Request cannot be processed, please try again after sometime',
    //     actions: [{primary: true, text: 'Ok'}]
    //   });
    // });

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

              this.authService.login(this.data.email.value, this.data.password.value)
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
                      console.log('close event', event);
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
                // console.log('success', data);

                // this.router.navigate([this.returnUrl]);
            },
            (error) => {
              console.log(error, 'error signup');
            });
   }


  // public onTogglePpe(index: number): void {
  //   const ppeFormArray = this.haveppeForm.get('materialsRequired') as FormArray;
  //   const ppeFormArrayValue = ppeFormArray.value;
  //   const ppeName = this.ppeList[index].ppe;
  //   if (ppeFormArrayValue[index][ppeName]) {
  //     ppeFormArray.controls[index]['controls'].quantity.enable();
  //     if (ppeName === 'Others') {
  //       ppeFormArray.controls[index]['controls'].other.enable();
  //     }
  //     // Adds validators when ppe item is checked
  //     ppeFormArray.controls[index]['controls'].quantity.setValidators([Validators.required]);
  //   } else {
  //     if (ppeName === 'Others') {
  //       ppeFormArray.controls[index]['controls'].other.disable();
  //     }
  //     ppeFormArray.controls[index]['controls'].quantity.disable();
  //     // Removes validators when ppe item is unchecked
  //     ppeFormArray.controls[index]['controls'].quantity.setValidators(null);
  //   }
  // }

  public ngOnInit() {
    this.sharedService.currentData.subscribe(data => this.data = data);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dash';  // test

    console.log(this.data.email.value);
    console.log(this.data.password.value);
  }

}
