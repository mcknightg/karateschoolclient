import {Component, Input} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {Router, RouterLink} from "angular2/router";

@Component({
  selector: 'School-Item',
  templateUrl: 'app/components/school/school-item.html',
  directives: [CORE_DIRECTIVES, RouterLink],
})
export class SchoolItem {
    @Input() modelData;
}
