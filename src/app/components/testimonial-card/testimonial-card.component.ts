import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonial-card',
  templateUrl: './testimonial-card.component.html',
  styleUrls: ['./testimonial-card.component.scss']
})
export class TestimonialCardComponent implements OnInit {
  testimonials = [
    {
      src: '../../../assets/media/images/logo1.jpg',
      alt: 'Fire Logo',
      rating: 8
    },
    {
      src: '../../../assets/media/images/logo2.jpg',
      alt: 'Slack Logo',
      rating: 9
    },
    {
      src: '../../../assets/media/images/logo3.jpg',
      alt: 'Mooi Logo',
      rating: 10
    },
    {
      src: '../../../assets/media/images/logo4.jpg',
      alt: 'Alphabet Logo',
      rating: 9
    }
  ];

  constructor() {}

  ngOnInit() {}
}
