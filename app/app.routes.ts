import {RouteDefinition} from 'angular2/router';
import {HomeComponent} from "./components/home/home.component";
import {Login} from "./components/login/login.component";
import {SchoolList} from "./components/school/school.list";
import {SchoolForm} from "./components/school/school.form";
import {StudentList} from "./components/student/student.list";
import {StudentForm} from "./components/student/student.form";

export var APP_ROUTES: RouteDefinition[] = [
    { path: '/login', name: 'Login', component: Login },
    { path: '/home', name: 'Home', component: HomeComponent, useAsDefault: true },
    //Routes For School
    { path: '/schools', name: 'SchoolList', component: SchoolList },
    { path: '/school', name: 'SchoolForm', component: SchoolForm },
    { path: '/school/:id', name: 'SchoolEdit', component: SchoolForm },
    //Routes For Student
    { path: '/students', name: 'StudentList', component: StudentList },
    { path: '/student', name: 'StudentForm', component: StudentForm },
    { path: '/student/:id', name: 'StudentEdit', component: StudentForm },
];
