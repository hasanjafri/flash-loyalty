import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  barGraphOne = [
    {
      month: 'January',
      transactions: 100
    },
    {
      month: 'February',
      transactions: 200
    },
    {
      month: 'March',
      transactions: 300
    },
    {
      month: 'May',
      transactions: 400
    },
    {
      month: 'June',
      transactions: 500
    },
    {
      month: 'July',
      transactions: 600
    },
    {
      month: 'August',
      transactions: 700
    },
    {
      month: 'September',
      transactions: 800
    },
    {
      month: 'October',
      transactions: 900
    },
    {
      month: 'November',
      transactions: 1000
    },
    {
      month: 'December',
      transactions: 900
    }
  ];
  barGraphTwo = [
    {
      month: 'January',
      signups: 1000
    },
    {
      month: 'February',
      signups: 2000
    },
    {
      month: 'March',
      signups: 3100
    },
    {
      month: 'May',
      signups: 1400
    },
    {
      month: 'June',
      signups: 507
    },
    {
      month: 'July',
      signups: 684
    },
    {
      month: 'August',
      signups: 1257
    },
    {
      month: 'September',
      signups: 2035
    },
    {
      month: 'October',
      signups: 3333
    },
    {
      month: 'November',
      signups: 4123
    },
    {
      month: 'December',
      signups: 752
    }
  ];
  barGraphThree = [
    {
      vendorType: 'Applications',
      signups: 1000
    },
    {
      vendorType: 'Hardware',
      signups: 2000
    },
    {
      vendorType: 'Services',
      signups: 300
    },
    {
      vendorType: 'Software',
      signups: 4000
    }
  ];
  barGraphFour = [
    {
      month: 'January',
      signups: 10000
    },
    {
      month: 'February',
      signups: 20031
    },
    {
      month: 'March',
      signups: 30031
    },
    {
      month: 'May',
      signups: 4300
    },
    {
      month: 'June',
      signups: 5004
    },
    {
      month: 'July',
      signups: 6005
    },
    {
      month: 'August',
      signups: 7006
    },
    {
      month: 'September',
      signups: 5234
    },
    {
      month: 'October',
      signups: 1235
    },
    {
      month: 'November',
      signups: 2346
    },
    {
      month: 'December',
      signups: 3543
    }
  ];
}
