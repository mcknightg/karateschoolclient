import {Component} from 'angular2/core';
import {Router, CanActivate} from 'angular2/router';
import {SecuredView} from "../../directives/secured.view";


@Component({
    selector: 'home',
    templateUrl: 'app/components/home/home.html',
    styleUrls: [
        'app/components/home/home.css'
    ]
})

export class HomeComponent {
}
