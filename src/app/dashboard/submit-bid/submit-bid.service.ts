import { Injectable } from '@angular/core';
import { RemoteService } from '../../common/services/remote.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubmitBidService {

  constructor(
    private readonly remote: RemoteService
  ) { }

  public  submit(payload): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
   return this.remote.post(`/demands/submit`, payload , headers);
// return this.remote.get(`/users` , headers);
}
}
