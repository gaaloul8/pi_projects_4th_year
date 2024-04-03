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
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
