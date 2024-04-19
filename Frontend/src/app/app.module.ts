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
import { ForumComponent } from '../app/components/forum/forum.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import {RewardService} from "./services/reward.service";
import {RewardusersComponent} from "./components/rewardusers/rewardusers.component";
import {DiscountService} from "./services/discounts/discounts.module";
import {RewardComponent} from "./components/reward/reward.component";
import { BrowserModule } from '@angular/platform-browser';
import { ForumDetailComponent } from './components/forum-detail/forum-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingHomeComponent } from './components/landing-home/landing-home.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
    declarations: [AppComponent, NotfoundComponent , ForumComponent , ForumDetailComponent , LandingHomeComponent , FooterComponent,HeaderComponent, HomeComponent] ,
    imports: [AppRoutingModule, 
        AppLayoutModule , 
        DialogModule ,
        CommonModule ,
        TableModule,
        FileUploadModule,
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
        FormsModule,
        ReactiveFormsModule,
        ReactiveFormsModule,
        BrowserModule
        ],
        providers: [
            { provide: LocationStrategy, useClass: PathLocationStrategy },
            CountryService, CustomerService, EventService, IconService, NodeService,
            PhotoService, ProductService,RewardService,DiscountService
        ],
        bootstrap: [AppComponent]
    })
export class AppModule {}
