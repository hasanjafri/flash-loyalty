import { Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { NotificationsPanelComponent } from '../notifications-panel/notifications-panel.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @ViewChildren('toolbarIcons') toolbarIcons: QueryList<ElementRef>;
  @Input() active: boolean;

  currentRole: string;
  currentRoleSub: Subscription;
  toolbarLinks = [
    {
      icon: 'search',
      click: () => this.openSearch()
    },
    {
      icon: 'color_lens'
    },
    {
      icon: 'notifications_active',
      click: () => this.openNotifications()
    }
  ];

  constructor(private overlayService: OverlayService, private authService: AuthService) {}

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

  openSearch() {
    this.overlayService.open(SearchBarComponent, this.toolbarIcons.first);
  }

  openNotifications() {
    this.overlayService.open(NotificationsPanelComponent, this.toolbarIcons.last, null, true);
  }
}
