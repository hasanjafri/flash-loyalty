import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  isOpened = true;
  currentRole: string;
  currentRoleSub: Subscription;

  sideNavItems = [
    {
      routes: [
        { title: 'View Vendors', route: 'view-vendors' },
        { title: 'Create New Vendor', route: 'create-vendor' }
      ],
      title: 'Vendors',
      icon: 'business'
    },
    {
      routes: [{ title: 'View Promotions', route: '' }, { title: 'Create New Promotion', route: '' }],
      title: 'Promotions',
      icon: 'folder_special'
    },
    {
      routes: [{ title: 'View Parties', route: '' }, { title: 'Create New Party', route: '' }],
      title: 'Parties',
      icon: 'business_center'
    },
    {
      routes: [{ title: 'View Users', route: '' }, { title: 'Create New User', route: '' }],
      title: 'Users',
      icon: 'verified_user'
    },
    {
      routes: [
        { title: 'Vendor Report', route: '' },
        { title: 'Party Report', route: '' },
        { title: 'Promotions Report', route: '' }
      ],
      title: 'Reports',
      icon: 'file_copy'
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

  toggleNav() {
    this.isOpened = !this.isOpened;
  }
}
