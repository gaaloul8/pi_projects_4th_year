import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontofficeComponent } from './frontoffice.component';
import { ForumComponent } from '../components/forum/forum.component';
import { HomeComponent } from '../components/home/home.component';
import { QuestionDetailComponent } from '../components/question-detail/question-detail.component';
import { ForumDetailComponent } from '../components/forum-detail/forum-detail.component';
import { DiscountsComponent } from '../components/discounts/discounts.component';
import { EventBackComponent } from '../components/event-back/event-back.component';
import { EventfrontComponent } from '../components/eventfront/eventfront.component';

import { QuestionQuizComponent } from '../components/question-quiz/question-quiz.component';
import { QuizFrontendComponent } from '../components/quiz-frontend/quiz-frontend.component';
import { QuizComponent } from '../components/quiz/quiz.component';
import { RewardComponent } from '../components/reward/reward.component';
import { RewardusersComponent } from '../components/rewardusers/rewardusers.component';
import { StatisticsComponent } from '../components/statistics/statistics.component';
import { TransactionhistoryComponent } from '../components/transactionhistory/transactionhistory.component';
import { NotfoundComponent } from '../demo/components/notfound/notfound.component';
import { FrontClubComponent } from '../components/front-club/front-club.component';
import {ScrapingDataComponent} from "../components/scraping-data/scraping-data.component";
import {ActivityFrontendComponent} from "../components/activity-frontend/activity-frontend.component";

const routes: Routes = [

{ path: 'forum',component:ForumComponent},
{ path: 'home',component:HomeComponent},
{ path: 'forumdetail/:id', component: ForumDetailComponent },
{ path: 'notfound', component: NotfoundComponent },
{ path: 'reward', component: RewardComponent },

{ path: 'transactions', component: TransactionhistoryComponent },
{ path: 'rewardusers', component: RewardusersComponent },

{ path: 'discounts', component: DiscountsComponent },
{ path: 'quiz-frontend', component: QuizFrontendComponent},
{ path: 'eventFront', component : EventfrontComponent},
{ path: 'front-club', component: FrontClubComponent },
    { path: 'quiz-frontend', component: QuizFrontendComponent},
    { path: 'docteur-frontend', component: ScrapingDataComponent},

    { path: 'activity-frontend/:idQuiz', component: ActivityFrontendComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
