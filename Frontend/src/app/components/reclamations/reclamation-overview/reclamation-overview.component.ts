import { Component } from '@angular/core';
import {ReclamationService} from "../../../services/reclamation/reclamation.serice";
import {ChartModule} from "primeng/chart";

@Component({
  selector: 'app-reclamation-overview',
  standalone: true,
    imports: [
        ChartModule
    ],
  templateUrl: './reclamation-overview.component.html',
  styleUrl: './reclamation-overview.component.scss'
})
export class ReclamationOverviewComponent {


    data: any;
    options: any;

    constructor(private reclamationService: ReclamationService) {}

    ngOnInit() {
        this.loadStatistics();
    }


    loadStatistics() {
        this.reclamationService.getReclamationsStatistics().subscribe(stats => {
            console.log(stats);
            // Create an array of unique months from all the statuses
            const months = new Set<string>();
            Object.values(stats).forEach(status => {
                Object.keys(status).forEach(month => months.add(month));
            });
            console.log(months);
            const sortedMonths = Array.from(months).sort();
            console.log(sortedMonths);
            // Prepare datasets
            const datasets = [
                {
                    label: 'In Progress',
                    data: sortedMonths.map(month => stats.IN_PROGRESS?.[month] || 0),
                    fill: false,
                    borderColor: '#ffce56'
                },
                {
                    label: 'Resolved',
                    data: sortedMonths.map(month => stats.RESOLVED?.[month] || 0),
                    fill: false,
                    borderColor: '#36a2eb'
                },
                {
                    label: 'Submitted',
                    data: sortedMonths.map(month => stats.SUBMITTED?.[month] || 0),
                    fill: false,
                    borderColor: '#ff6384'
                }
            ];

            // Update chart data
            this.data = { labels: sortedMonths, datasets };
            this.options = this.getChartOptions();
        });
    }

    getChartOptions() {
        return {
            aspectRatio: 1, // This value is inversely proportional to height. A smaller number will result in a taller chart.
            maintainAspectRatio: false, // This can be set to false if you want to set explicit width and height
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        parser: 'YYYY-MM',
                        tooltipFormat: 'll'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Count'
                    }
                }]
            },
            legend: {
                position: 'top',
            },
            responsive: true,
        };
    }
    /*

    ngOnInit(): void {
        this.reclamationService.getReclamationsStatistics().subscribe(stats => {
            this.data = {
                labels: ['Submitted', 'In Progress', 'Resolved'],
                datasets: [
                    {
                        label: 'Reclamation Status',
                        data: [stats.submitted, stats.inProgress, stats.resolved],
                        fill: false,
                        borderColor: '#42A5F5'
                    }
                ]
            };

            this.options = {
                title: {
                    display: true,
                    text: 'Reclamations Overview',
                    fontSize: 16
                },
                legend: {
                    position: 'bottom'
                }
            };
        });
    } */
}
