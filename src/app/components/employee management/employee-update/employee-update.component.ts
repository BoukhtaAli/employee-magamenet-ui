import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Employee} from "../../../domain-classes/employee/employee";
import {EmployeeServiceService} from "../../../api-services/employee-service/employee-service.service";
import {ConfirmationDialogService} from "../../confirmation-dialog/confirmatio-dialog-service";


@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  /*
   Data & Properties.
   */

  employee : Employee = new Employee();
  constantEmployee : Employee = new Employee();
  id : number | undefined;

  /*
   Constructor & Methods.
   */

  constructor(private employeeService : EmployeeServiceService, private route : ActivatedRoute, private router: Router, private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getEmployeeById();
  }

  onSubmit(employeeForm :NgForm) {

    if(employeeForm.form.invalid){
      employeeForm.form.markAllAsTouched();
      return;
    }

    this.openConfirmationDialog(employeeForm.value);
  }

  private getEmployeeById() {
    this.employeeService.getEmployeeById(this.id).subscribe(
      success => {
        this.employee = success;
        this.constantEmployee = {...success};
      },
      error => {
        console.log(error);
      }
    );
  }

  private updateEmployee(employee : Employee) {
    this.employeeService.updateExistingEmployee(employee).subscribe(
      success => {
        this.gotoEmployeeList();
      },
      error => {
        console.log(error);
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
    this.employee = {...this.constantEmployee};
    employeeForm.form.markAsPristine();
    employeeForm.form.markAsUntouched();
    employeeForm.form.updateValueAndValidity();
  }

  private openConfirmationDialog(employee : Employee) {

    this.confirmationDialogService.confirm('Confirmation Box...', 'Do you really want to update this item ?')
      .then((confirmed) => {
        if(confirmed){
          this.updateEmployee(employee);
        }else {
          return;
        }
      })
      .catch(() => console.log('An Error has occurred!'));
  }
}
