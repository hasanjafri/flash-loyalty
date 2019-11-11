import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentRole = 'admin';
  currentRoleSub: BehaviorSubject<string> = new BehaviorSubject<string>(this.currentRole);

  changeRole(newRole) {
    this.currentRole = newRole;
    this.currentRoleSub.next(this.currentRole);
  }
}
