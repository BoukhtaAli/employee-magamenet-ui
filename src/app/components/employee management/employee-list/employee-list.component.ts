import { Component, OnInit, Inject} from '@angular/core';
import { faEdit , faEye, faMinus} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {Employee} from "../../../domain-classes/employee/employee";
import {EmployeeServiceService} from "../../../api-services/employee-service/employee-service.service";
import {ConfirmationDialogService} from "../../../commons/confirmation-dialog/confirmatio-dialog-service";
import {NotyfService} from "../../../commons/js-code/notyf/notyf.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  /*
   Data & Properties
   */

  employees : Employee[] = [];
  faEdit = faEdit;
  faEye = faEye;
  faMinus = faMinus;

  /*
   Constructor & Methods
   */

  constructor(private employeeService: EmployeeServiceService,
              private router: Router,
              private confirmationDialogService: ConfirmationDialogService,
              private translateService: TranslateService,
              private notyfService : NotyfService) {

  }

  ngOnInit(): void {
    this.retrieveEmployees();
  }

  private retrieveEmployees() {
    this.employeeService.getEmployeeList().subscribe(response => {
      this.employees = response;
  });
  }

  updateEmployee(id : number | undefined) {
    this.router.navigate(["/updateEmployee",id]);
  }

  deleteEmployee(id: number | undefined) {
    this.openConfirmationDialog(id);
  }

  getEmployee(id: number | undefined) {
    this.router.navigate(["/getEmployee",id]);
  }

  gotoAddEmployee() {
    this.router.navigate(["/createEmployee"]);
  }

  private openConfirmationDialog(id:number|undefined) {

    this.confirmationDialogService.confirm('Confirmation Box...', 'Do you really want to delete this item ?')
      .then((confirmed) => {
        if(confirmed){
          this.employeeService.deleteEmployeeById(id).subscribe(
            response  => {
              this.notyfService.showNotyf("success",this.translateService.instant('employee-management.space.notyf.delete.success'));
              this.retrieveEmployees();
            },
            error => {
              this.notyfService.showNotyf("error",this.translateService.instant('employee-management.space.notyf.delete.error'));
            }
          );
        }else {
          return;
        }
      })
      .catch(() => console.log('An Error has occurred!'));
  }
}
