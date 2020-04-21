import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemoteService {

  public readonly apiroot = 'http://ec2-3-7-93-156.ap-south-1.compute.amazonaws.com:3045/api';


  constructor(
    private readonly http: HttpClient
  ) { }

  public get(url: string, headers?: HttpHeaders): Observable<any> {
    return this.http.get(url, { headers });
  }

  public post(url: string, requestBody: any, headers?: HttpHeaders): Observable<any> {
    return this.http.post(`${this.apiroot}${url}`, requestBody, { headers });
  }
}
