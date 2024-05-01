import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Subscription, debounceTime } from 'rxjs';
import { ChartsDemoRoutingModule } from 'src/app/demo/components/uikit/charts/chartsdemo-routing.module';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Forum, ForumService, ForumStatus, Question , Response} from 'src/app/services/forum.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { ResponsesService } from 'src/app/services/responses.service';

@Component({
  selector: 'app-forum-stats',
  standalone: true,
  imports: [
    CommonModule,
		ChartsDemoRoutingModule,
		ChartModule
  ],
  templateUrl: './forum-stats.component.html',
  styleUrl: './forum-stats.component.scss'
})
export class ForumStatsComponent {
  subscription: Subscription;

  lineData: any;
  ques:Question;

  barData: any = {
    datasets: []
  };
  
  pieData: any;

  polarData: any;

  radarData: any;

  lineOptions: any;

  barOptions: any;

  pieOptions: any;

  polarOptions: any;

  radarOptions: any;
  forums: Forum[];
  questions: Question[];
  responses: Response[];
  forumslength:number;
  questionslength:number;
  responseslength:number;
  forumsData: Object[];
  forumsDataBestAnswer: Object[];
  constructor(private layoutService: LayoutService , private forumService: ForumService , private questionService: QuestionsService
    , private responseService: ResponsesService) {
    this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initCharts();
        });
}
ngOnInit() {
  //this.initCharts();
  this.fetchForums();
  this.fetchQuestions();
  this.fetchResponses();
  this.getForumsWithQuestionsAndResponses();
  this.getForumsWithBestAnswers();
}
fetchForums(): void {
  this.forumService.getAllForums().subscribe(
    (forums: Forum[]) => {
      this.forums = forums;
      this.forumslength = forums.length;
      this.updatePieData();
      
    },
    (error) => {
      console.log('Error fetching forums:', error);
    }
  );
}
fetchQuestions(): void {
  this.questionService.getAllQuestions().subscribe(
    (questions: Question[]) => {
      this.questions = questions;
      this.updatePieData();
    },
    (error) => {
      console.log('Error fetching question:', error);
    }
  );
}

fetchResponses(): void {
  this.responseService.getAllResponses().subscribe(
    (responses: Response[]) => {
      this.responses = responses;
      this.updatePieData();
    },
    (error) => {
      console.log('Error fetching response:', error);
    }
  );
}

updatePieData() {
  const documentStyle = getComputedStyle(document.documentElement);
  if (this.forums && this.questions && this.responses) {
    this.pieData = {
      labels: ['Forums', 'Questions', 'Responses'],
      datasets: [
        {
          data: [this.forums.length, this.questions.length, this.responses.length],
          backgroundColor: [
            documentStyle.getPropertyValue('--indigo-500'),
            documentStyle.getPropertyValue('--purple-500'),
            documentStyle.getPropertyValue('--teal-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--indigo-400'),
            documentStyle.getPropertyValue('--purple-400'),
            documentStyle.getPropertyValue('--teal-400')
          ]
        }]
    };
  }
}
getForumsWithQuestionsAndResponses(): void {
  this.forumService.getForumsWithQuestionsAndResponses()
    .subscribe(data => {
      this.forumsData = data;
      this.createBarChart();
    });
}
getForumsWithBestAnswers(): void {
  this.forumService.getForumsWithBestAnswers()
    .subscribe(data => {
      this.forumsDataBestAnswer = data;
    });
}
createBarChart(): void {
  const labels = this.forumsData.map(item => item[0]);
  const questionCounts = this.forumsData.map(item => item[1]);
  const responseCounts = this.forumsData.map(item => item[2]);

  const documentStyle = getComputedStyle(document.documentElement);
  const primaryColor500 = documentStyle.getPropertyValue('--primary-500');
  const primaryColor200 = documentStyle.getPropertyValue('--primary-200');

  const questionDataset = {
    label: 'Question',
    backgroundColor: primaryColor500,
    borderColor: primaryColor500,
    data: questionCounts
  };

  const responseDataset = {
    label: 'Response',
    backgroundColor: primaryColor200,
    borderColor: primaryColor200,
    data: responseCounts
  };

  const datasets = [questionDataset, responseDataset];

  this.barData = {
    labels: labels,
    datasets: datasets
  };
}



initCharts() {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
  
  this.barData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'My First dataset',
              backgroundColor: documentStyle.getPropertyValue('--primary-500'),
              borderColor: documentStyle.getPropertyValue('--primary-500'),
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'My Second dataset',
              backgroundColor: documentStyle.getPropertyValue('--primary-200'),
              borderColor: documentStyle.getPropertyValue('--primary-200'),
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  };

  this.barOptions = {
      plugins: {
          legend: {
              labels: {
                  fontColor: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary,
                  font: {
                      weight: 500
                  }
              },
              grid: {
                  display: false,
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
      }
  };
  this.pieOptions = {
      plugins: {
          legend: {
              labels: {
                  usePointStyle: true,
                  color: textColor
              }
          }
      }
  };

  this.lineData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              backgroundColor: documentStyle.getPropertyValue('--primary-500'),
              borderColor: documentStyle.getPropertyValue('--primary-500'),
              tension: .4
          },
          {
              label: 'Second Dataset',
              data: [28, 48, 40, 19, 86, 27, 90],
              fill: false,
              backgroundColor: documentStyle.getPropertyValue('--primary-200'),
              borderColor: documentStyle.getPropertyValue('--primary-200'),
              tension: .4
          }
      ]
  };

  this.lineOptions = {
      plugins: {
          legend: {
              labels: {
                  fontColor: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
      }
  };

  this.polarData = {
      datasets: [{
          data: [
              11,
              16,
              7,
              3
          ],
          backgroundColor: [
              documentStyle.getPropertyValue('--indigo-500'),
              documentStyle.getPropertyValue('--purple-500'),
              documentStyle.getPropertyValue('--teal-500'),
              documentStyle.getPropertyValue('--orange-500')
          ],
          label: 'My dataset'
      }],
      labels: [
          'Indigo',
          'Purple',
          'Teal',
          'Orange'
      ]
  };

  this.polarOptions = {
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          r: {
              grid: {
                  color: surfaceBorder
              }
          }
      }
  };

  this.radarData = {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [
          {
              label: 'My First dataset',
              borderColor: documentStyle.getPropertyValue('--indigo-400'),
              pointBackgroundColor: documentStyle.getPropertyValue('--indigo-400'),
              pointBorderColor: documentStyle.getPropertyValue('--indigo-400'),
              pointHoverBackgroundColor: textColor,
              pointHoverBorderColor: documentStyle.getPropertyValue('--indigo-400'),
              data: [65, 59, 90, 81, 56, 55, 40]
          },
          {
              label: 'My Second dataset',
              borderColor: documentStyle.getPropertyValue('--purple-400'),
              pointBackgroundColor: documentStyle.getPropertyValue('--purple-400'),
              pointBorderColor: documentStyle.getPropertyValue('--purple-400'),
              pointHoverBackgroundColor: textColor,
              pointHoverBorderColor: documentStyle.getPropertyValue('--purple-400'),
              data: [28, 48, 40, 19, 96, 27, 100]
          }
      ]
  };

  this.radarOptions = {
      plugins: {
          legend: {
              labels: {
                  fontColor: textColor
              }
          }
      },
      scales: {
          r: {
              grid: {
                  color: textColorSecondary
              }
          }
      }
  };
}

ngOnDestroy() {
  if (this.subscription) {
      this.subscription.unsubscribe();
  }
}

}
