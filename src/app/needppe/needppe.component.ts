import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { NeedppeService } from './needppe.service';
import { DataService } from '../common/services/data.service';
import { PPEItemResponse, PPEItem, DialogActionOptions } from '../common/models/models';
import { DialogService } from '../common/components/dialog/dialog.service';
import { Router } from '@angular/router';
import { SharedService } from '../common/services/shared-service.service';


@Component({
  selector: 'ncov-needppe',
  templateUrl: './needppe.component.html',
  styleUrls: ['./needppe.component.scss']
})
export class NeedppeComponent implements OnInit {

  public needppeForm: FormGroup;
  public materialsRequired: FormGroup;
  public ppeList: PPEItem[];
  public states: string[];
  public isDoctor = false;
  public addFlag = true;
  public spinnerFlag = false;
  public ppeItemSelected = true;
  public mciVerifiedFlag = false;
  public data: any;

  public organisations = ['Hospitals', 'NGOs', 'Asha Workers', 'Police', 'Suppliers', 'Others'];
  // tslint:disable-next-line: max-line-length
  public emailValidationRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(?!hotmail|gmail|yahoo)(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly needppeService: NeedppeService,
    private readonly dataService: DataService,
    private readonly dialogService: DialogService,
    private readonly router: Router,
    private sharedService: SharedService
  ) {
    this.needppeForm = this.formBuilder.group({
      // name: ['', [ Validators.required ]],
      // phoneNo: ['', [ Validators.required ]],
      // MCInumber: [{value: '', disabled: true}],
      // email: ['', [ Validators.required, Validators.email, Validators.pattern(this.emailValidationRegex) ]],
      // address: ['', [ Validators.required ]],
      // state: ['Andaman and Nicobar Islands', [ Validators.required ]],
      // pinCode: ['', [ Validators.required ]],
      certifiedPpe : [true, [ Validators.required ]],
      needBy: ['', [ Validators.required ]],
      tnc: [false, [ Validators.required ]],
      hospitalNgo: ['Hospitals'],
      maxPrice: ['1', Validators.required],
      city: ['', Validators.required], // Handle this from profile information
      materialsRequired: new FormArray([])
    });
    this.dataService.getPPEList().subscribe((res: PPEItemResponse) => {
      this.ppeList = res.list;
      this.createRequiredPPeList();
      console.log(this.needppeForm);
    });
    // this.dataService.getStates().subscribe((res: {indianStates: string[]}) => {
    //   this.states = res.indianStates;
    // });
  }

  public onSubmit() {
    // create a deep copy of the form-model
    this.needppeForm.controls['materialsRequired'].enable();
    const result = Object.assign({}, this.needppeForm.value);
    result.materialsRequired = Object.assign({}, result.materialsRequired);
    const reqBody = {...this.needppeForm.value};
    console.log(reqBody, 'reqbody');
    const matRequired = reqBody.materialsRequired.reduce((acc, cur) => {
      const ppeItem = Object.keys(cur)[0];
      if (cur.quantity && cur[ppeItem]) {
        acc.push({
          qty: cur.quantity,
        //  certifiedPpe: result.homeMade,
        //  maxPrice: result.maxPrice,
        //  needBy: result.needBy,
        //  city: result.city,
        //  hospitalNgo: result.hospitalNgo,
          item: ppeItem === 'Others' ? cur.other : ppeItem
        });
      }
      return acc;
    }, []);
    // delete reqBody.homeMade;
    delete reqBody.materialsRequired;
    delete reqBody.tnc;
    const finalBody =  {
      ...reqBody ,
      ppes: ''
    };
    finalBody.ppes = Object.assign(matRequired);
    this.ppeItemSelected = finalBody.ppes.length > 0;
    if (!this.ppeItemSelected) {
      return;
    }
    console.log(finalBody);
    this.needppeService.makeRequest(finalBody).subscribe((res) => {
      console.log(res);
      this.needppeForm.reset();
      this.mciVerifiedFlag = false;
      this.dialogService.open({
        title: 'Success!',
        content: 'Request submitted successfully',
        actions: [{primary: true, text: 'Ok'}]
      });
      this.dialogService.closeDialogEvent.subscribe((event) => {
        if (event.action === 'Ok') {
          this.router.navigate(['home']);
        }
        console.log('close event', event);
      });

    }, () => {
      this.dialogService.open({
        title: 'Error!',
        content: 'Request cannot be processed, please try again after sometime',
        actions: [{primary: true, text: 'Ok'}]
      });
    });
  }

  public toggleAdd(element) {
    if (this.addFlag) {
      this.needppeForm.controls['materialsRequired'].disable();
      this.addFlag = !this.addFlag;
      element.textContent = 'Edit';
    } else {
      this.needppeForm.controls['materialsRequired'].enable();
      this.addFlag = !this.addFlag;
      element.textContent = 'Add';
    }
  }

  // public toggleDoctor(doctorClick: boolean) {
  //   if (doctorClick) {
  //     this.isDoctor = true;
  //     this.needppeForm.controls['MCInumber'].enable();
  //     this.needppeForm.controls['MCInumber'].setValidators([Validators.required]);
  //   } else {
  //     this.isDoctor = false;
  //     this.needppeForm.controls['MCInumber'].disable();
  //     this.needppeForm.controls['MCInumber'].setValidators(null);
  //     this.needppeForm.controls['MCInumber'].setValue(null);
  //     this.spinnerFlag = false;
  //   }
  // }

  // public verifyMCI() {
  //   this.spinnerFlag = true;
  //   const verifyMci = {
  //     name : '',
  //     regNo: ''
  //   };
  //   verifyMci.name = Object.assign(this.needppeForm.controls.name.value);
  //   verifyMci.regNo = Object.assign(this.needppeForm.controls.MCInumber.value);
  //   console.log(verifyMci);
  //   this.needppeService.verifyMCI(verifyMci).subscribe((res) => {
  //     console.log(res);
  //     this.spinnerFlag = false;
  //     this.mciVerifiedFlag = true; // On reset of form will the flag be reset? Need to test.
  //   }, () => {
  //     this.spinnerFlag = false;
  //     alert('The MCI number could not be verified!');
  //   });
  // }

  public onTogglePpe(index: number): void {
    const ppeFormArray = this.needppeForm.get('materialsRequired') as FormArray;
    const ppeFormArrayValue = ppeFormArray.value;
    const ppeName = this.ppeList[index].ppe;
    if (ppeFormArrayValue[index][ppeName]) {
      ppeFormArray.controls[index]['controls'].quantity.enable();
      if (ppeName === 'Others') {
        ppeFormArray.controls[index]['controls'].other.enable();
      }
      // Adds validators when ppe item is checked
      ppeFormArray.controls[index]['controls'].quantity.setValidators([Validators.required]);
    } else {
      if (ppeName === 'Others') {
        ppeFormArray.controls[index]['controls'].other.disable();
      }
      ppeFormArray.controls[index]['controls'].quantity.disable();
      // Removes validators when ppe item is unchecked
      ppeFormArray.controls[index]['controls'].quantity.setValidators(null);
    }
  }

  get formArr() {
    return this.needppeForm.get('materialsRequired') as FormArray;
  }

  public createRequiredPPeList(): void {
    this.ppeList.forEach((item: PPEItem, i) => {
      const fg = this.formBuilder.group({});
      fg.addControl(this.ppeList[i].ppe, this.formBuilder.control(false));
      fg.addControl(this.ppeList[i].required, this.formBuilder.control(null));
      fg.addControl(this.ppeList[i].otherPpe, this.formBuilder.control(null));
      fg.controls.quantity.disable();
      if (this.ppeList[i].ppe === 'Others') {
        fg.controls.other.disable();
      }
      this.formArr.push(fg);
    });
  }

  public ngOnInit() {
    this.sharedService.currentData.subscribe(data => this.data = data);
    console.log(this.data);
  }

  public getToday(): string {
    return new Date().toISOString().split('T')[0];
 }

}
