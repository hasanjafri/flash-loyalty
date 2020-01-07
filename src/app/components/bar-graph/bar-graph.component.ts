import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { AfterViewInit, Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() data: any;
  @Input() id: string;
  @Input() graphTitle: string;
  @Input() xLabel: string;
  @Input() yLabel: string;

  private chart: am4charts.XYChart;
  currentRole: string;
  currentRoleSub: Subscription;

  constructor(private zone: NgZone, private authService: AuthService) {}

  async ngOnInit() {
    this.currentRoleSub = await this.authService.currentRoleSub.subscribe(
      (currentRole) => (this.currentRole = currentRole)
    );
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      const chart = am4core.create(this.id, am4charts.XYChart);
      chart.data = this.data;

      const categoryAxes = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxes.dataFields.category = this.xLabel;
      categoryAxes.title.text = this.xLabel;
      categoryAxes.title.fontSize = 18;
      categoryAxes.title.marginTop = 30;
      categoryAxes.renderer.grid.template.location = 0;
      categoryAxes.renderer.minGridDistance = 30;

      categoryAxes.renderer.labels.template.adapter.add('dy', function(dy, target) {
        if (target.dataItem && target.dataItem.index) {
          return dy + 25;
        }
        return dy;
      });

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = this.yLabel;
      valueAxis.title.fontSize = 18;

      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = this.yLabel;
      series.dataFields.categoryX = this.xLabel;
      series.name = this.graphTitle;
      series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]';
      series.columns.template.fillOpacity = 0.8;
      series.columns.template.fill =
        this.currentRole === 'vendor'
          ? am4core.color('#0277BD')
          : this.currentRole === 'party'
          ? am4core.color('#D84315')
          : am4core.color('1e1e2d');

      const columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1;

      const title = chart.titles.create();
      title.text = this.graphTitle;
      title.fontSize = 25;
      title.marginBottom = 30;

      this.chart = chart;
      // const chart = am4core.create('bar-graph-div', am4charts.XYChart);

      // chart.paddingRight = 20;

      // const data = [];
      // let visits = 10;
      // for (let i = 1; i < 365; i++) {
      //   visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      //   data.push({ date: new Date(2019, 0, i), name: 'name' + i, value: visits });
      // }

      // chart.data = data;

      // const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      // dateAxis.renderer.grid.template.location = 0;

      // const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      // valueAxis.tooltip.disabled = true;
      // valueAxis.renderer.minWidth = 35;

      // const series = chart.series.push(new am4charts.LineSeries());
      // series.dataFields.dateX = 'date';
      // series.dataFields.valueY = 'value';

      // series.tooltipText = '{valueY.value}';
      // chart.cursor = new am4charts.XYCursor();

      // const scrollbarX = new am4charts.XYChartScrollbar();
      // scrollbarX.series.push(series);
      // chart.scrollbarX = scrollbarX;

      // this.chart = chart;
    });
  }

  ngOnDestroy() {
    if (this.currentRoleSub) {
      this.currentRoleSub.unsubscribe();
    }
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
