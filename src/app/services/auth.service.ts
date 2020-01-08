import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
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
        .post(`${environment.serverUrl}register`, {
          email: email,
          password: password,
          userType: userType
        })
        .toPromise()
        .then((data) => console.log(data));
    }
  }

  async login(email: string, password: string, userType: string) {
    if (!email || !password || !userType) {
      return false;
    } else {
      const res = await this.http
        .post(`${environment.serverUrl}login`, {
          email: email,
          password: password,
          userType: userType.toLowerCase()
        })
        .toPromise();

      console.log(res);
      if (res['status'] === '200') {
        this.graphDataService.pullGraphData();
        this.notificationsService.showNotification('Successfully logged in.');
        // this.cookieService.set('api_token', res['token'], 1 / 4);
        localStorage.setItem('api_token', res['token']);
        localStorage.setItem('alt_token', res['alt_token']);
        localStorage.setItem('session_id', res['session_id']);
        this.themeChangeSub.next(res['colors']);
        if (res['token'].includes('admin')) {
          this.currentRole = 'admin';
          this.currentRoleSub.next('admin');
          this.altTokenSub.next('both');
        } else if (res['token'].includes('vendor')) {
          this.currentRole = 'vendor';
          this.currentRoleSub.next('vendor');
          this.altTokenSub.next(res['alt_token']);
        } else if (res['token'].includes('party')) {
          this.currentRole = 'party';
          this.currentRoleSub.next('party');
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
    const session_id = localStorage.getItem('session_id');
    const altToken = localStorage.getItem('alt_token');
    if (!currentToken) {
      return false;
    } else {
      const res = await this.http
        .post(`${environment.serverUrl}check`, { token: currentToken.toLowerCase(), session_id: session_id })
        .toPromise();
      if (res['status'] === '200') {
        console.log('1231231231', res);
        this.graphDataService.pullGraphData();
        this.notificationsService.showNotification('Successfully logged in.');
        // this.cookieService.set('api_token', res['token'], 1 / 4);
        localStorage.setItem('api_token', res['token']);
        this.themeChangeSub.next(res['colors']);
        console.log(res['colors']);
        if (res['token'].includes('admin')) {
          this.currentRole = 'admin';
          this.currentRoleSub.next('admin');
        } else if (res['token'].includes('vendor')) {
          this.currentRole = 'vendor';
          this.currentRoleSub.next('vendor');
        } else if (res['token'].includes('party')) {
          this.currentRole = 'party';
          this.currentRoleSub.next('party');
        }
        this.email = res['email'];
        this.emailChangeSub.next(this.email);
        this.isAuthenticated = true;
        this.authSub.next(true);
        this.altTokenSub.next(altToken);
        return true;
      } else {
        this.authSub.next(false);
        this.router.navigate(['/index']);
        return false;
      }
    }
  }

  async loginAlt(userType) {
    if (userType === 'admin') {
      return;
    }
    const token = localStorage.getItem('api_token');
    const alt_token = localStorage.getItem('alt_token');
    const session_id = localStorage.getItem('session_id');
    const res = await this.http
      .post(`${environment.serverUrl}loginAlt`, {
        email: this.email,
        session_id: session_id,
        token: token,
        alt_token: alt_token,
        userType: userType
      })
      .toPromise();
    if (res['status'] === '200') {
      this.graphDataService.pullGraphData();
      this.notificationsService.showNotification(`Signed in as ${userType}.`);
      localStorage.setItem('api_token', alt_token);
      localStorage.setItem('alt_token', token);
      console.log(res['colors']);
      this.themeChangeSub.next(res['colors']);
      if (token.includes('admin')) {
        this.currentRole = 'admin';
        this.currentRoleSub.next('admin');
        this.altTokenSub.next('both');
      } else if (token.includes('vendor')) {
        this.currentRole = 'party';
        this.currentRoleSub.next('party');
        this.altTokenSub.next(token);
      } else if (token.includes('party')) {
        this.currentRole = 'vendor';
        this.currentRoleSub.next('vendor');
        this.altTokenSub.next(token);
      }
      return true;
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
