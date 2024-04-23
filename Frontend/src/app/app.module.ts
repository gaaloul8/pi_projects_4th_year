import { NgModule } from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {ToastModule} from "primeng/toast";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {InputTextModule} from "primeng/inputtext";
import {WebcamModule} from "ngx-webcam";
import {NgxOpenCVModule} from "ngx-opencv";
import { OpenCVConfig } from 'ngx-opencv';
import {DialogModule} from "primeng/dialog";
import {RegisterComponent} from "./components/register/register.component";
import {CompleteprofileComponent} from "./components/completeprofile/completeprofile.component";
import {TakeimageComponent} from "./components/takeimage/takeimage.component";

@NgModule({
    declarations: [AppComponent,NotfoundComponent],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule,
        FormsModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        ToastModule,
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        ReactiveFormsModule,
        WebcamModule,
        DialogModule,
        RegisterComponent,
        CompleteprofileComponent,
        TakeimageComponent,


    ],

    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,HttpClient
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
