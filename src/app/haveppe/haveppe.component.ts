import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DataService } from '../common/services/data.service';
import { PPEItemResponse, PPEItem } from '../common/models/models';
import {HaveppeService} from './haveppe.service';

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
    private readonly dataService: DataService,
    private readonly haveppeService: HaveppeService,

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
    const reqBody = {...this.haveppeForm.value};
    const matRequired = reqBody.materialsRequired.reduce((acc, cur) => {
      const ppeItem = Object.keys(cur)[0];
      if (cur.quantity && cur[ppeItem]) {
        acc.push({
          quantity: cur.quantity,
          approved: 'true',
          ppeName: ppeItem
        });
      }
      return acc;
    }, []);
    delete reqBody.homeMade;
    delete reqBody.materialsRequired;
    const finalBody =  {
      newSupplierDetails : '' ,
      ppeArray: ''
    };
    finalBody.newSupplierDetails = Object.assign(reqBody);
    finalBody.ppeArray = Object.assign(matRequired);
    console.log('reqBody ', finalBody);
    this.haveppeService.vendorSignIn(finalBody).subscribe((res) => {
      console.log(res);
    });

  }

  public ngOnInit() {
  }

}
