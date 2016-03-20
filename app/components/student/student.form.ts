import {Component, Input} from "angular2/core";
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {ModelEntity} from "../../support/model.entity";
import {StudentService} from "../../services/student/student.service";

@Component({
  selector: 'Student-Form',
  templateUrl:'app/components/student/student-form.html'
})
export class StudentForm extends ModelEntity {
  visible: boolean = false;
  constructor(routeParams: RouteParams, service: StudentService){
       super(routeParams,service);
  }
  toggle() {
    this.visible = !this.visible;
  }
}


