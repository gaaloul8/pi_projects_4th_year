import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-chart-event',
  templateUrl: './chart-event.component.html',
  styleUrls: ['./chart-event.component.scss']
})
export class ChartEventComponent implements OnInit {

  feedbackStatistics: any;
  barData: any;
  barOptions: any;
  lineOptions: any;
  pieOptions: any;
  polarOptions: any;
  pieData: any;

  constructor(private eventService: EventService, private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.getEventFeedbackStatistics();
    this.getFeedbackStatistics();
  }

  getEventFeedbackStatistics(): void {
    this.eventService.getEventFeedbackStatistics().subscribe(
      (data: any[]) => {
        this.feedbackStatistics = data.map(item => ({ eventName: item[0], feedbackCount: item[1] }));
        this.initChart();
      },
      (error) => {
        console.error('Error fetching event feedback statistics:', error);
      }
    );
  }

  getFeedbackStatistics(): void {
    this.feedbackService.getFeedbackStatistics().subscribe(
      (data: any) => {
        this.feedbackStatistics = data;
        this.initChartFeedback();
      },
      (error) => {
        console.error('Error fetching feedback statistics:', error);
      }
    );
  }

  initChartFeedback(){
    const positiveCount = this.feedbackStatistics.Positive || 0;
    const negativeCount = this.feedbackStatistics.Negative || 0;
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      // Pie Chart Data
      this.pieData = {
        labels: ['Positive', 'Negative'],
        datasets: [
          {
            data: [positiveCount, negativeCount],
            backgroundColor: ['#36a2eb', '#ff6384'],
            hoverBackgroundColor: ['#36a2eb', '#ff6384']
          }
        ]
      };

      // Pie Chart Options
      this.pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom'
        }
      };

  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barData = {
      labels: this.feedbackStatistics.map(item => item.eventName),
      datasets: [
        {
          label: 'Nombre de feedbacks',
          data: this.feedbackStatistics.map(item => item.feedbackCount),
          backgroundColor: documentStyle.getPropertyValue('--primary-500'),
          borderColor: documentStyle.getPropertyValue('--primary-500'),
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
      barThickness: 20,
      categoryPercentage: 0.8,
      maxBarThickness: 25,
      scales: {
        y: {
          ticks: {
            stepSize: 5,
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };


  }
}
