import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthenticated: boolean;
  authSub: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    this.initSub();
  }

  async initSub() {
    this.authSub = await this.authService.authSub.subscribe((authenticated) => (this.isAuthenticated = authenticated));
  }
}
