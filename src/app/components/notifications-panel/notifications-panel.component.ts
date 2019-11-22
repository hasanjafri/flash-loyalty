import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-notifications-panel",
  templateUrl: "./notifications-panel.component.html",
  styleUrls: ["./notifications-panel.component.scss"]
})
export class NotificationsPanelComponent implements OnInit {
  notifications = [
    {
      img: "../../../assets/media/images/avatar.png",
      name: "Sample Notification 1",
      description: "Sample Message 1"
    },
    {
      img: "../../../assets/media/images/avatar.png",
      name: "Sample Notification 2",
      description: "Sample Message 2"
    },
    {
      img: "../../../assets/media/images/avatar.png",
      name: "Sample Notification 3",
      description: "Sample Message 3"
    }
  ];

  constructor() {}

  ngOnInit() {}
}
