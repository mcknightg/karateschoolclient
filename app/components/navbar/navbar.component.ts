import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouterLink, RouteDefinition} from 'angular2/router';
import {Router} from "angular2/router";
import {AuthService} from "../../services/auth/auth.service";
import {SecuredView} from "../../directives/secured.view";


@Component({
    selector: 'navbar',
    templateUrl: 'app/components/navbar/navbar.html',
    directives: [RouterLink, CORE_DIRECTIVES, SecuredView]
})
export class NavbarComponent {

    constructor(private router: Router, private auth: AuthService) {

    }
    @Input() brand: string;
    @Input() routes: RouteDefinition[];
    logout() {
        this.auth.logout();
        this.router.navigate(['Login']);
    }
    public routeMe(routeSelect){
        this.router.navigate([routeSelect.value]);
    }
    public validRoutes(){
        let ret = [];
        for(let route of this.routes){
            if(route.name.indexOf('List') > -1){
                ret.push(route);
            }
        }
        return ret;
    };
}
