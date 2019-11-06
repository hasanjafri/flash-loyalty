import { Component } from '@angular/core';
import { OverlayService } from 'src/app/services/overlay.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  constructor(private overlayService: OverlayService) {}

  toolbarLinks = [
    {
      icon: 'search',
      click: this.openSearch()
    },
    {
      icon: 'notifications_active'
    },
    {
      icon: 'graphic_eq'
    }
  ];

  openSearch() {
    this.overlayService.open(SearchBarComponent);
  }
}
