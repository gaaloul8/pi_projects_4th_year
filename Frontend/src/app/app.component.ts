import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import * as events from "events";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    isUserPage:boolean;
    constructor(private primengConfig: PrimeNGConfig , private router:Router) {
        this.router.events.pipe(
            filter(events=> events instanceof NavigationEnd)
        ).subscribe((events: NavigationEnd) =>{
            this.isUserPage = events.url.includes('/users');
        });}

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
