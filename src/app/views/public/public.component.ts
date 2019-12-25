import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent {
  type: string;

  constructor(private cookieService: CookieService, private router: Router) {}

  // openLogin(type: string) {
  //   // const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=350,left=100,top=100`;
  //   // const loginWin = window.open(`http://localhost:4200/login/${type}`, 'Login to Loyal Rewards', params);
  //   // loginWin.focus();
  //   this.router.navigate([`/login/${type}`]);
  // }

  changeType(type: string) {
    this.type = type;
  }
}
