import { Injectable } from '@angular/core';
import { DialogOptions } from '../../models/models';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public dialogOptions: DialogOptions;
  public dialogSubject = new Subject<DialogOptions>();
  public closeEventSubject = new Subject<any>();

  constructor() {
    this.dialogOptions = {
      title: undefined,
      content: undefined,
      width: 450,
      top: 200,
      routePath: undefined,
      actions: []
    };
    this.dialogSubject.next();
    this.closeEventSubject.next();
  }

  public get dialogProperties(): Observable<DialogOptions> {
    return this.dialogSubject.asObservable();
  }

  public open(options: DialogOptions): void {
    Object.assign(this.dialogOptions, options);
    this.dialogSubject.next(this.dialogOptions);
  }

  public afterClose(closeEvent: string): void {
    this.closeEventSubject.next({action: closeEvent});
    return Observable.create({action: closeEvent});
  }

  public get closeDialogEvent(): Observable<any> {
    return this.closeEventSubject.asObservable();
  }
}
