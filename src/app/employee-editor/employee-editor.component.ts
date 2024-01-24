import {Component, Input} from '@angular/core';
import {Employee} from "../Employee";
import {EmployeeListComponent} from "../employee-list/employee-list.component";

@Component({
  selector: 'app-employee-editor',
  templateUrl: './employee-editor.component.html',
  styleUrls: ['./employee-editor.component.css']
})
export class EmployeeEditorComponent {

  @Input() employee?: Employee;
  isDisabled = true;

  constructor(private listComponent: EmployeeListComponent) {
    this.isDisabled = true;
  }

  back() {
    //according to our wireframe this currently is the wrong behaviour
    this.employee = undefined;
    this.isDisabled = true;
    this.listComponent.resetSelectedEmployee();
  }

  edit() {
    //make buttons editable
    //make other buttons visible and hide some buttons
    this.isDisabled = false;
  }

  delete() {
    //call database to delete
  }

  all() {
    this.employee = undefined;
    this.isDisabled = true;
    this.listComponent.resetSelectedEmployee();
  }
}
