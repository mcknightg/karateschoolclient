import {provide} from "angular2/core";
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AuthService} from "./services/auth/auth.service";
import {ROUTER_PROVIDERS} from 'angular2/router';
import {AppComponent} from "./components/app.component";
import {LoggerService} from "./services/logger/logger.service";
import {BrowserXhr} from "angular2/http";
import {Injectable} from "angular2/core";
import {AppConfig} from "./app.config";
import {MODEL_PROVIDERS} from "./support/model.providers";

@Injectable()
class CORSBrowserXHR extends BrowserXhr {
    build(): any {
        let xhr: any = super.build();
        xhr.withCredentials = true;
        return xhr;
    }
}

bootstrap(AppComponent, [
    AuthService,
    LoggerService,
    MODEL_PROVIDERS,
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(BrowserXhr, {useClass: CORSBrowserXHR}),
    provide(AppConfig , {useClass: AppConfig})

]).catch(err => console.error(err));
