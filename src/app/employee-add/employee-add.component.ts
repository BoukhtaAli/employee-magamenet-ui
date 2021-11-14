import { Component, OnInit } from '@angular/core';
import {Employee} from "../employee";
import {EmployeeServiceService} from "../employee-service.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

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

  constructor(private employeeService: EmployeeServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(employeeForm :NgForm) {

    if(employeeForm.form.invalid){
      employeeForm.form.markAllAsTouched();
      return;
    }

    this.saveEmployee(employeeForm.value);
  }

  private saveEmployee(employee: Employee) {
    this.employeeService.createNewEmployee(employee).subscribe(
      success => {
        this.gotoEmployeeList();
      },
      error => {console.log(error)}
    );
  }

  private gotoEmployeeList(){
    this.router.navigate(["/employees"]);
  }

  onClose() {
    this.gotoEmployeeList();
  }
}
