import {Component, Input} from "angular2/core";
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {ModelEntity} from "../../support/model.entity";
import {SchoolService} from "../../services/school/school.service";

@Component({
  selector: 'School-Form',
  templateUrl:'app/components/school/school-form.html'
})
export class SchoolForm extends ModelEntity {
  visible: boolean = false;
  constructor(routeParams: RouteParams, service: SchoolService){
       super(routeParams,service);
  }
  toggle() {
    this.visible = !this.visible;
  }
}


