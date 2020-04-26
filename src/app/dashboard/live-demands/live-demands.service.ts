import { Injectable } from '@angular/core';
import { RemoteService } from '../../common/services/remote.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LiveDemandsService {

  constructor(
    private readonly remote: RemoteService
  ) { }

  public  dashboardDetails(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
   return this.remote.get(`/demands/get-all` , headers);
// return this.remote.get(`/users` , headers);
}
}
