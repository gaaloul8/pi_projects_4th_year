import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js'; // Import Chart from 'chart.js'

import { ClubService } from 'src/app/services/club.service';

@Component({
  selector: 'app-club-stat',
  standalone: true,
  imports: [],
  templateUrl: './club-stat.component.html',
  styleUrl: './club-stat.component.scss'
})
export class ClubStatComponent implements OnInit {
  constructor(private clubService: ClubService) { }
  clubStatistics: Map<string, number>;

  ngOnInit() {
      this.getClubStatistics();
  }

  getClubStatistics(): void {
      this.clubService.getClubTagStatistics().subscribe(
          statistics => {
              this.clubStatistics = statistics;
              this.renderClubChart();
          },
          error => {
              console.error('Error fetching club statistics:', error);
          }
      );
  }

  renderClubChart(): void {
      const canvas = <HTMLCanvasElement>document.getElementById('clubChartCanvas');
      const ctx = canvas.getContext('2d');

      new Chart(ctx, {
        type: 'pie', // Use 'pie' for a circular chart
        data: {
            labels: Object.keys(this.clubStatistics),
            datasets: [{
                label: 'Number of Clubs',
                data: Object.values(this.clubStatistics),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(255, 206, 86, 0.5)',
                  'rgba(75, 192, 192, 0.5)',
                  'rgba(153, 102, 255, 0.5)',
                  'rgba(255, 159, 64, 0.5)',
                  'rgba(120, 120, 120, 0.5)',
                  'rgba(200, 100, 200, 0.5)',
                  'rgba(50, 150, 50, 0.5)',
                  'rgba(255, 0, 0, 0.5)',
                  'rgba(0, 0, 255, 0.5)',
                  'rgba(255, 255, 0, 0.5)',
                  'rgba(0, 255, 255, 0.5)',
                  'rgba(255, 0, 255, 0.5)',
                  'rgba(128, 128, 0, 0.5)'
                    // Add more colors if needed
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(120, 120, 120, 1)',
                  'rgba(200, 100, 200, 1)',
                  'rgba(50, 150, 50, 1)',
                  'rgba(255, 0, 0, 1)',
                  'rgba(0, 0, 255, 1)',
                  'rgba(255, 255, 0, 1)',
                  'rgba(0, 255, 255, 1)',
                  'rgba(255, 0, 255, 1)',
                  'rgba(128, 128, 0, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
    });
    
  }
}
