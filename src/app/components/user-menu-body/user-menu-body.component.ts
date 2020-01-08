import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-user-menu-body',
  templateUrl: './user-menu-body.component.html',
  styleUrls: ['./user-menu-body.component.scss']
})
export class UserMenuBodyComponent implements OnInit, OnDestroy {
  @Input() active: boolean;
  currentRole: string;
  currentRoleSub: Subscription;
  altToken: string;
  altTokenSub: Subscription;

  menuLinks = [
    {
      title: 'My Profile',
      description: 'Account settings and more',
      icon: 'person'
    },
    {
      title: 'My Messages',
      description: 'Inbox and tasks',
      icon: 'message'
    },
    {
      title: 'My Activities',
      description: 'Logs and notifications',
      icon: 'notifications_active'
    },
    {
      title: 'My Tasks',
      description: 'Latest tasks and projects',
      icon: 'work'
    }
  ];

  constructor(private authService: AuthService, private overlayService: OverlayService) {}

  async ngOnInit() {
    this.currentRoleSub = await this.authService.currentRoleSub.subscribe(
      (currentRole) => (this.currentRole = currentRole)
    );
    this.altTokenSub = await this.authService.altTokenSub.subscribe((altToken) => (this.altToken = altToken));
  }

  ngOnDestroy() {
    if (this.currentRoleSub) {
      this.currentRoleSub.unsubscribe();
    }
    if (this.altTokenSub) {
      this.altTokenSub.unsubscribe();
    }
  }

  // openLoginModal(type: string) {
  //   if (this.active) {
  //     this.authService.changeRole(type);
  //   } else {
  //     this.overlayService.open(LogInComponent, null, { type: type.toUpperCase() });
  //   }
  // }

  handleLogin(type: string) {
    // if (type === '') {
    //   this.authService.changeRole(type);
    // }
    // if (this.currentRole === 'admin') {
    //   return;
    // } else if (this.currentRole === 'vendor') {
    //   this.overlayService.open(LogInComponent, null, { type: type });
    // } else if (this.currentRole === 'party') {
    //   this.overlayService.open(LogInComponent, null, { type: type });
    // }
    if (type === '') {
      this.authService.changeRole('');
    }

    this.authService.loginAlt(type);
  }
}
