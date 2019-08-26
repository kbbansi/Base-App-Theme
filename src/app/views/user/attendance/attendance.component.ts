import { Component, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  modalRef: BsModalRef;
  staffForm: FormGroup;
  typeForm: FormGroup;
  previousAttendanceForm: FormGroup;
  attendanceReportsForm: FormGroup;


  staffexpenseslist: any = {};
  something: any;
  typeexpenseslist: any = {};
  deptexpenseslist: any = {};

  totaldeptexpenses: any;

  attendancelist: any = {};
  previousAttendanceList: any = {};
  attendanceReportList: any = {};
  data: any = {};
  date: string;
  previousDate: string;



  constructor(private fb: FormBuilder, private userservice: UserService, public toastr: ToastsManager, vRef: ViewContainerRef,
    private modalService: BsModalService) {
    this.toastr.setRootViewContainerRef(vRef);

  }

  ngOnInit() {

    this.attendanceReportsForm = this.fb.group({
      reportType: [''],
      date: new FormControl(new Date())
    })


    this.previousAttendanceForm = this.fb.group({
      previousDate: new FormControl(new Date())
    })
    //
    // this.typeForm = this.fb.group({
    //      year:[''],
    //      month:[''],
    //      company:['']
    //  })
    this.loadtodayattendance();

  }

  showDate() {
    this.data = this.previousAttendanceForm.value;
    console.log(this.data);
  }

  loadtodayattendance() {
    this.attendancelist = {};
    this.data = new Date();
    console.log('The Raw unformatted date is:' + this.data);

    const todayAttendance = this.formartDate(this.data);
    console.log('The formatted date is:' + todayAttendance);
    this.userservice.loadtodayattendance(todayAttendance).subscribe(response => {
      this.something = response;

       console.log(this.something);
      this.attendancelist = this.something.message;
    })

  }

  loadPreviousAttendance() {
    this.previousAttendanceList = {};
    this.data = this.previousAttendanceForm.value;
    this.previousDate = this.formartDate(this.data['previousDate']);
    console.log(this.previousDate + '\n');

    this.userservice.loadtodayattendance(this.previousDate).subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.previousAttendanceList = this.something.message;
    })
  }


  loadAttendanceReport() {
    this.attendanceReportList = {};
    this.data = this.attendanceReportsForm.value;
    console.log(this.data['reportType'] + '\n' + this.data['date']);
    this.date = this.formartDate(this.data['date']);
    console.log(this.date)

    const data = {
      reportType: this.data['reportType'],
      reportDate: this.date
    };
    this.userservice.loadattendanceReport(data).subscribe(response => {
      this.something = response;
      console.log(this.something);
      this.attendanceReportList = this.something.message;
    })
  }


  exportReport() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: false
    };
    // tslint:disable-next-line: no-unused-expression
    new Angular2Csv(this.attendanceReportList, 'Attendance Report', options)
  }

  formartDate(date) {
    // tslint:disable-next-line: prefer-const
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      // tslint:disable-next-line: prefer-const
      year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) { day = '0' + day; }

    return [year.toString(), month.toString(), day.toString()].join('-');
  }
}
