import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-menu-body',
  templateUrl: './user-menu-body.component.html',
  styleUrls: ['./user-menu-body.component.scss']
})
export class UserMenuBodyComponent implements OnInit, OnDestroy {
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

  constructor(private authService: AuthService) {}

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

  changeRole(newRole) {
    this.authService.changeRole(newRole);
  }
}
