import {Component, Input} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {Router, RouterLink} from "angular2/router";

@Component({
  selector: 'Student-Item',
  templateUrl: 'app/components/student/student-item.html',
  directives: [CORE_DIRECTIVES, RouterLink],
})
export class StudentItem {
    @Input() modelData;
}
