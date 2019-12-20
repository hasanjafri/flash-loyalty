import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent implements OnInit {
  colors = [];
  colorsSub: Subscription;

  constructor(private themeService: ThemeService) {}

  async ngOnInit() {
    this.colorsSub = await this.themeService.colorsChangeSub.subscribe((colors) => (this.colors = colors));
  }

  async applyTheme() {
    await this.themeService.changeTheme(this.colors);
  }
}
