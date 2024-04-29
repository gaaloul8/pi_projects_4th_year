import { NgModule } from '@angular/core';

import { DatePipe,CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
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
import { DiscountService } from "./services/discount.service";
import { ForumDetailComponent } from './components/forum-detail/forum-detail.component';
import { LandingHomeComponent } from './components/landing-home/landing-home.component';
import { HomeComponent } from './components/home/home.component';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';
import {RegisterComponent} from "./components/register/register.component";
import {CompleteprofileComponent} from "./components/completeprofile/completeprofile.component";
import {TakeimageComponent} from "./components/takeimage/takeimage.component";
import { CardModule } from 'primeng/card';
import {HttpClient} from "@angular/common/http";
import {WebcamModule} from "ngx-webcam";

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuizService } from "./services/quiz/quiz.service";
import { HttpClientModule } from '@angular/common/http';
import { EventBackComponent } from '../app/components/event-back/event-back.component';
import { EventService } from './services/event.service';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { DataViewModule } from 'primeng/dataview';
import { EventfrontComponent } from './components/eventfront/eventfront.component';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { MediaDemoRoutingModule } from './demo/components/uikit/media/mediademo-routing.module';
import { PickList } from 'primeng/picklist';
import { ListReservationEventComponent } from './components/list-reservation-event/list-reservation-event.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { StarRatingModule } from 'angular-star-rating';
import { FilterPipe } from './filter.pipe';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChartModule } from 'primeng/chart';
import { ChartEventComponent } from './components/chart-event/chart-event.component';
import { ListfeedbackClubManagerComponent } from './components/listfeedback-club-manager/listfeedback-club-manager.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PostFrontComponent } from './components/post-front/post-front.component';



@NgModule({
    declarations: [AppComponent, FeedbackComponent,ChartEventComponent,NotfoundComponent , ListfeedbackClubManagerComponent,ListReservationEventComponent,ForumComponent,ForumDetailComponent ,
    LandingHomeComponent ,SidebarComponent, HomeComponent ,EventBackComponent , EventfrontComponent,PostFrontComponent,QuestionDetailComponent,
    ClubsComponent,PostComponent],
    imports: [AppRoutingModule,
         AppLayoutModule,
         ReactiveFormsModule, 
         FormsModule,
          BrowserModule,
          ToolbarModule,
          ChartModule,
          MultiSelectModule,
          FilterPipe,
          StarRatingModule,
          AppLayoutModule , 
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
        ReactiveFormsModule,
        DataViewModule,
        CarouselModule,
        CommonModule,
		MediaDemoRoutingModule,
		ButtonModule,
		ImageModule,
		GalleriaModule,
        DataViewModule,
        WebcamModule,
        DialogModule,
        RegisterComponent,
        CompleteprofileComponent,
        TakeimageComponent,
        CardModule
        ],
        providers: [
            { provide: LocationStrategy, useClass: PathLocationStrategy },
            CountryService, CustomerService, IconService, NodeService,
            PhotoService, ProductService,RewardService,DiscountService,EventService, MessageService,DatePipe,HttpClient,QuizService
        ],
        bootstrap: [AppComponent]
    })



export class AppModule {}
