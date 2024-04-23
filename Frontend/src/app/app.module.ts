import { NgModule } from '@angular/core';

import { CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import {HttpClient} from "@angular/common/http";
import {WebcamModule} from "ngx-webcam";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClubsComponent } from './components/clubs/clubs.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { PostComponent } from './components/post/post.component';
import { ForumComponent } from '../app/components/forum/forum.component';
import { FileUploadModule } from 'primeng/fileupload';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RewardService } from "./services/reward.service";
import { RewardusersComponent } from "./components/rewardusers/rewardusers.component";
import { RewardComponent } from "./components/reward/reward.component";
import { QuizService } from "./services/quiz/quiz.service";
import { HttpClientModule } from '@angular/common/http';
import { EventBackComponent } from '../app/components/event-back/event-back.component';
import { EventService } from './services/event.service';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { DataViewModule } from 'primeng/dataview';
import { EventfrontComponent } from './components/eventfront/eventfront.component';
import { DiscountService } from "./services/discount.service";
import { ForumDetailComponent } from './components/forum-detail/forum-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingHomeComponent } from './components/landing-home/landing-home.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import {RegisterComponent} from "./components/register/register.component";
import {CompleteprofileComponent} from "./components/completeprofile/completeprofile.component";
import {TakeimageComponent} from "./components/takeimage/takeimage.component";


@NgModule({
    declarations: [AppComponent, NotfoundComponent , ForumComponent,ForumDetailComponent ,
    LandingHomeComponent , FooterComponent,HeaderComponent, HomeComponent ,EventBackComponent , EventfrontComponent,
    ClubsComponent,PostComponent],
    imports: [AppRoutingModule, AppLayoutModule, ReactiveFormsModule, FormsModule, BrowserModule,CommonModule,TableModule,ToolbarModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        InputTextareaModule,
        InputNumberModule,
        AppLayoutModule ,
        DialogModule ,
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
        BrowserModule,
        DialogModule,
        ToolbarModule,
        TableModule,
        HttpClientModule,
        CommonModule,
        BrowserModule,
        CalendarModule,
        DataViewModule,
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
        , ProductService,RewardService,DiscountService,QuizService,
        MessageService,],
    bootstrap: [AppComponent]
})
export class AppModule {}
