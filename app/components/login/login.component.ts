import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {Response} from "angular2/http";
import {inject} from "angular2/testing";
import {Http} from "angular2/http";
import {AuthService} from "../../services/auth/auth.service";




@Component({
    selector: 'login',
    templateUrl: 'app/components/login/login.html'
})
export class Login {
    model = {login: '', password: ''};
    user = null;
    constructor(private router: Router, private auth: AuthService) {

    }
    route(json) {
        console.log(json);
        this.router.parent.navigate(['Home']);
    }
    account() {
        this.auth.account()
        .subscribe((json) => this.route(json));
    }
    login() {
        this.auth.login(this.model.login, this.model.password, true)
        .subscribe((json) => this.account());
    }
}
