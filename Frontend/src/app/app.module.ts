import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
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
import { ReactiveFormsModule } from '@angular/forms';
import {RewardService} from "./services/reward.service";
import {RewardusersComponent} from "./components/rewardusers/rewardusers.component";
import {DiscountService} from "./services/discounts/discounts.module";
import {RewardComponent} from "./components/reward/reward.component";
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
    declarations: [AppComponent, NotfoundComponent,],
    imports: [AppRoutingModule, AppLayoutModule,ReactiveFormsModule,BrowserModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,RewardService,DiscountService
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {RewardComponent} from "./components/reward/reward.component";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {CrudRoutingModule} from "./demo/components/pages/crud/crud-routing.module";
import {FileUploadModule} from "primeng/fileupload";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {RatingModule} from "primeng/rating";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DropdownModule} from "primeng/dropdown";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputNumberModule} from "primeng/inputnumber";
import {DialogModule} from "primeng/dialog";
import {DiscountsComponent} from "./components/discounts/discounts.component";
import {TransactionhistoryComponent} from "./components/transactionhistory/transactionhistory.component";
import {RewardusersComponent} from "./components/rewardusers/rewardusers.component";
import {StatisticsComponent} from "./components/statistics/statistics.component";


@NgModule({
    declarations: [AppComponent, NotfoundComponent,RewardComponent],
    imports: [AppRoutingModule, AppLayoutModule, BrowserModule, CommonModule, HttpClientModule, FormsModule, TableModule, CommonModule,
        CrudRoutingModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,HttpClient,RewardComponent,DiscountsComponent,TransactionhistoryComponent,RewardusersComponent,StatisticsComponent
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
