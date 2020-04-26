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
  public uuid: any;
  public dashboardArrayFinal = new Array();
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
      this.dashboardArray = data;
      console.log(data);
      this.dashboardArray.map(res => {
        res.name = res.requestorDetails[0].name;
        res.uuid = res.requestorDetails[0].userId;
        delete res.requestorDetails;
      });

      const result = this.dashboardArray.reduce(function(acc, cur) {
        acc[cur.uuid] = (acc[cur.uuid] || []).concat(cur);
        return acc;
      }, {});
      for (const key in result) {
        if (result.hasOwnProperty(key)) {
          const grouping = result[key].reduce(function(acc, cur) {
            acc[cur.hospitalNgo] = (acc[cur.hospitalNgo] || []).concat(cur);
            return acc;
          }, {});
          this.dashboardArrayFinal.push(grouping);
        }
    }

    // this.dashboardArrayFinal.map(obj => {
    //   for (const key in obj) {
    //     if (obj.hasOwnProperty(key)) {
    //       const city = obj[key][0].city;
    //       const name = obj[key][0].name;
    //       const type = obj[key][0].hospitalNgo;
    //       const uuid = obj[key][0].uuid;
    //       for (let index = 0; index < obj[key].length; index++) {
    //         if (obj[key].certifiedPpe){
    //             console.log('happens');
    //         }
    //       }
    //     }
    //   }
    // });

  console.log(this.dashboardArrayFinal);
      // const uuid = Object.values(result)[0];
      // const singleArray =  [].concat.apply([], uuid);
     console.log(this.dashboardArrayFinal);
    }, error => {
      console.log(error);
    });
  }


}
