import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  isOpened: boolean;
  currentRole: string;
  currentRoleSub: Subscription;

  private _active: boolean;
  get active(): boolean {
    return this._active;
  }
  @Input('active')
  set active(val: boolean) {
    this._active = val;
    this.isOpened = val;
  }

  sideNavItems = [
    {
      routes: [
        { title: 'View Vendors', route: 'view-vendors' },
        { title: 'Create New Vendor', route: 'create-vendor' }
      ],
      title: 'Vendors',
      icon: 'business',
      supports: ['admin']
    },
    {
      routes: [
        { title: 'View Promotions', route: '' },
        { title: 'Create New Promotion', route: '' }
      ],
      title: 'Promotions',
      icon: 'folder_special',
      supports: ['admin', 'vendor']
    },
    {
      routes: [
        { title: 'View Parties', route: '' },
        { title: 'Create New Party', route: '' }
      ],
      title: 'Parties',
      icon: 'business_center',
      supports: ['admin', 'vendor']
    },
    {
      routes: [
        { title: 'Vendor Report', route: '' },
        { title: 'Party Report', route: '' },
        { title: 'Promotions Report', route: '' }
      ],
      title: 'Reports',
      icon: 'file_copy',
      supports: ['admin', 'vendor', 'customer']
    },
    {
      routes: [
        { title: 'System Settings', route: '' },
        { title: 'My Settings', route: '' }
      ],
      title: 'System Parameters',
      icon: 'settings_system_daydream',
      supports: ['admin']
    }
  ];

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.currentRoleSub = await this.authService.currentRoleSub.subscribe(
      (currentRole) => (this.currentRole = currentRole)
    );
    console.log(this.currentRole);
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
