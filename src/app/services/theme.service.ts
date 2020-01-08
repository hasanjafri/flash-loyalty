import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService implements OnDestroy {
  currentRole: string;
  currentRoleSub: Subscription;
  themeChangeSub: Subscription;
  colors = [];
  colorsChangeSub = new BehaviorSubject(this.colors);

  constructor(
    private authService: AuthService,
    private notificationsService: NotificationsService,
    private cookieService: CookieService,
    private http: HttpClient
  ) {
    this.initSubs();
  }

  async initSubs() {
    this.currentRoleSub = await this.authService.currentRoleSub.subscribe(
      (currentRole) => (this.currentRole = currentRole)
    );
    this.themeChangeSub = await this.authService.themeChangeSub.subscribe((colors) => {
      console.log(colors);
      this.colors = colors;
      this.setTheme(colors[0], colors[1], colors[2]);
      this.colorsChangeSub.next(colors);
    });
  }

  async changeTheme(colors) {
    const user_id = localStorage.getItem('api_token');
    if (user_id) {
      const res = await this.http
        .post(`${environment.serverUrl}changetheme`, {
          user_id: user_id,
          userType: this.currentRole,
          primary_color: colors[0],
          secondary_color: colors[1],
          accent: colors[2]
        })
        .toPromise();

      console.log(res);
      if (res['status'] === '200') {
        this.notificationsService.showNotification('Successfully changed theme.');
        this.colors = res['colors'];
        this.setTheme(this.colors[0], this.colors[1], this.colors[2]);
        this.colorsChangeSub.next(res['colors']);
      }
    }
  }

  setTheme(primary, secondary, accent) {
    localStorage.setItem('primary', primary);
    localStorage.setItem('secondary', secondary);
    localStorage.setItem('accent', accent);
    return;
  }

  ngOnDestroy() {
    if (this.currentRoleSub) {
      this.currentRoleSub.unsubscribe();
    }
    if (this.themeChangeSub) {
      this.themeChangeSub.unsubscribe();
    }
  }
}
