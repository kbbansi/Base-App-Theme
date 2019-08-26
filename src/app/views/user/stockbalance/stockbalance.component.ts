
import { Component, OnInit, ViewContainerRef,TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
var $  = require('jquery');
require('../../../../../node_modules/jquery-csv/src/jquery.csv.js');

import * as Papa from 'papaparse';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

const URL = 'https://cragdb.herokuapp.com/api/sign-s3/';

@Component({
  selector: 'app-stockbalance',
  templateUrl: './stockbalance.component.html',
  styleUrls: ['./stockbalance.component.scss']
})
export class StockbalanceComponent implements OnInit {
 modalRef: BsModalRef;

 
  
  itemlist:any={};

  something:any;




  constructor(private fb: FormBuilder,private userservice:UserService,public toastr: ToastsManager,vRef: ViewContainerRef,private modalService: BsModalService) {
    this.toastr.setRootViewContainerRef(vRef);

   }

  ngOnInit() {
   

   

    this.loadbalance();
   
  }

  
     loadbalance()
     {
        // this.userservice.loadbalance().subscribe(response => {

        //     this.something=response;
        //     this.itemlist=this.something;
        //   })
     }


  

}
