import { Injectable } from '@angular/core';
import { RemoteService } from '../common/services/remote.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HaveppeService {

  constructor(
    private readonly remote: RemoteService
  ) { }

  public vendorSignIn(signIn): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.remote.post(`/onboardSupplier`,  signIn , headers);
  }
}
