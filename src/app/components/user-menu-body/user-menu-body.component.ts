import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { LogInComponent } from 'src/app/views/log-in/log-in.component';

@Component({
  selector: 'app-user-menu-body',
  templateUrl: './user-menu-body.component.html',
  styleUrls: ['./user-menu-body.component.scss']
})
export class UserMenuBodyComponent implements OnInit, OnDestroy {
  @Input() active: boolean;
  currentRole: string;
  currentRoleSub: Subscription;

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
  }

  ngOnDestroy() {
    if (this.currentRoleSub) {
      this.currentRoleSub.unsubscribe();
    }
  }

  openLoginModal(type: string) {
    if (this.active) {
      this.authService.changeRole(type);
    } else {
      this.overlayService.open(LogInComponent, null, { type: type.toUpperCase() });
    }
  }
}
