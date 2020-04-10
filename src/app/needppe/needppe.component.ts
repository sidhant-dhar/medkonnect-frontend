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
  public states = ['USA', 'Germany', 'Italy', 'France'];
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
    console.log(this.needppeForm.value);
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
