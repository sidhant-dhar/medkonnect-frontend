import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PersonalData } from '../../models/hospitalmodel';
import { RemoteService } from '../remote.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<PersonalData>;
  public currentUser: Observable<PersonalData>;


  constructor(
    private remoteService: RemoteService
  ) {
    this.currentUserSubject = new BehaviorSubject<PersonalData>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): PersonalData {
    return this.currentUserSubject.value;
    }

    public login(username: string, password: string) {
      return this.remoteService.post(`/login`, { username, password })
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
          }));
    }

    public logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }
}
