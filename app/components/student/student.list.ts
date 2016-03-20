import {Component, Input} from "angular2/core";
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {CwQuery} from "../../support/model.service";
import {ModelEntity} from "../../support/model.entity";

import {StudentService} from "../../services/student/student.service";
import {StudentItem} from "./student.item";
import {StudentForm} from "./student.form";


@Component({
  selector: 'Student-List',
  templateUrl:'app/components/student/student-list.html',
  directives: [StudentItem, StudentForm],
})
export class StudentList extends ModelEntity {
  visible: boolean = false;
  @Input()term = "";

  constructor(routeParams: RouteParams, service: StudentService){
       super(routeParams,service);
       this.list();
  }
  toggle() {
    this.visible = !this.visible;
  }
  search() {
    if (this.term) {
        this.service.find(CwQuery.Service()
            .icn('name', this.term)
        ).subscribe(json => {this.modelList = json.rows;});
    } else {
        this.list();
    }
  }
}
