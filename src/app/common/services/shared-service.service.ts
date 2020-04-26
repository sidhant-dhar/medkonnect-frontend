import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public data = {
    email: '',
    password: ''
  };

  private dataSource = new BehaviorSubject<any>(this.data);
  public currentData = this.dataSource.asObservable();
  private bidSource = new BehaviorSubject<any>(this.data);
  public bidData = this.bidSource.asObservable();

  public changeData(newData: any) {
    this.dataSource.next(newData);
  }
  public changeBid(newData: any) {
    this.bidSource.next(newData);
  }

  constructor() { }
}


