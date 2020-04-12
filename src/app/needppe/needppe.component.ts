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
  // tslint:disable-next-line: max-line-length
  public emailValidationRegex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(?!hotmail|gmail|yahoo)(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly needppeService: NeedppeService,
    private readonly dataService: DataService
  ) {
    this.needppeForm = this.formBuilder.group({
      name: ['', [ Validators.required ]],
      phoneNo: ['', [ Validators.required ]],
      MCInumber: [{value: '', disabled: true}],
      email: ['', [ Validators.required, Validators.email, Validators.pattern(this.emailValidationRegex) ]],
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
    // create a deep copy of the form-model
    const result = Object.assign({}, this.needppeForm.value);
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
    if (!this.ppeItemSelected) {
      return;
    }
    this.needppeService.hospitalSignIn(finalBody).subscribe((res) => {
      console.log(res);
      alert('submitted!');
      this.needppeForm.reset();

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
      this.needppeForm.controls['MCInumber'].setValidators([Validators.required]);
    } else {
      this.isDoctor = false;
      this.needppeForm.controls['MCInumber'].disable();
      this.needppeForm.controls['MCInumber'].setValidators(null);
      this.needppeForm.controls['MCInumber'].setValue(null);
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

}
