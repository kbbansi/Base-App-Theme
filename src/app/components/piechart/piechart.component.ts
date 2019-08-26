import { Component, OnInit, Input } from '@angular/core';
import { PieChartConfig } from 'pieconfig.module';
import { PiechartService } from 'app/services/piechart.service';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {
  @Input() data: any[];
  @Input() config: PieChartConfig;
  @Input() elementId: string;
  constructor(private _piechart: PiechartService) { }

  ngOnInit() {
    this._piechart.BuildPieChart(this.elementId, this.data, this.config);
  }

}
