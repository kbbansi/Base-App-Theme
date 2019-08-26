import { Component, OnInit, ViewContainerRef,TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

   modalRef: BsModalRef;
   staffForm:FormGroup;
   typeForm:FormGroup;
   deptForm:FormGroup;

   staffexpenseslist:any={};
   something:any;
   typeexpenseslist:any={};
   deptexpenseslist:any={};

   totaldeptexpenses:any;




  constructor(private fb: FormBuilder,private userservice:UserService,public toastr: ToastsManager,vRef: ViewContainerRef,private modalService: BsModalService) {
    this.toastr.setRootViewContainerRef(vRef);

   }

  ngOnInit() {

            this.staffForm = this.fb.group({
                year:[''],
                month:['']

            })


            this.deptForm = this.fb.group({
                year:[''],
                month:[''],
                company:['']


            })

           this.typeForm = this.fb.group({
                year:[''],
                month:[''],
                company:['']


            })





  }



  loaddepartmentexpenses()
   {
      this.deptexpenseslist={};
      this.totaldeptexpenses=0;
        this.userservice.loaddepartmentexpenses(this.deptForm.value).subscribe(response => {

          this.something=response;
          // console.log(this.something);

          this.deptexpenseslist=this.something.dept;

          this.totaldeptexpenses=this.something.all[0].total;

        })
   }


    loadstaffexpenses()
       {
          this.staffexpenseslist={};
          this.totaldeptexpenses=0;
          console.log(this.staffForm.value);

            this.userservice.loadstaffexpenses(this.staffForm.value).subscribe(response => {

              this.something=response;
              console.log(this.something);

              this.staffexpenseslist=this.something.staff;

              this.totaldeptexpenses=this.something.all[0].total;

            })
       }



    loadtypeexpenses()
       {
          this.typeexpenseslist={};
          this.totaldeptexpenses=0;
          console.log(this.staffForm.value);

            this.userservice.loadtypeexpenses(this.typeForm.value).subscribe(response => {

              this.something=response;
              console.log(this.something);

              this.typeexpenseslist=this.something.type;

              this.totaldeptexpenses=parseFloat(this.something.all[0].total).toFixed(2);

            })
       }



  exportdepartmentfees()
  {
          var options = {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: true,
          showTitle: true,
          useBom: false
        };
          // console.log(this.serviceList);

          new Angular2Csv(this.deptexpenseslist, 'Fees Per Department',options);
  }


  staffexport()
  {
          var options = {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: true,
          showTitle: true,
          useBom: false
        };
          // console.log(this.serviceList);

          new Angular2Csv(this.staffexpenseslist, 'Fees Per Staff',options);
  }

 typeexport()
  {
          var options = {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: true,
          showTitle: true,
          useBom: false
        };
          // console.log(this.serviceList);

          new Angular2Csv(this.typeexpenseslist, 'Fees Per Type',options);
  }




}
