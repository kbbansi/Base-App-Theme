import { MarketingService } from './../../../services/marketing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operation-prospect',
  templateUrl: './operation-prospect.component.html',
  styleUrls: ['./operation-prospect.component.scss']
})
export class OperationProspectComponent implements OnInit {
  prospectList: any = {};
  constructor(private marketing: MarketingService) { }

  ngOnInit() {
    this.marketing.getProspect().subscribe(response => {
      this.prospectList = response;
    })
  }

}
