import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { PPEItemResponse, PPEItem, DialogActionOptions } from '../../common/models/models';
import { DialogService } from '../../common/components/dialog/dialog.service';
import { Router } from '@angular/router';
import { SharedService } from '../../common/services/shared-service.service';
import { SubmitBidService } from './submit-bid.service';
export interface PPEListInterface {
  ppeName: string;
  ppeCost: string;
}

@Component({
  selector: 'ncov-submit-bid',
  templateUrl: './submit-bid.component.html',
  styleUrls: ['./submit-bid.component.scss']
})


export class SubmitBidComponent implements OnInit {

  public submitbidForm: FormGroup;
  public materialsRequired: FormGroup;
  // public ppeList: PPEItem[];
  public addFlag = true;
  public ppeItemSelected = true;
  public data: any;
  public ppeList: PPEListInterface[];
  public newlist: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogService: DialogService,
    private readonly router: Router,
    private sharedService: SharedService,
    private submitBidService: SubmitBidService
  ) {
    this.submitbidForm = this.formBuilder.group({
      logisticsHelp: ['false'],
      hospitalNgo: [''],
      requesterId: [''],
      ppes : new FormArray([]),
      s3Key: [null]
    });
    this.sharedService.bidData.subscribe(data => this.data = data); // getting row data from live-demands component using behaviour subject
    console.log(this.data);

    this.ppeList = this.data.ppe.split(',');
    this.newlist = this.strings_to_object(this.ppeList);
    this.newlist.map(obj => {

      obj.ppeCost = 'ppeCost';
    });
    console.log(this.newlist);
    this.submitbidForm.patchValue({
      hospitalNgo: this.data.hospitalNgo,
      requesterId: this.data.requestorId
    });
    this.createRequiredPPeList();

    console.log(this.submitbidForm);

  }

  public onTogglePpe(index: number): void {
    const ppeFormArray = this.submitbidForm.get('ppes') as FormArray;
    const ppeFormArrayValue = ppeFormArray.value;
    const ppeName = this.newlist[index].ppeName;
    if (ppeFormArrayValue[index][ppeName]) {
      ppeFormArray.controls[index]['controls'].ppeCost.enable();
      ppeFormArray.controls[index]['controls'].ppeCost.setValidators([Validators.required]);
     } // else {
    //   if (ppeName === 'Others') {
    //     ppeFormArray.controls[index]['controls'].other.disable();
    //   }
    //   ppeFormArray.controls[index]['controls'].quantity.disable();
    //   // Removes validators when ppe item is unchecked
    //   ppeFormArray.controls[index]['controls'].quantity.setValidators(null);
    // }
  }


  public onSubmit() {
    // create a deep copy of the form-model
   this.submitbidForm.controls['ppes'].enable();
    const result = Object.assign({}, this.submitbidForm.value);
    result.ppes = Object.assign({}, result.ppes);
    const reqBody = {...this.submitbidForm.value};
    console.log(reqBody, 'reqbody');
    const matRequired = reqBody.ppes.reduce((acc, cur) => {
      const ppeItem = Object.keys(cur)[0];
      const lastElementOfString = ppeItem.split(/[, ]+/).pop();
      if (cur.ppeCost && cur[ppeItem]) {
        acc.push({
          ppeCost: cur.ppeCost,
        //  certifiedPpe: result.homeMade,
        //  maxPrice: result.maxPrice,
        //  needBy: result.needBy,
        //  city: result.city,
        //  hospitalNgo: result.hospitalNgo,
          ppeName: ppeItem === 'Others' ? cur.other : lastElementOfString
        });
      }
      return acc;
    }, []);
    console.log(matRequired);
    // delete reqBody.materialsRequired;
    // delete reqBody.tnc;
    // const finalBody =  {
    //   ...reqBody ,
    //   ppes: ''
    // };
    // finalBody.ppes = Object.assign(matRequired);
    this.ppeItemSelected = matRequired.length > 0;
    if (!this.ppeItemSelected) {
      return;
     }
    // reqBody.push(matRequired);
    delete reqBody.ppes;
    reqBody.ppes = matRequired;
    console.log(reqBody);
    this.submitBidService.submit(reqBody).subscribe((res) => {
      console.log(res);
      this.submitbidForm.reset();
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

    }, () => {
      this.dialogService.open({
        title: 'Error!',
        content: 'Request cannot be processed, please try again after sometime',
        actions: [{primary: true, text: 'Ok'}]
      });
    });
  }

  public toggleAdd(element) {
    console.log('toggleAdd: ', this.submitbidForm);
    if (this.addFlag) {
      this.submitbidForm.controls['ppes'].disable();
      this.addFlag = !this.addFlag;
      element.textContent = 'Edit';
    } else {
      this.submitbidForm.controls['ppes'].enable();
      this.addFlag = !this.addFlag;
      element.textContent = 'Add';
    }
  }

  get formArr() {
    return this.submitbidForm.get('ppes') as FormArray;
  }

  public createRequiredPPeList(): void {
    console.log('new list ', this.newlist);
    this.newlist.forEach((item: PPEListInterface, i) => {
      const fg = this.formBuilder.group({});
      fg.addControl(this.newlist[i].ppeName, this.formBuilder.control(false));
      fg.addControl(this.newlist[i].ppeCost, this.formBuilder.control(null));
      this.formArr.push(fg);
    });
  }

  public strings_to_object(array) { // converts string to object adds ppename to each string

    // Initialize new empty array
    const objects = [];


    // Loop through the array
    for (let i = 0; i < array.length; i++) {
      // Create the object in the format you want
      const obj = {'ppeName' : array[i]};
      // Add it to the array
      objects.push(obj);
    }

    // Return the new array
    return objects;
  }

  public ngOnInit() {

  }

}
