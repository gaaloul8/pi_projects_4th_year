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
                // Define an array of paths you want to check against
                const pathsToCheck = ['/quiz-back', '/quiz-chart','question-quiz','activities-back']; // Add more paths as needed
                // Check if the current URL contains any of the paths
                this.isQuizPage = pathsToCheck.some(path => event.url.includes(path));
            });
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
