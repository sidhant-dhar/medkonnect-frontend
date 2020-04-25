import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemoteService {

 // public readonly apiroot = 'https://5ea14759eea7760016a9273a.mockapi.io';
   public readonly apiroot = 'https://medkonnect.org/api';


  constructor(
    private readonly http: HttpClient
  ) { }

  public get(url: string, headers?: HttpHeaders): Observable<any> {
    return this.http.get(`${this.apiroot}${url}`, { headers });
  }

  public post(url: string, requestBody: any, headers?: HttpHeaders): Observable<any> {
    return this.http.post(`${this.apiroot}${url}`, requestBody, { headers });
  }

  public getData(url: string, headers?: HttpHeaders): Observable<any> {
    return this.http.get( url , { headers });
  }
}
