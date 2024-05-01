import { RouterModule } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { ClubsComponent } from './components/clubs/clubs.component';
import { PostComponent } from './components/post/post.component';
import {RewardComponent} from "./components/reward/reward.component";
import { ForumComponent } from './components/forum/forum.component';
import { BrowserModule } from '@angular/platform-browser';
import {DiscountsComponent} from "./components/discounts/discounts.component";
import {TransactionhistoryComponent} from "./components/transactionhistory/transactionhistory.component";
import {RewardusersComponent} from "./components/rewardusers/rewardusers.component";
import {StatisticsComponent} from "./components/statistics/statistics.component";
import { ForumDetailComponent } from './components/forum-detail/forum-detail.component';
import { QuestionDetailComponent } from './components/question-detail/question-detail.component';
import { HomeComponent } from './components/home/home.component';
import { LandingHomeComponent } from './components/landing-home/landing-home.component';


import {QuizComponent} from "./components/quiz/quiz.component";
import {QuestionQuizComponent} from "./components/question-quiz/question-quiz.component";
import {QuizFrontendComponent} from "./components/quiz-frontend/quiz-frontend.component";

import { EventBackComponent } from './components/event-back/event-back.component';
import { EventfrontComponent } from './components/eventfront/eventfront.component';
import { ForumBackComponent } from './components/forum-back/forum-back.component';
import { ForumStatsComponent } from './components/forum-stats/forum-stats.component';
import { FrontofficeComponent } from './frontoffice/frontoffice.component';
import { ListReservationEventComponent } from './components/list-reservation-event/list-reservation-event.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ChartEventComponent } from './components/chart-event/chart-event.component';
import { ListfeedbackClubManagerComponent } from './components/listfeedback-club-manager/listfeedback-club-manager.component';

import {ActivitiesComponent} from "./components/activities-back/activities.component";
import {QuizChartComponent} from "./components/quiz-chart/quiz-chart.component";

import {TransactionstatComponent} from "./components/transactionstat/transactionstat.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { ForgetComponent } from "./components/forget/forget.component";
import { ResetComponent } from "./components/reset/reset.component";
import {CompleteprofileComponent} from "./components/completeprofile/completeprofile.component";
import {TakeimageComponent} from "./components/takeimage/takeimage.component";
import {RegisterWithCardComponent} from "./components/register-with-card/register-with-card.component";
import {UserBackComponent} from "./components/user-back/user-back.component";

import { PageEventComponent } from './components/page-event/page-event.component';
import { ListReservationFrontComponent } from './components/list-reservation-front/list-reservation-front.component';

import {Registercard2Component} from "./components/registercard2/registercard2.component";
import {AccountlockedComponent} from "./components/accountlocked/accountlocked.component";
import {DropdownUserComponent} from "./components/dropdown-user/dropdown-user.component";
import {UpdateUserAccountComponent} from "./components/update-user-account/update-user-account.component";

import {ActivityFrontendComponent} from "./components/activity-frontend/activity-frontend.component";
import {ScrapingDataComponent} from "./components/scraping-data/scraping-data.component";

import { PostFrontComponent } from './components/post-front/post-front.component';
import { PostStatComponent } from './components/post-stat/post-stat.component';
import { ClubStatComponent } from './components/club-stat/club-stat.component';
import { FrontClubComponent } from './components/front-club/front-club.component';






@NgModule({
    imports: [
        BrowserModule ,
        RouterModule.forRoot([
            {
                path: '',
                children: [
                    {
                        path: '',
                        component: AppLayoutComponent,
                        children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'forumback',component:ForumBackComponent},
                    { path: 'forumstat',component:ForumStatsComponent},
                    {path:'stattransaction',component : TransactionstatComponent},
                    { path: 'statistics', component: StatisticsComponent },
                    { path: 'reward', component: RewardComponent },
                    { path: 'discounts', component: DiscountsComponent },
                    { path: 'transactions', component: TransactionhistoryComponent },
                    {path:'stat-club',component:ClubStatComponent},
                    {path:'stat-post',component:PostStatComponent},
                    {path:'eventBack',component : EventBackComponent },
                    {path:'listReservationEvent',component : ListReservationEventComponent},
                    {path: 'staticEventByFeedback' , component:ChartEventComponent},
                    {path: 'listFeedBackClubManager' , component:ListfeedbackClubManagerComponent},
                    {path:'club',component:ClubsComponent},
                    {path:'post',component:PostComponent},
                    {path:'users',component:UserBackComponent},
                            { path: 'quiz', component: QuizComponent},
                            { path: 'question-quiz', component: QuestionQuizComponent},

                            { path: 'question-quiz/:idQuiz', component: QuestionQuizComponent },
                    { path: 'quiz-back', component: QuizComponent},
                    { path: 'quiz-chart', component: QuizChartComponent},
                    { path: 'activities-back', component: ActivitiesComponent},
                    { path: 'question-quiz', component: QuestionQuizComponent},
                    { path: 'question-quiz/:idQuiz', component: QuestionQuizComponent },
                    { path: 'activities-back/:idQuiz', component: ActivitiesComponent },

                    { path: 'activities-back/:idQuiz', component: ActivitiesComponent },
                    { path: 'activities-back', component: ActivitiesComponent},
                    { path: 'quiz-chart', component: QuizChartComponent},
                            { path: 'discounts', component: DiscountsComponent },
                            { path: 'transactions', component: TransactionhistoryComponent },
                            { path: 'statistics', component: StatisticsComponent },
                            { path: 'rewardusers', component: RewardusersComponent },

                ],
            },
            {path:'main', component:FrontofficeComponent , loadChildren: ()=> import('./frontoffice/frontoffice.module').then(m=>m.FrontofficeModule)},
                    { path: 'auth/reset-password/:resetToken', component: ResetComponent },

                    { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },

             {path:'welcome', component: WelcomeComponent},
            { path: 'register', component: RegisterComponent },
            {path:'complete', component: CompleteprofileComponent},
            {path:'accountLocked', component: AccountlockedComponent},
            {path:'profile', component: DropdownUserComponent},
            {path:'registerWithcard',component:RegisterWithCardComponent},
            {path:'takeimage',component:TakeimageComponent},
            {path:'Registerwitcard2',component:Registercard2Component},
            {path:'profile/update',component: UpdateUserAccountComponent},

            { path: 'login', component: LoginComponent },
            { path: 'forget', component: ForgetComponent },
            { path: 'question/:id', component: QuestionDetailComponent },
            { path: 'notfound', component: NotfoundComponent },
          













        ]
    },
            { path: '**', redirectTo: '/notfound' },

        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
