import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { RemoteService } from '../../common/services/remote.service';


@Injectable({
  providedIn: 'root'
})
export class RequestHistoryService {

  constructor(
    private remote: RemoteService
  ) { }

  public  dashboardDetails(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
   return this.remote.get(`/demands/get-offer-details` , headers);
}
}
