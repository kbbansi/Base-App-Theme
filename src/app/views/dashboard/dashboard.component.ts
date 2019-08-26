import { ServiceService } from '../../services/service.service';
import { CustomersService } from '../../services/customers.service';
import { AuthService } from 'app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
serviceList;
constructor(private auth: AuthService, private router: Router, private customer: CustomersService, private service: ServiceService) {}
  ngOnInit(): void {
    this.service.getService().subscribe(response => {
      this.serviceList = response;
    })
  }

  }
