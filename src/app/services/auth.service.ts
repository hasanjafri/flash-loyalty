import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  currentRole = "admin";
  currentRoleSub: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.currentRole
  );

  constructor(private http: HttpClient) {}

  register(email, password) {
    if (!email || !password) {
      return;
    } else {
      this.http
        .post("http://localhost:5000/auth/register", {
          email: email,
          password: password
        })
        .toPromise()
        .then(data => console.log(data));
    }
  }

  login(email, password) {
    if (!email || !password) {
      return;
    } else {
      this.http
        .post("http://localhost:5000/auth/login", {
          email: email,
          password: password
        })
        .toPromise()
        .then(data => console.log(data));
    }
  }

  changeRole(newRole) {
    this.currentRole = newRole;
    this.currentRoleSub.next(this.currentRole);
  }
}
