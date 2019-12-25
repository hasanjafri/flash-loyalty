import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-menu-header',
  templateUrl: './user-menu-header.component.html',
  styleUrls: ['./user-menu-header.component.scss']
})
export class UserMenuHeaderComponent implements OnInit, OnDestroy {
  @Input() active: boolean;

  email: string;
  emailSub: Subscription;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.emailSub = await this.authService.emailChangeSub.subscribe(
      (email) => (this.email = email.slice(0, email.indexOf('.')))
    );
  }

  ngOnDestroy() {
    if (this.emailSub) {
      this.emailSub.unsubscribe();
    }
  }
}
