import {Component, Input} from "angular2/core";
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {CwQuery} from "../../support/model.service";
import {ModelEntity} from "../../support/model.entity";

import {SchoolService} from "../../services/school/school.service";
import {SchoolItem} from "./school.item";
import {SchoolForm} from "./school.form";


@Component({
  selector: 'School-List',
  templateUrl:'app/components/school/school-list.html',
  directives: [SchoolItem, SchoolForm],
})
export class SchoolList extends ModelEntity {
  visible: boolean = false;
  @Input()term = "";

  constructor(routeParams: RouteParams, service: SchoolService){
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
