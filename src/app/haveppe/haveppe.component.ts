import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DataService } from '../common/services/data.service';
import { PPEItemResponse, PPEItem } from '../common/models/models';
import {HaveppeService} from './haveppe.service';
import { DialogService } from '../common/components/dialog/dialog.service';
import { Router } from '@angular/router';


@Component({
  selector: 'ncov-haveppe',
  templateUrl: './haveppe.component.html',
  styleUrls: ['./haveppe.component.scss']
})
export class HaveppeComponent implements OnInit {

  public haveppeForm: FormGroup;
  public materialsRequired: FormGroup;
  public ppeList: PPEItem[];
  public addFlag = true;
  public registrationFlag = false;
  public ppeItemSelected = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dataService: DataService,
    private readonly haveppeService: HaveppeService,
    private readonly dialogService: DialogService,
    private readonly router: Router


  ) {
    this.haveppeForm = this.formBuilder.group({
      materialsRequired: new FormArray([]),
      pinCode: ['', [ Validators.required ]],
      companyRegistrationNo: [''],
      homeMade: ['true', [Validators.required]],
      name: ['', [ Validators.required ]],
      phoneNo: ['', [ Validators.required ]],
      email: ['', [ Validators.required , Validators.email]],
      tnc: [true, [ Validators.required ]]
    });
    this.dataService.getPPEList().subscribe((res: PPEItemResponse) => {
      this.ppeList = res.list;
      this.createRequiredPPeList();
    });
   }

   get formArr() {
    return this.haveppeForm.get('materialsRequired') as FormArray;
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

  public toggleAdd(element) {
    if (this.addFlag) {
      this.haveppeForm.controls['materialsRequired'].disable();
      this.addFlag = !this.addFlag;
      element.textContent = 'Edit';
    } else {
      this.haveppeForm.controls['materialsRequired'].enable();
      this.addFlag = !this.addFlag;
      element.textContent = 'Add';
    }
  }

  public onSubmit() {
    this.haveppeForm.controls['materialsRequired'].enable();
    const result = Object.assign({}, this.haveppeForm.value);
    result.materialsRequired = Object.assign({}, result.materialsRequired);
    const reqBody = {...this.haveppeForm.value};
    const matRequired = reqBody.materialsRequired.reduce((acc, cur) => {
      const ppeItem = Object.keys(cur)[0];
      if (cur.quantity && cur[ppeItem]) {
        acc.push({
          quantity: cur.quantity,
          approved: 'true',
          ppeName: ppeItem === 'Others' ? cur.other : ppeItem
        });
      }
      return acc;
    }, []);
    delete reqBody.homeMade;
    delete reqBody.materialsRequired;
    delete reqBody.tnc;
    const finalBody =  {
      newSupplierDetails : { ...reqBody } ,
      ppeArray: ''  // do not use spread operator as creates an array.
    };
    finalBody.ppeArray = Object.assign(matRequired);
    this.ppeItemSelected = finalBody.ppeArray.length > 0;
    console.log('reqBody ', finalBody);
    if (!this.ppeItemSelected) {
      return;
    }
    this.haveppeService.vendorSignIn(finalBody).subscribe((res) => {
      this.haveppeForm.reset();
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

  public onTogglePpe(index: number): void {
    const ppeFormArray = this.haveppeForm.get('materialsRequired') as FormArray;
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

  public ngOnInit() {
  }

}
