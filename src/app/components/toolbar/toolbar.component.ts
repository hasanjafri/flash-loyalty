import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { OverlayService } from 'src/app/services/overlay.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @ViewChildren('toolbarIcons') toolbarIcons: QueryList<ElementRef>;

  toolbarLinks = [
    {
      icon: 'search',
      click: () => this.openSearch()
    },
    {
      icon: 'notifications_active'
    },
    {
      icon: 'graphic_eq'
    }
  ];

  constructor(private overlayService: OverlayService) {}

  openSearch() {
    this.overlayService.open(SearchBarComponent, this.toolbarIcons.first);
  }
}
