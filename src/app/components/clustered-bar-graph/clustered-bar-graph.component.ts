import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { AfterViewInit, Component, NgZone, OnDestroy } from "@angular/core";

am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-clustered-bar-graph",
  templateUrl: "./clustered-bar-graph.component.html",
  styleUrls: ["./clustered-bar-graph.component.scss"]
})
export class ClusteredBarGraphComponent implements AfterViewInit, OnDestroy {
  private chart: am4charts.XYChart;

  constructor(private zone: NgZone) {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      const chart = am4core.create("clustered-bar-graph", am4charts.XYChart);

      chart.data = [
        {
          year: 2005,
          income: 23.5,
          expenses: 18.1
        },
        {
          year: 2006,
          income: 26.2,
          expenses: 22.8
        },
        {
          year: 2007,
          income: 30.1,
          expenses: 23.9
        },
        {
          year: 2008,
          income: 29.5,
          expenses: 25.1
        },
        {
          year: 2009,
          income: 24.6,
          expenses: 25
        }
      ];

      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "year";
      categoryAxis.numberFormatter.numberFormat = "#";
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.cellStartLocation = 0.1;
      categoryAxis.renderer.cellEndLocation = 0.9;

      const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.opposite = true;

      this.createSeries(chart, "income", "Income");
      this.createSeries(chart, "expenses", "Expenses");

      const title = chart.titles.create();
      title.text = "Double Bar Graph";
      title.fontSize = 25;

      this.chart = chart;
    });
  }

  createSeries(chart, field, name) {
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = field;
    series.dataFields.categoryY = "year";
    series.name = name;
    series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
    series.columns.template.height = am4core.percent(100);
    series.sequencedInterpolation = true;

    let valueLabel = series.bullets.push(new am4charts.LabelBullet());
    valueLabel.label.text = "{valueX}";
    valueLabel.label.horizontalCenter = "left";
    valueLabel.label.dx = 10;
    valueLabel.label.hideOversized = false;
    valueLabel.label.truncate = false;

    let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
    categoryLabel.label.text = "{name}";
    categoryLabel.label.horizontalCenter = "right";
    categoryLabel.label.dx = -10;
    categoryLabel.label.fill = am4core.color("#fff");
    categoryLabel.label.hideOversized = false;
    categoryLabel.label.truncate = false;
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
