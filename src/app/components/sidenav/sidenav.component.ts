import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  sideNavItems = [
    {
      routes: [{ title: 'View Vendors', route: '' }, { title: 'Create New Vendor', route: '' }],
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
}
