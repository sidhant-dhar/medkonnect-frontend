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
  public states: string[];
  public isDoctor = false;
  public addFlag = true;
  public spinnerFlag = false;
  public ppeItemSelected = true;
  public emailValidationRegex = '^\w+[-\.\w]*@(?!(?:gmail|outlook|apple|hotmail)\.com$)\w+[-\.\w]*?\.\w{2,4}$';
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly needppeService: NeedppeService,
    private readonly dataService: DataService
  ) {
    this.needppeForm = this.formBuilder.group({
      name: ['', [ Validators.required ]],
      phoneNo: ['', [ Validators.required ]],
      MCInumber: [''],
      email: ['', [ Validators.required, Validators.email , Validators.pattern(this.emailValidationRegex) ]],
      address: ['', [ Validators.required ]],
      state: ['Andaman and Nicobar Islands', [ Validators.required ]],
      pinCode: ['', [ Validators.required ]],
      homeMade: ['true', [ Validators.required ]],
      tnc: [true, [ Validators.required ]],
      materialsRequired: new FormArray([])
    });
    this.dataService.getPPEList().subscribe((res: PPEItemResponse) => {
      this.ppeList = res.list;
      this.createRequiredPPeList();
    });
    this.dataService.getStates().subscribe((res: {indianStates: string[]}) => {
      this.states = res.indianStates;
    });
  }

  public onSubmit() {
    this.needppeForm.controls['materialsRequired'].enable();
    // create a deep copy of the form-model
    const result = Object.assign({}, this.needppeForm.value);
    // result.personalData = Object.assign({}, result.personalData);
    result.materialsRequired = Object.assign({}, result.materialsRequired);
    const homemade = result.homeMade;
    const reqBody = {...this.needppeForm.value};
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
      newConsumerDetails : { ...reqBody } ,
      ppeArray: ''  // do not use spread operator as creates an array.
    };
    finalBody.ppeArray = Object.assign(matRequired);
    this.ppeItemSelected = finalBody.ppeArray.length > 0;
    console.log('reqBody ', finalBody);
    this.needppeService.hospitalSignIn(finalBody).subscribe((res) => {
      console.log(res);
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

  public onTogglePpe(index: number): void {
    console.log('controls ', this.needppeForm.controls.materialsRequired['controls']);
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

  public tncChange() {
    console.log('tnc ', this.needppeForm);
  }

}
