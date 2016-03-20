import {Directive, OnDestroy} from 'angular2/core';
import {AuthService} from "../services/auth/auth.service";
import {ROUTER_DIRECTIVES, Router, Location} from "angular2/router";
import {ElementRef} from "angular2/core";


@Directive({
    selector: '[protected]'
})
export class SecuredView implements OnDestroy {
    private sub: any = null;
    private el: ElementRef;
    constructor( el: ElementRef, authService: AuthService, private router: Router, private location: Location) {
         this.el = el;

        if (!authService.isAuthenticated()) {
            this.location.replaceState('/'); // clears browser history so they can't navigate with back button
            this.router.navigate(['Login']);
            this.el.nativeElement.style.display = 'none';

        }else {
            this.el.nativeElement.style.display = 'block';
        }

        this.sub = authService.subscribe((val) => {
            console.log("Message Received Auth Service");
            console.log(val);
            if (!val.authenticated) {
                this.el.nativeElement.style.display = 'none';
                this.location.replaceState('/'); // clears browser history so they can't navigate with back button
                this.router.navigate(['Login']); // tells them they've been logged out (somehow)
            } else {
                this.el.nativeElement.style.display = 'block';
            }
        });
    }

    ngOnDestroy() {
        if (this.sub != null) {
            this.sub.unsubscribe();
        }
    }
}
