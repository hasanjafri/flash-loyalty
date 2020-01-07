import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  images = [
    {
      src: '../../../assets/media/images/bihero.jpg',
      title: 'Specifically Catered For You',
      description: 'Unique customizable plans to accomodate your business needs'
    },
    {
      src: '../../../assets/media/images/heroimg.jpeg',
      title: 'Real-Time Data Graphs & Tables',
      description: 'Customize notifications, party alerts and manage real-time business stats on the go'
    },
    {
      src: '../../../assets/media/images/softwaresolution.jpg',
      title: 'Robust Software Solution',
      description: 'Rest easy and control how your partys are rewarded with 24/7 available management and support'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
