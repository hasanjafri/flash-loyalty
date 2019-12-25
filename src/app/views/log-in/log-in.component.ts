import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OVERLAY_DATA } from 'src/app/config/overlay.config';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  @Input() type: string;
  @Output() submitEmitter = new EventEmitter<boolean>();

  forgotPassword = false;
  resetPassword = false;
  enteredEmail: string;
  enteredPassword: string;
  failedAttempts = 0;

  constructor(
    @Inject(OVERLAY_DATA) public overlayProps,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private notificationService: NotificationsService
  ) {}

  ngOnInit() {
    // this.type = this.route.snapshot.paramMap.get('type');
    if (this.overlayProps) {
      this.type = this.overlayProps.type;
    }
  }

  onClickForgotPassword() {
    this.forgotPassword = true;
  }

  async onSubmit() {
    if (this.forgotPassword) {
      this.resetPassword = true;
      this.forgotPassword = false;
      this.notificationService.showNotification('Password reset email sent.');
    } else {
      const res = await this.authService.login(this.enteredEmail, this.enteredPassword, this.type);
      console.log(res);
      if (res) {
        this.submitEmitter.emit(true);
        this.authService.changeRole(this.type.toLowerCase());
        // window.open('http://localhost:4200/dashboard');
        this.router.navigate(['/dashboard']);
      } else {
        this.failedAttempts += 1;
      }
    }
  }
}
