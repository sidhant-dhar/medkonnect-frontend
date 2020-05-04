import { Component, OnInit} from '@angular/core';
import { LiveDemandsService } from './live-demands.service';
import { Router } from '@angular/router';
import { SharedService } from '../../common/services/shared-service.service';
import { formatDate } from '@angular/common';

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
  public tableData = new Array();
  public data: any;

  constructor(
    private livedemandsService: LiveDemandsService,
    private sharedService: SharedService,
    private router: Router
      ) { }

  public ngOnInit() {
    this.sharedService.bidData.subscribe( data => this.data = data);

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
      this.tableData = this.getResultantArray(this.dashboardArray);
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

public onSelectRow(row) {
  this.router.navigate(['/submitbid']);

}

public onChangeData(data) {

  this.sharedService.changeBid(data);
}


}
