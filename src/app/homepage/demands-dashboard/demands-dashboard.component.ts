import { Component, OnInit } from '@angular/core';
import { LiveDemandsService } from '../../dashboard/live-demands/live-demands.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'ncov-demands-dashboard',
  templateUrl: './demands-dashboard.component.html',
  styleUrls: ['./demands-dashboard.component.scss']
})
export class DemandsDashboardComponent implements OnInit {

  public tableData = new Array();
  public dashboardArray: any;

  constructor(
    private livedemandsService: LiveDemandsService,
  ) { }

  public ngOnInit() {
    this.livedemandsService.dashboardDetails()
    .subscribe((res: any[]) => {
      console.log(res, 'result');
      this.dashboardArray = res;
      this.dashboardArray.map(obj => {
        const format = 'dd/MM/yyyy';
        const locale = 'en-US';
        const formattedDate = formatDate(obj.needBy, format, locale);
        obj.date = formattedDate;
      });
      // console.log('date dekho ', this.dashboardArray);
      this.tableData = this.getResultantArray(this.dashboardArray).slice(0, 3); // to get the first 3 demands
      console.log('result ', this.tableData);
    }, error => {
      console.log(error);
    });
  }


  public getResultantArray(res) {
    const cache = [];
    return res.reduce((acc, cur) => {
      // const userId = cur['requestorDetails'][0]['userId'];
      const userId = Object.values(this.pick(cur, ['hospitalNgo', 'certifiedPpe', 'date', 'city'])).join();
      if (cache.includes(userId)) {
      // const index = acc.findIndex(v => v['requestorDetails'][0]['userId'] === userId);
      // tslint:disable-next-line: max-line-length
      const index = acc.findIndex(v => v['hospitalNgo'] === cur['hospitalNgo'] && v['certifiedPpe'] === cur['certifiedPpe'] && v['date'] === cur['date'] && v['city'] === cur['city']);
      console.log('index ', index);
      console.log('acc ', acc);
      if (index !== -1) {
        acc[index]['ppe'] = `${acc[index]['ppe']}, ${cur['quantity']} ${cur['ppeName']}`;
      }
      } else {
        cache.push(userId);
        cur['ppe'] = `${cur['quantity']} ${cur['ppeName']}`;
        acc.push(cur);
      }
      return acc;
    }, []);
  }

  public pick(obj, arr) {
    return arr.reduce((acc, cur) => {
        acc[cur] = obj[cur];
        return acc;
    }, {});
}


}
