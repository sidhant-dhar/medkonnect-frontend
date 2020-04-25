import { Injectable } from '@angular/core';
import { RemoteService } from '../common/services/remote.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NeedppeService {

  public readonly apiroot = 'http://ec2-3-7-93-156.ap-south-1.compute.amazonaws.com:3045/temp';

  constructor(
    private readonly remote: RemoteService
  ) { }

  public verifyMCI(mciNumber): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.remote.post(`/mci/add`, mciNumber , headers);
  }

  public makeRequest(signIn): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.remote.post(`/demands/add`, signIn , headers);
  }
}
