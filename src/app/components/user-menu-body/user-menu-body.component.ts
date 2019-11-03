import { Component } from '@angular/core';

@Component({
  selector: 'app-user-menu-body',
  templateUrl: './user-menu-body.component.html',
  styleUrls: ['./user-menu-body.component.scss']
})
export class UserMenuBodyComponent {
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
}
