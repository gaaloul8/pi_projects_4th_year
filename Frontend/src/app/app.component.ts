import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    isQuizPage: boolean;
    constructor(private primengConfig: PrimeNGConfig,private router: Router) {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.isQuizPage = event.url.includes('/quiz');
            });
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
