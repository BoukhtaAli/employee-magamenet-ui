import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Employee} from "../../../domain-classes/employee/employee";
import {EmployeeServiceService} from "../../../api-services/employee-service/employee-service.service";
import {ConfirmationDialogService} from "../../../commons/confirmation-dialog/confirmatio-dialog-service";
import {TranslateService} from '@ngx-translate/core';
import {NotyfService} from "../../../commons/js-code/notyf/notyf.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {

  /*
   Data & Properties.
   */

  employee : Employee = new Employee();

  /*
   Constructor and Methods.
   */

  constructor(private employeeService: EmployeeServiceService,
              private router: Router,
              private confirmationDialogService: ConfirmationDialogService,
              private translateService: TranslateService,
              private notyfService : NotyfService) { }

  ngOnInit(): void {
  }

  onSubmit(employeeForm :NgForm) {

    if(employeeForm.form.invalid){
      employeeForm.form.markAllAsTouched();
      return;
    }

    this.openConfirmationDialog(employeeForm.value);
  }

  private saveEmployee(employee: Employee) {
    this.employeeService.createNewEmployee(employee).subscribe(
      success => {
        this.gotoEmployeeList();
        this.notyfService.showNotyf("success",this.translateService.instant('employee-management.add-view.notyf.create.success'));
      },
      error => {
        this.handleResponseError(error);
      }
    );
  }

  private gotoEmployeeList(){
    this.router.navigate(["/employees"]);
  }

  onClose() {
    this.gotoEmployeeList();
  }

  onReset(employeeForm :NgForm) {
    this.employee = new Employee();
    employeeForm.form.markAsPristine();
    employeeForm.form.markAsUntouched();
    employeeForm.form.updateValueAndValidity();

    this.notyfService.showNotyf("warning",this.translateService.instant('employee-management.add-view.notyf.reset.success'));
  }

  private openConfirmationDialog(employee : Employee) {

    this.confirmationDialogService.confirm(this.translateService.instant('employee-management.add-view.confirmationBox.title'), this.translateService.instant('employee-management.add-view.confirmationBox.message'),)
      .then((confirmed) => {
        if(confirmed){
          this.saveEmployee(employee);
        }else {
          return;
        }
      })
      .catch(() => console.log('An Error has occurred!'));
  }

  private handleResponseError(error: HttpErrorResponse) {
    if(error.status === 0){
      this.notyfService.showNotyf("error",this.translateService.instant('employee-management.add-view.notyf.create.error'));
    }else if(error.status === 400 ){
      this.notyfService.showNotyf("error",error.error);
    }
  }
}
