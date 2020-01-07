import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  forgotPassword = false;
  resetPassword = false;
  enteredEmail: string;
  enteredPassword: string;
  failedAttempts = 0;
  type: string;
  @Output() submitEmitter = new EventEmitter<boolean>();

  constructor(
    private notificationService: NotificationsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

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
