import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { PersonalData, ContactRequest } from '../models/hospitalmodel';

interface Item {
  ppe: string;
  required: string;
}


@Component({
  selector: 'ncov-needppe',
  templateUrl: './needppe.component.html',
  styleUrls: ['./needppe.component.scss']
})
export class NeedppeComponent implements OnInit {

  public contactForm: FormGroup;
  public materialsRequired: FormGroup;
  public list = [{ ppe: 'N95 respirators', required: 'amount' }, { ppe: 'Surgical Masks', required: 'amount' },
                 { ppe: 'Gloves', required: 'amount' }, { ppe: 'Disinfectants', required: 'amount' },
                 { ppe: 'Goggles', required: 'amount' }, { ppe: 'Coveralls', required: 'amount' },
                 { ppe: 'Boots', required: 'amount' }] as Item[];


  public states = ['USA', 'Germany', 'Italy', 'France'];
  public isDoctor = false;
  public addFlag = true;

  // public requestTypes = ['Claim', 'Feedback', 'Help Request'];


  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.createFormGroup(formBuilder);
   }


   public createFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({
      personalData: formBuilder.group(new PersonalData()),
      materialsRequired: new FormArray([
      ]),
      homeMade : false
    });
  }

  public onSubmit() {
    // create a deep copy of the form-model
    const result: ContactRequest = Object.assign({}, this.contactForm.value);
    result.personalData = Object.assign({}, result.personalData);
    result.materialsRequired = Object.assign({}, result.materialsRequired);

    // Do useful stuff with the gathered data
    console.log(result);
  }

  public revert() {
    // Resets to blank object
    this.contactForm.reset();

    // Resets to provided model
    this.contactForm.reset({ personalData: new PersonalData(), requestType: '', text: '' });
  }

  get formArr() {
    return this.contactForm.get('materialsRequired') as FormArray;
  }

  public toggleSubmit() {
    if (this.addFlag) {
    this.contactForm.controls['materialsRequired'].disable();
    this.addFlag = !this.addFlag;
    } else {
      this.contactForm.controls['materialsRequired'].enable();
      this.addFlag = !this.addFlag;
    }
  }

  public ngOnInit() {
    this.list.forEach((item: Item, i) => {
      const fg = this.formBuilder.group({});
      fg.addControl(this.list[i].ppe, this.formBuilder.control(false));
      fg.addControl(this.list[i].required, this.formBuilder.control(null));
      this.formArr.push(fg);
    });
  }

}
