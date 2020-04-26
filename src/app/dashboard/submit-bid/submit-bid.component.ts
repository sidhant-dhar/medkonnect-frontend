import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DataService } from '../../common/services/data.service';
import { PPEItemResponse, PPEItem, DialogActionOptions } from '../../common/models/models';
import { DialogService } from '../../common/components/dialog/dialog.service';
import { Router } from '@angular/router';
import { SharedService } from '../../common/services/shared-service.service';
import { NeedppeService } from '../../needppe/needppe.service';
import { SubmitBidService } from './submit-bid.service';


@Component({
  selector: 'ncov-submit-bid',
  templateUrl: './submit-bid.component.html',
  styleUrls: ['./submit-bid.component.scss']
})


export class SubmitBidComponent implements OnInit {

  public submitbidForm: FormGroup;
  public materialsRequired: FormGroup;
  // public ppeList: PPEItem[];
  public states: string[];
  public isDoctor = false;
  public addFlag = true;
  public spinnerFlag = false;
  public ppeItemSelected = true;
  public mciVerifiedFlag = false;
  public data: any;
  public ppeList: any;
  public newlist: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dataService: DataService,
    private readonly dialogService: DialogService,
    private readonly router: Router,
    private sharedService: SharedService,
    private needppeService: NeedppeService,
    private submitBidService: SubmitBidService
  ) {
    this.submitbidForm = this.formBuilder.group({
      logistics: [false],
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
      requesterid: this.data.requestorDetails[0].userId
    });
    this.createRequiredPPeList();

  }

  public submitdummy() {
   const object = {                     // how payload must be sent
      "logisticsHelp": false,
      "hospitalNgo": "Hospitals",
      "requesterId": "ae482a48-f294-4527-8338-2ceb312f2835",
      "ppes": [
        {
          ppeName: "respirators",
          "ppeCost": 123
        },
        {
          ppeName:  "Surgical Masks",
          "ppeCost": 234
        },
        {
          ppeName: "Gloves",
          "ppeCost": 2233
        }
      ],
      "s3Key": null
    };

    this.submitBidService.submit(object)
    .subscribe((res) => {
      console.log(res);
    });

  }


  public onSubmit() {
    // create a deep copy of the form-model
   // this.needppeForm.controls['materialsRequired'].enable();
    const result = Object.assign({}, this.submitbidForm.value);
    result.materialsRequired = Object.assign({}, result.materialsRequired);
    const reqBody = {...this.submitbidForm.value};
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
      this.submitbidForm.reset();
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
      this.submitbidForm.controls['ppe'].disable();
      this.addFlag = !this.addFlag;
      element.textContent = 'Edit';
    } else {
      this.submitbidForm.controls['ppe'].enable();
      this.addFlag = !this.addFlag;
      element.textContent = 'Add';
    }
  }

  get formArr() {
    return this.submitbidForm.get('ppes') as FormArray;
  }

  public createRequiredPPeList(): void {
    this.newlist.forEach((item, i) => {
      const fg = this.formBuilder.group({});
      fg.addControl(this.newlist[i].ppeName, this.formBuilder.control(false));
      fg.addControl(this.newlist[i].ppeCost, this.formBuilder.control(0));
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
