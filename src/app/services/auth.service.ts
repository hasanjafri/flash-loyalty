import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { GraphDataService } from './graph-data.service';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email = 'username';
  emailChangeSub: BehaviorSubject<string> = new BehaviorSubject<string>(this.email);
  currentRole = '';
  currentRoleSub: BehaviorSubject<string> = new BehaviorSubject<string>(this.currentRole);
  themeChangeSub = new BehaviorSubject([]);
  isAuthenticated = false;
  authSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated);
  altTokenSub: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private notificationsService: NotificationsService,
    private cookieService: CookieService,
    private router: Router,
    private graphDataService: GraphDataService
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
        this.graphDataService.pullGraphData();
        this.notificationsService.showNotification('Successfully logged in.');
        this.cookieService.set('api_token', res['token'], 1 / 4);
        localStorage.setItem('api_token', res['token']);
        localStorage.setItem('alt_token', res['alt_token']);
        this.themeChangeSub.next(res['colors']);
        if (res['token'].includes('admin')) {
          this.currentRole = 'admin';
          this.currentRoleSub.next('admin');
          this.altTokenSub.next('both');
        } else if (res['token'].includes('vendor')) {
          this.currentRole = 'vendor';
          this.currentRoleSub.next('vendor');
          this.altTokenSub.next(res['alt_token']);
        } else if (res['token'].includes('customer')) {
          this.currentRole = 'customer';
          this.currentRoleSub.next('customer');
          this.altTokenSub.next(res['alt_token']);
        }
        this.email = res['email'];
        this.emailChangeSub.next(this.email);
        this.isAuthenticated = true;
        this.authSub.next(true);
        return true;
      } else {
        this.notificationsService.showNotification('Error! Incorrect email or password.');
        return false;
      }
    }
  }

  async checkAuthenticated() {
    const currentToken = localStorage.getItem('api_token');
    if (!currentToken) {
      console.log('yeyeyeyeyeye123123');
      return false;
    } else {
      const res = await this.http.post('http://localhost:5000/auth/check', { token: currentToken }).toPromise();
      if (res['status'] === '200') {
        this.graphDataService.pullGraphData();
        this.notificationsService.showNotification('Successfully logged in.');
        this.cookieService.set('api_token', res['token'], 1 / 4);
        localStorage.setItem('api_token', res['token']);
        localStorage.setItem('alt_token', res['alt_token']);
        this.themeChangeSub.next(res['colors']);
        console.log(res['colors']);
        if (res['token'].includes('admin')) {
          this.currentRole = 'admin';
          this.currentRoleSub.next('admin');
          this.altTokenSub.next('both');
        } else if (res['token'].includes('vendor')) {
          this.currentRole = 'vendor';
          this.currentRoleSub.next('vendor');
          this.altTokenSub.next(res['alt_token']);
        } else if (res['token'].includes('customer')) {
          this.currentRole = 'customer';
          this.currentRoleSub.next('customer');
          this.altTokenSub.next(res['alt_token']);
        }
        this.email = res['email'];
        this.emailChangeSub.next(this.email);
        this.isAuthenticated = true;
        this.authSub.next(true);
        return true;
      } else {
        this.authSub.next(false);
        this.router.navigate(['/index']);
        return false;
      }
    }
  }

  changeRole(newRole) {
    this.currentRole = newRole;
    this.currentRoleSub.next(this.currentRole);
    if (newRole === '') {
      this.isAuthenticated = false;
      this.authSub.next(false);
      localStorage.removeItem('api_token');
      this.router.navigate(['/index']);
    }
  }
}
