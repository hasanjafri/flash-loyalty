import { Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { ThemeService } from 'src/app/services/theme.service';
import { NotificationsPanelComponent } from '../notifications-panel/notifications-panel.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ThemePickerComponent } from '../theme-picker/theme-picker.component';

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
  email: string;
  emailSub: Subscription;
  colors = ['#FFFFFF'];
  colorsSub: Subscription;

  toolbarLinks = [
    {
      icon: 'search',
      click: () => this.openSearch()
    },
    {
      icon: 'color_lens',
      click: () => this.openThemePicker()
    },
    {
      icon: 'notifications_active',
      click: () => this.openNotifications()
    }
  ];

  constructor(
    private overlayService: OverlayService,
    private authService: AuthService,
    private themeService: ThemeService
  ) {}

  async ngOnInit() {
    this.currentRoleSub = await this.authService.currentRoleSub.subscribe(
      (currentRole) => (this.currentRole = currentRole)
    );
    this.colorsSub = await this.themeService.colorsChangeSub.subscribe((colors) => (this.colors = colors));
    this.emailSub = await this.authService.emailChangeSub.subscribe((email) => (this.email = email));
  }

  ngOnDestroy() {
    if (this.currentRoleSub) {
      this.currentRoleSub.unsubscribe();
    }
    if (this.colorsSub) {
      this.colorsSub.unsubscribe();
    }
    if (this.emailSub) {
      this.emailSub.unsubscribe();
    }
  }

  openSearch() {
    this.overlayService.open(SearchBarComponent, this.toolbarIcons.first);
  }

  openNotifications() {
    this.overlayService.open(NotificationsPanelComponent, this.toolbarIcons.last, null, true);
  }

  openThemePicker() {
    console.log('oyoyoyoyo');
    this.overlayService.open(
      ThemePickerComponent,
      this.toolbarIcons.filter((element, index) => index === 1),
      null,
      false
    );
  }
}
