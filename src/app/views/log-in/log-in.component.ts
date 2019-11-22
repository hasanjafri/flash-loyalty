import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { OVERLAY_DATA } from "src/app/config/overlay.config";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.scss"]
})
export class LogInComponent implements OnInit {
  @Output() submitEmitter = new EventEmitter<boolean>();
  forgotPassword = false;
  resetPassword = false;

  constructor(
    @Inject(OVERLAY_DATA) public overlayProps,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  onClickForgotPassword() {
    this.forgotPassword = true;
  }

  onSubmit() {
    if (this.forgotPassword) {
      this.resetPassword = true;
      this.forgotPassword = false;
    } else {
      this.submitEmitter.emit(true);
      this.authService.changeRole(this.overlayProps.type.toLowerCase());
      this.router.navigate(["/dashboard"]);
    }
  }
}