import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { PersonalData, ContactRequest } from '../models/hospitalmodel';


@Component({
  selector: 'ncov-needppe',
  templateUrl: './needppe.component.html',
  styleUrls: ['./needppe.component.scss']
})
export class NeedppeComponent implements OnInit {

  public contactForm: FormGroup;

  public states = ['USA', 'Germany', 'Italy', 'France'];

  // public requestTypes = ['Claim', 'Feedback', 'Help Request'];


  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.createFormGroup(formBuilder);
   }


   public createFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({
      personalData: formBuilder.group(new PersonalData()),
      requestType: '',
      text: ''
    });
  }

  public onSubmit() {
    // Make sure to create a deep copy of the form-model
    const result: ContactRequest = Object.assign({}, this.contactForm.value);
    result.personalData = Object.assign({}, result.personalData);

    // Do useful stuff with the gathered data
    console.log(result);
  }

  public revert() {
    // Resets to blank object
    this.contactForm.reset();

    // Resets to provided model
    this.contactForm.reset({ personalData: new PersonalData(), requestType: '', text: '' });
  }


  public ngOnInit() {
  }

}
