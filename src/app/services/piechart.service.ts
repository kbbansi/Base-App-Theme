import { PieChartConfig } from './../../pieconfig.module';
import { GoogleService } from './google.service';
import { Injectable } from '@angular/core';

declare var google: any;
@Injectable()
export class PiechartService extends GoogleService {

  constructor() {super() }




  public BuildPieChart(elementId: string, data: any[], config: PieChartConfig): void {
    const chartFunc = () => { return new google.visualization.PieChart(document.getElementById(elementId)); };
    const options = {
            title: config.title,
            pieHole: config.pieHole,
      };

    this.buildChart(data, chartFunc, options);
  }

  graphing(result): any {
    console.log(result);
    const labels = [];
    const dataArray = [];
    const full = [];
    for (let i = 0; i < result.length; i++) {
      dataArray.push(result[i].total);
      labels.push(result[i].label);
      const t = {
        data: result[i].total,
        label: result[i].label
      }
      full.push(t);
    }
    return {
        data: dataArray,
        label: labels,
        full: full
    }
  }

}
