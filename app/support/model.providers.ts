import {Provider} from "angular2/core";
import {CONST_EXPR} from "angular2/src/facade/lang";
import {SchoolService} from "../services/school/school.service";
import {StudentService} from "../services/student/student.service";
export const MODEL_PROVIDERS: any[] = CONST_EXPR([
    CONST_EXPR(new Provider(SchoolService, {useClass: SchoolService})),
    CONST_EXPR(new Provider(StudentService, {useClass: StudentService})),
]);
