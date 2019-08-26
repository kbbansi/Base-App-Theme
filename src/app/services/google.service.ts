import { Injectable } from '@angular/core';
declare var google: any;
@Injectable()
export class GoogleService {

  constructor() {
    google.charts.load('current', {'packages': ['corechart']});
   }

   protected buildChart(data: any[], chartFunc: any, options: any) : void {
    const func = (chartFunc, options) => {
      const datatable = google.visualization.arrayToDataTable(data);
      chartFunc().draw(datatable, options);
    };
    const callback = () => func(chartFunc, options);
    google.charts.setOnLoadCallback(callback);
  }

}
