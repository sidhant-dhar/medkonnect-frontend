import { Injectable } from '@angular/core';
import { RemoteService } from './remote.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private readonly remote: RemoteService
  ) { }

  public getPPEList(): Observable<any> {
    return this.remote.getData('assets/data/ppe-list.json');
  }

  public getStates(): Observable<any> {
    return this.remote.getData('assets/data/indian-states.json');
  }
}
