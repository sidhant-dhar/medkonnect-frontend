import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemoteService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public get(url: string, headers: HttpHeaders): Observable<any> {
    return this.http.get(url, { headers });
  }

  public post(url: string, requestBody: any, headers: HttpHeaders): Observable<any> {
    return this.http.post(url, JSON.stringify(requestBody), { headers });
  }
}
