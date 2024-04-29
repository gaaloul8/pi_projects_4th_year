import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
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
import {GooglemapComponent} from "./components/googlemap/googlemap.component";

import { EventBackComponent } from './components/event-back/event-back.component';
import { EventfrontComponent } from './components/eventfront/eventfront.component';
import { ForumBackComponent } from './components/forum-back/forum-back.component';
import { ForumStatsComponent } from './components/forum-stats/forum-stats.component';
import { FrontofficeComponent } from './frontoffice/frontoffice.component';



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
                    { path: 'forumstat',component:ForumStatsComponent}
                        ],

            },
            {path:'main', component:FrontofficeComponent , loadChildren: ()=> import('./frontoffice/frontoffice.module').then(m=>m.FrontofficeModule)},
            { path: 'question/:id', component: QuestionDetailComponent },
            { path: 'notfound', component: NotfoundComponent },


        ]
    },
            { path: '**', redirectTo: 'notfound' },

        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
