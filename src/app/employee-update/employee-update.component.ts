import {Component, OnInit} from '@angular/core';
import {Employee} from "../employee";
import {NgForm} from "@angular/forms";
import {EmployeeServiceService} from "../employee-service.service";
import {ActivatedRoute, Router} from "@angular/router";

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
  id : number | undefined;

  /*
   Constructor & Methods.
   */

  constructor(private employeeService : EmployeeServiceService, private route : ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getEmployeeById();
  }

  onSubmit(employeeForm :NgForm) {

    if(employeeForm.form.invalid){
      employeeForm.form.markAllAsTouched();
      return;
    }

    this.updateEmployee(employeeForm.value);
  }

  private getEmployeeById() {
    this.employeeService.getEmployeeById(this.id).subscribe(
      success => {
        this.employee = success;
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
}
