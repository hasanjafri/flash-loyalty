import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentRole = 'admin';
  currentToken: number;
  currentRoleSub: BehaviorSubject<string> = new BehaviorSubject<string>(this.currentRole);

  constructor(private http: HttpClient, private notificationsService: NotificationsService) {}

  register(email, password) {
    if (!email || !password) {
      return;
    } else {
      this.http
        .post('http://localhost:5000/auth/register', {
          email: email,
          password: password
        })
        .toPromise()
        .then((data) => console.log(data));
    }
  }

  async login(email, password) {
    if (!email || !password) {
      return false;
    } else {
      const res = await this.http
        .post('http://localhost:5000/auth/login', {
          email: email,
          password: password
        })
        .toPromise();

      console.log(res);
      if (res['status'] === '200') {
        this.notificationsService.showNotification('Successfully logged in.');
        this.currentToken = res['token'];
        return true;
      } else {
        this.notificationsService.showNotification('Error! Incorrect email or password.');
        return false;
      }
    }
  }

  changeRole(newRole) {
    this.currentRole = newRole;
    this.currentRoleSub.next(this.currentRole);
  }
}
