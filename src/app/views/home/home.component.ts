import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GraphDataService } from 'src/app/services/graph-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  graphData = [];
  graphDataSub: Subscription;

  constructor(private graphDataService: GraphDataService) {}

  async ngOnInit() {
    this.graphDataSub = await this.graphDataService.graphDataSub.subscribe((graphData) => (this.graphData = graphData));
  }

  ngOnDestroy() {
    if (this.graphDataSub) {
      this.graphDataSub.unsubscribe();
    }
  }
}
