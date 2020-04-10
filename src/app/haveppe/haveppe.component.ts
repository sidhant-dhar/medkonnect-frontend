import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DataService } from '../common/services/data.service';
import { PPEItemResponse, PPEItem } from '../common/models/models';


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
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dataService: DataService
  ) {
    this.haveppeForm = this.formBuilder.group({
      materialsRequired: new FormArray([]),
      pincode: ['', [ Validators.required ]],
      registrationNo: ['', [Validators.required]],
      homeMade: [''],
      name: ['', [ Validators.required ]],
      mobile: ['', [ Validators.required ]],
      email: ['', [ Validators.required ]]
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
    // create a deep copy of the form-model
    const result = Object.assign({}, this.haveppeForm.value);
    result.materialsRequired = Object.assign({}, result.materialsRequired);
    const homemade = result.homeMade;

    // const array = Object.keys(result.materialsRequired).map(function(k) {
    //    return result.materialsRequired[k];
    // }); // convert to array

    // const newArray = array.filter(function (el) {
    //   return el.quantity != null;
    // }) // remove null values
    // .map(v => ({...v, approved: homemade})) // add homeMade flag
    // .map(function (el) {
    //   const reversed = {};
    //   for (let key in el) {
    //     if (key !== 'approved' && el[key] === true) {
    //       reversed[el[key]] = key;
    //       key = 'ppeName';
    //     } else {
    //       reversed[key] = el[key];
    //     }
    //   }
    //   reversed['ppeName'] = reversed['true'];
    //   delete reversed['true'];
    //   return reversed;
    // }); // reverse ppeNames

    // Object.assign(result, {'ppeArray': newArray});
    const reqBody = {...this.haveppeForm.value};
    const matRequired = reqBody.materialsRequired.reduce((acc, cur) => {
      if (cur.quantity) {
        acc.push({
          quantity: cur.quantity,
          approved: 'y',
          ppeName: Object.keys(cur)[0]
        });
      }
      return acc;
    }, []);
    reqBody.materialsRequired = Object.assign(matRequired);

    delete result.materialsRequired;
    delete result.homeMade;
    const postrequest = JSON.stringify(result);
    console.log(postrequest);
  }

  public ngOnInit() {
  }

}
