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

import {QuizComponent} from "./components/quiz/quiz.component";
import {QuestionQuizComponent} from "./components/question-quiz/question-quiz.component";
import {QuizFrontendComponent} from "./components/quiz-frontend/quiz-frontend.component";
import {GooglemapComponent} from "./components/googlemap/googlemap.component";

import { EventBackComponent } from './components/event-back/event-back.component';
import { EventfrontComponent } from './components/eventfront/eventfront.component';
import {ActivitiesComponent} from "./components/activities-back/activities.component";
import {QuizChartComponent} from "./components/quiz-chart/quiz-chart.component";



@NgModule({
    imports: [
        BrowserModule ,
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'forum',component:ForumComponent},
            { path: 'notfound', component: NotfoundComponent },
            { path: 'reward', component: RewardComponent },
            { path: 'statistics', component: StatisticsComponent },

            { path: 'discounts', component: DiscountsComponent },
            { path: 'transactions', component: TransactionhistoryComponent },
            { path: 'rewardusers', component: RewardusersComponent },

            { path: 'quiz', component: QuizComponent},
            { path: 'quiz-chart', component: QuizChartComponent},
            { path: 'activities-back', component: ActivitiesComponent},
            { path: 'question-quiz', component: QuestionQuizComponent},
            { path: 'quiz-frontend', component: QuizFrontendComponent},
            { path: 'googlemap', component: GooglemapComponent},
            { path: 'question-quiz/:idQuiz', component: QuestionQuizComponent },
            { path: 'activities-back/:idQuiz', component: ActivitiesComponent },

            { path: 'discounts', component: DiscountsComponent },
            { path: 'transactions', component: TransactionhistoryComponent },
            { path: 'statistics', component: StatisticsComponent },
            { path: 'rewardusers', component: RewardusersComponent },

            {path:'eventBack',component : EventBackComponent },
            {path:'eventFront',component : EventfrontComponent},


            { path: '**', redirectTo: '/notfound' },

        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
