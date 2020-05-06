import { Component, OnInit } from '@angular/core';
import { RequestHistoryService } from './request-history.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'ncov-request-history',
  templateUrl: './request-history.component.html',
  styleUrls: ['./request-history.component.scss']
})
export class RequestHistoryComponent implements OnInit {

  public orderDetails =  new Array();
  constructor(
    private requestHistoryService: RequestHistoryService
  ) { }

  public ngOnInit() {
    this.requestHistoryService.dashboardDetails()
    .subscribe((res: any) => {
      this.orderDetails = res.orderDetails;
      this.orderDetails.map(obj => {
        const format = 'dd/MM/yyyy';
        const locale = 'en-US';
        const formattedDate = formatDate(obj.need_by, format, locale);
        obj.date = formattedDate;
      });
      console.log(this.orderDetails, 'orderDetails');
      });
  }

}
