import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    isQuestionsPage: boolean;
    constructor(private primengConfig: PrimeNGConfig,private router: Router) {
        this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          // Define an array of paths you want to check against
          const pathsToCheck = ['/question/']; // Add more paths as needed
          this.isQuestionsPage = pathsToCheck.some(path => event.url.includes(path));
        });
     }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
