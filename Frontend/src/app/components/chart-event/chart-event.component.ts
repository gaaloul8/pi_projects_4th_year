import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-chart-event',
  templateUrl: './chart-event.component.html',
  styleUrl: './chart-event.component.scss'
})
export class ChartEventComponent implements OnInit{

  feedbackStatistics: any;
  barData: any;
  barOptions: any;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.getEventFeedbackStatistics();
  }

  getEventFeedbackStatistics(): void {
    this.eventService.getEventFeedbackStatistics().subscribe(
      (data: any[]) => {
        // Convertir les données reçues dans le format attendu par le graphique
        this.feedbackStatistics = data.map(item => ({ eventName: item[0], feedbackCount: item[1] }));
        // Une fois les données récupérées, initialisez et affichez le graphique
        this.initChart();
      },
      (error) => {
        console.error('Error fetching event feedback statistics:', error);
      }
    );
  }

initChart() {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.barData = {
          labels: this.feedbackStatistics.map(item => item.eventName), // Noms des événements sur l'axe X
        datasets: [
          {
            label: 'Nombre de feedbacks', // Label de l'ensemble de données
            data: this.feedbackStatistics.map(item => item.feedbackCount), // Nombre de feedbacks sur l'axe Y
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
      
            barThickness: 20, // Largeur des barres en pixels
            categoryPercentage: 0.8, // Pourcentage de largeur de chaque barre par rapport à l'espace disponible
            maxBarThickness: 25, // Largeur maximale des barres en pixels
            scales: {
                y: {
                  ticks: {
                    stepSize: 5 ,
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
            }
        }
    };
}


