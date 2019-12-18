import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentRole = 'admin';
  currentRoleSub: BehaviorSubject<string> = new BehaviorSubject<string>(this.currentRole);

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService,
    private cookieService: CookieService
  ) {}

  register(email, password, userType) {
    if (!email || !password || !userType) {
      return;
    } else {
      this.http
        .post('http://localhost:5000/auth/register', {
          email: email,
          password: password,
          userType: userType
        })
        .toPromise()
        .then((data) => console.log(data));
    }
  }

  async login(email, password, userType) {
    if (!email || !password || !userType) {
      return false;
    } else {
      const res = await this.http
        .post('http://localhost:5000/auth/login', {
          email: email,
          password: password,
          userType: userType
        })
        .toPromise();

      console.log(res);
      if (res['status'] === '200') {
        this.notificationsService.showNotification('Successfully logged in.');
        this.cookieService.set('api_token', res['token'], 2 / 1440);
        if (res['token'].includes('admin')) {
          this.currentRole = 'admin';
        } else if (res['token'].includes('vendor')) {
          this.currentRole = 'vendor';
        } else if (res['token'].includes('customer')) {
          this.currentRole = 'customer';
        }
        return true;
      } else {
        this.notificationsService.showNotification('Error! Incorrect email or password.');
        return false;
      }
    }
  }

  async checkAuthenticated() {
    const currentToken = this.cookieService.get('api_token');
    if (!currentToken) {
      return false;
    } else {
      const res = await this.http.post('http://localhost:5000/auth/check', { token: currentToken }).toPromise();
      if (res['status'] === '200') {
        this.notificationsService.showNotification('Successfully logged in.');
        this.cookieService.set('api_token', res['token'], 2 / 1440);
        if (res['token'].includes('admin')) {
          this.currentRole = 'admin';
        } else if (res['token'].includes('vendor')) {
          this.currentRole = 'vendor';
        } else if (res['token'].includes('customer')) {
          this.currentRole = 'customer';
        }
        return true;
      } else {
        return false;
      }
    }
  }

  changeRole(newRole) {
    this.currentRole = newRole;
    this.currentRoleSub.next(this.currentRole);
  }
}
