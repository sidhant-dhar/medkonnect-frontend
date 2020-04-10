import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { NeedppeService } from './needppe.service';
import { DataService } from '../common/services/data.service';
import { PPEItemResponse, PPEItem } from '../common/models/models';

@Component({
  selector: 'ncov-needppe',
  templateUrl: './needppe.component.html',
  styleUrls: ['./needppe.component.scss']
})
export class NeedppeComponent {

  public needppeForm: FormGroup;
  public materialsRequired: FormGroup;
  public ppeList: PPEItem[];
  public states = [ 'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh',
                    'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
                    'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra',
                    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
                    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];
  public isDoctor = false;
  public addFlag = true;
  public spinnerFlag = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly needppeService: NeedppeService,
    private readonly dataService: DataService
  ) {
    this.needppeForm = this.formBuilder.group({
      name: ['', [ Validators.required ]],
      mobile: ['', [ Validators.required ]],
      MCInumber: [''],
      email: ['', [ Validators.required ]],
      hospitalAddress: ['', [ Validators.required ]],
      state: ['', [ Validators.required ]],
      pincode: ['', [ Validators.required ]],
      homeMade: ['', [ Validators.required ]],
      materialsRequired: new FormArray([])
    });
    this.dataService.getPPEList().subscribe((res: PPEItemResponse) => {
      this.ppeList = res.list;
      this.createRequiredPPeList();
    });
  }

  public onSubmit() {
    this.needppeForm.controls['materialsRequired'].enable();
    // create a deep copy of the form-model
    const result = Object.assign({}, this.needppeForm.value);
    result.personalData = Object.assign({}, result.personalData);
    result.materialsRequired = Object.assign({}, result.materialsRequired);
    const homemade = result.homeMade;

    const array = Object.keys(result.materialsRequired).map(function(k) {
       return result.materialsRequired[k];
    }); // convert to array

    const newArray = array.filter(function (el) {
      return el.quantity != null;
    }) // remove null values
    .map(v => ({...v, approved: homemade})) // add homeMade flag
    .map(function (el) {
      const reversed = {};
      for (let key in el) {
        if (key !== 'approved' && el[key] === true) {
          reversed[el[key]] = key;
          key = 'ppeName';
        } else {
          reversed[key] = el[key];
        }
      }
      reversed['ppeName'] = reversed['true'];
      delete reversed['true'];
      return reversed;
    }); // reverse ppeNames

    Object.assign(result, {'ppeArray': newArray});
    delete result.materialsRequired;
    delete result.homeMade;
    const postrequest = JSON.stringify(result);
    console.log(postrequest);
  }

  // public revert() {
  //   // Resets to blank object
  //   this.contactForm.reset();

  //   // Resets to provided model
  //   this.contactForm.reset({ personalData: new PersonalData(), requestType: '', text: '' });
  // }

  // get formArr() {
  //   return this.contactForm.get('materialsRequired') as FormArray;
  //   console.log(this.needppeForm.value);
  // }

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

  public toggleDoctor(doctorClick: boolean) {
    if (doctorClick) {
      this.isDoctor = true;
      this.needppeForm.controls['MCInumber'].enable();
    } else {
      this.isDoctor = false;
      this.needppeForm.controls['MCInumber'].disable();
      this.spinnerFlag = false;
    }
  }

  public verifyMCI() {
    this.spinnerFlag = true;
    this.needppeService.verifyMCI(this.needppeForm.controls.MCInumber.value).subscribe(() => {
      this.spinnerFlag = false;
    }, () => {
      this.spinnerFlag = false;
    });
  }

  get formArr() {
    return this.needppeForm.get('materialsRequired') as FormArray;
  }

  public createRequiredPPeList(): void {
    this.ppeList.forEach((item: PPEItem, i) => {
      const fg = this.formBuilder.group({});
      fg.addControl(this.ppeList[i].ppe, this.formBuilder.control(false));
      fg.addControl(this.ppeList[i].required, this.formBuilder.control(null));
      this.formArr.push(fg);
    });
  }

}
