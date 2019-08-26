import { Component, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
    selector: 'app-departments',
    templateUrl: './departments.component.html',
    styleUrls: ['./departments.component.scss']
})
export class DepartmentComponent implements OnInit {
    modalRef: BsModalRef;

    // the form group
    departmentmodalForm: FormGroup;
    updateDepartmentModalForm: FormGroup;

    // data objects
    departmentlist: any = {};

    // data manipulation objects
    something: any = {};
    data: any = {};


    // the constructor + dependency injection
    constructor(private formBuilder: FormBuilder, private userService: UserService, public toastr: ToastsManager, vRef: ViewContainerRef,
        private modalService: BsModalService) {
        this.toastr.setRootViewContainerRef(vRef);
    }
    ngOnInit() {
        // do something, load departments
        this.loaddepartment();
    }

    loaddepartment() {
        this.departmentlist = {};
        this.userService.loaddepartmentlist().subscribe(response => {
            this.something = response;
            // console.log(this.something); this is a test
            this.departmentlist = this.something.message;
        })
    }

    opendepartmentsmodal(template: TemplateRef<any>) {
        this.departmentmodalForm = this.formBuilder.group({
            name: ['', Validators.required],
            hod: ['', Validators.required],
            description: ['', Validators.required],
        })
        this.modalRef = this.modalService.show(template);
    }

    savedepartment() {
        this.userService.savedepartment(this.departmentmodalForm.value).subscribe(response => {
            // test console.log(response)
            if (response['status'] === 1) {
                this.toastr.success('Saved Successfully', 'HR App')
                    .then((toast) => {
                        this.departmentmodalForm.reset();
                        this.ngOnInit();
                    })
                this.modalRef.hide();
                this.loaddepartment();
            } else if (response['status'] === 0) {
                this.toastr.error('Unsuccessful', 'HR App')
                    .then((toast) => {
                        this.departmentmodalForm.reset();
                        this.ngOnInit();
                    })
                this.modalRef.hide();
            }
        })
    }

    openUpdateDepartmentModal(d, template: TemplateRef<any>) {
        this.loaditems();
        this.updateDepartmentModalForm = this.formBuilder.group({
            departmentid: [d.id],
            name: [d.name],
            hod: ['', Validators.required],
            description: ['', Validators.required],
        })

        this.modalRef = this.modalService.show(template);
    }
    loaditems() {
        this.departmentlist = {};
        this.userService.loaddepartmentlist().subscribe(response => {
            this.something = response;
            this.departmentlist = this.something;
        })
    }

    updateDepartment() {
        this.userService.updatedepartment(this.updateDepartmentModalForm.value)
        .subscribe(response => {
            if (response['status'] === 1) {
                this.toastr.info('Updated Successfully', 'HR App')
                .then((toast) => {
                    this.updateDepartmentModalForm.reset();
                    this.ngOnInit();
                })
                this.modalRef.hide();
                this.loaddepartment();
            } else if (response['status'] === 0) {
                this.toastr.error('Unsuccessful', 'HR App')
                .then((toast) => {
                    this.updateDepartmentModalForm.reset();
                    this.ngOnInit();
                })
                this.modalRef.hide();
            }
        })
    }
}
