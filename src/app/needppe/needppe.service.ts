import { Injectable } from '@angular/core';
import { RemoteService } from '../common/services/remote.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NeedppeService {

  public readonly apiroot = 'http://ec2-13-235-243-110.ap-south-1.compute.amazonaws.com:3045/temp';

  constructor(
    private readonly remote: RemoteService
  ) { }

  public verifyMCI(mciNumber: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.remote.post(`${this.apiroot}/post`, JSON.stringify({ mciNumber }), headers);
  }

  public hospitalSignIn(signIn): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.remote.post(`${this.apiroot}/onboardConsumer`, signIn , headers);
  }
}
