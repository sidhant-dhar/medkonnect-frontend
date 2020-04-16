import { Injectable } from '@angular/core';
import { RemoteService } from '../common/services/remote.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HaveppeService {

  public readonly apiroot = 'http://ec2-3-7-93-156.ap-south-1.compute.amazonaws.com:3045/temp';

  constructor(
    private readonly remote: RemoteService
  ) { }

  public vendorSignIn(signIn): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.remote.post(`${this.apiroot}/onboardSupplier`,  signIn , headers);
  }
}
