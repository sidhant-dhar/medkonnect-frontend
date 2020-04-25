import { Component, OnInit} from '@angular/core';
import { LiveDemandsService } from './live-demands.service';

@Component({
  selector: 'ncov-live-demands',
  templateUrl: './live-demands.component.html',
  styleUrls: ['./live-demands.component.scss']
})
export class LiveDemandsComponent implements OnInit {
  public userData: any;
  public dashboardArray: any;
  public tableData = [
    {
      name: 'Shiva Hospital',
      ppe: '100 N95 masks, 1000 boxes of gloves,100 surgical masks',
      location: 'Bangalore',
      requiredBy : '20/5/2020'
    },
    {
      name: 'Vishnu Hospital',
      ppe: 'lots of coveralls, 1000 boxes of gloves,100 surgical masks',
      location: 'Kerala',
      requiredBy : '25/4/2020'
    },
    {
      name: 'Pooja Hospital',
      ppe: ' 1000 boxes of gloves,100 surgical masks',
      location: 'Bangalore',
      requiredBy : '26/4/2020'
    },
    {
      name: 'Manoj Hospital',
      ppe: ' 1000 boxes of gloves,100 surgical masks',
      location: 'Bangalore',
      requiredBy : '26/4/2020'
    },
    {
      name: 'Ashmita Hospital',
      ppe: ' 1000 boxes of gloves,100 surgical masks',
      location: 'Bangalore',
      requiredBy : '26/4/2020'
    },
    {
      name: 'Aditya Hospital',
      ppe: ' 1000 boxes of gloves,100 surgical masks',
      location: 'Bangalore',
      requiredBy : '26/4/2020'
    },
    {
      name: 'Sidhant Hospital',
      ppe: ' 1000 boxes of gloves,100 surgical masks',
      location: 'Bangalore',
      requiredBy : '26/4/2020'
    }
  ];

  constructor(
    private livedemandsService: LiveDemandsService
      ) { }

  public ngOnInit() {
    this.livedemandsService.dashboardDetails()
    .subscribe((data: any[]) => {
      console.log(data);
      this.dashboardArray = data;
    }, error => {
      console.log(error);
    });
  }

}
