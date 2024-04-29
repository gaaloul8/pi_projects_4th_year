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
import { GooglemapComponent } from '../components/googlemap/googlemap.component';
import { QuestionQuizComponent } from '../components/question-quiz/question-quiz.component';
import { QuizFrontendComponent } from '../components/quiz-frontend/quiz-frontend.component';
import { QuizComponent } from '../components/quiz/quiz.component';
import { RewardComponent } from '../components/reward/reward.component';
import { RewardusersComponent } from '../components/rewardusers/rewardusers.component';
import { StatisticsComponent } from '../components/statistics/statistics.component';
import { TransactionhistoryComponent } from '../components/transactionhistory/transactionhistory.component';
import { NotfoundComponent } from '../demo/components/notfound/notfound.component';
import { FrontClubComponent } from '../components/front-club/front-club.component';

const routes: Routes = [

{ path: 'forum',component:ForumComponent},
{ path: 'home',component:HomeComponent},
{ path: 'forumdetail/:id', component: ForumDetailComponent },
{ path: 'notfound', component: NotfoundComponent },
{ path: 'reward', component: RewardComponent },
{ path: 'statistics', component: StatisticsComponent },
{ path: 'transactions', component: TransactionhistoryComponent },
{ path: 'rewardusers', component: RewardusersComponent },
{ path: 'quiz', component: QuizComponent},
{ path: 'question-quiz', component: QuestionQuizComponent},
{ path: 'googlemap', component: GooglemapComponent},
{ path: 'question-quiz/:idQuiz', component: QuestionQuizComponent },
{ path: 'discounts', component: DiscountsComponent },
{ path: 'quiz-frontend', component: QuizFrontendComponent},
{ path: 'eventFront', component : EventfrontComponent},
{ path: 'front-club', component: FrontClubComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
