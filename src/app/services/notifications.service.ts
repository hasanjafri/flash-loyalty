import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationSnackbarComponent } from '../components/notification-snackbar/notification-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  notificationDuration = 5;

  constructor(private snackBar: MatSnackBar) {}

  showNotification(message: string) {
    this.snackBar.openFromComponent(NotificationSnackbarComponent, {
      duration: this.notificationDuration * 1000,
      data: { message },
      panelClass: 'notification-container',
      verticalPosition: 'top'
    });
  }
}
