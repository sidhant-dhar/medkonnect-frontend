import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validator, Validators } from '@angular/forms';
import { PersonalData, ContactRequest } from '../models/hospitalmodel';
import {RemoteService} from '../common/services/remote.service';
import { Key, element } from 'protractor';
import { reverse } from 'dns';

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
  public list = [{ ppe: 'N95 respirators', required: 'quantity' }, { ppe: 'Surgical Masks', required: 'quantity' },
                 { ppe: 'Gloves', required: 'quantity' }, { ppe: 'Disinfectants', required: 'quantity' },
                 { ppe: 'Goggles', required: 'quantity' }, { ppe: 'Coveralls', required: 'quantity' },
                 { ppe: 'Boots', required: 'quantity' }] as Item[];
  public states = ['USA', 'Germany', 'Italy', 'France'];
  public isDoctor = false;
  public addFlag = true;
  public spinnerFlag = false;
  public apiroot = 'http://httpbin.org';
  public post;

  constructor(private formBuilder: FormBuilder, private remoteService: RemoteService) {
    this.contactForm = this.createFormGroup(formBuilder);
   }


   public createFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({
      personalData: formBuilder.group(new PersonalData(), [Validators.required]),
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

  get formArr() {
    return this.contactForm.get('materialsRequired') as FormArray;
  }

  public toggleAdd( element ) {
    if (this.addFlag) {
    this.contactForm.controls['materialsRequired'].disable();
    this.addFlag = !this.addFlag;
    element.textContent = 'Edit';
    } else {
      this.contactForm.controls['materialsRequired'].enable();
      this.addFlag = !this.addFlag;
      element.textContent = 'Add';
    }
  }

  public toggleDoctor(doctorClick: boolean) {
    if (doctorClick) {
      this.isDoctor = true;
      this.contactForm.controls.personalData['controls']['MCInumber'].enable();
    } else {
      this.isDoctor = false;
      this.contactForm.controls.personalData['controls']['MCInumber'].disable();
      // if (this.spinnerFlag) {
      //   this.spinnerFlag = false;
      // }
    }
  }

  public verifyMCI(element, text: string) {
    const headers = new Headers().set('Content-Type', 'application/json');
    element.textContent = text;
    element.disabled = true;
    this.spinnerFlag = true;
    const url = `${this.apiroot}/post`;
    const result: ContactRequest = Object.assign({}, this.contactForm.value);
    result.personalData = Object.assign({}, result.personalData);
    delete result.personalData['email'];
    delete result.personalData['mobile'];
    delete result.personalData['state'];
    delete result.personalData['pincode'];
    delete result.personalData['hospitalAddress'];
    const stringifyData = JSON.stringify(result.personalData);
    this.remoteService.post(url, stringifyData)
    .subscribe( res => {
     console.log(res);
    });
    console.log(stringifyData);
  }

  public ngOnInit() {
    this.list.forEach((item: Item, i) => {
      const fg = this.formBuilder.group({});
      fg.addControl(this.list[i].ppe, this.formBuilder.control(false));
      fg.addControl(this.list[i].required, this.formBuilder.control(null));
      this.formArr.push(fg);
    });
    this.contactForm.controls.personalData['controls']['MCInumber'].disable();
  }

}
