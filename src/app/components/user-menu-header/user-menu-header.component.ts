import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-menu-header',
  templateUrl: './user-menu-header.component.html',
  styleUrls: ['./user-menu-header.component.scss']
})
export class UserMenuHeaderComponent implements OnInit {
  @Input() active: boolean;

  constructor() {}

  ngOnInit() {}
}
