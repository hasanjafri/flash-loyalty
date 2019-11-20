import { Component, Inject, OnInit } from '@angular/core';
import { OVERLAY_DATA } from 'src/app/config/overlay.config';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  constructor(@Inject(OVERLAY_DATA) public overlayProps) {}

  ngOnInit() {}

  test() {
    console.log(this.overlayProps);
    console.log('YEYEYEYEYE');
  }
}
