import {Component} from 'angular2/core';
import {RouterOutlet, RouteConfig, RouteDefinition} from 'angular2/router';
import {APP_ROUTES} from "../app.routes";
import {NavbarComponent} from "./navbar/navbar.component";
import {LoggerService} from "../services/logger/logger.service";
import {SecuredView} from "../directives/secured.view";


@Component({
    selector: 'main-app',
    templateUrl: 'app/components/app.html',
    directives: [RouterOutlet, NavbarComponent]
})
@RouteConfig(APP_ROUTES)
export class AppComponent {
    public appRoutes: RouteDefinition[];
    private logger: LoggerService;

    constructor(logger: LoggerService) {
        this.logger = logger;
        this.appRoutes = APP_ROUTES;
    }
}
