import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { RewardService } from "../../services/reward.service";

@Component({
    selector: 'app-transactionstat',
    templateUrl: './transactionstat.component.html',
    styleUrls: ['./transactionstat.component.scss']
})
export class TransactionstatComponent implements OnInit {
    monthlyCounts: any;
    barChartLabels: string[] = [];
    barChartData: { data: number[], label: string }[] = [];
    barChartColors: string[] = [];
    barChartOptions: any; // Adjust the type according to your requirements
    chart: Chart;

    constructor(private rewardService: RewardService) { }

    ngOnInit() {
        this.rewardService.getMonthlyTransactionCounts().subscribe(
            data => {
                this.monthlyCounts = data;
                this.prepareChartData();
                this.renderChart();
            },
            error => {
                console.log('Error fetching monthly transaction counts:', error);
            }
        );
    }

    prepareChartData(): void {
        // Initialize an array to hold the counts for each month
        const counts: number[] = [];

        // Loop over each month (1 to 12) and get its count from the map
        for (let month = 1; month <= 12; month++) {
            // Check if the month exists in the map, if not set its count to 0
            if (this.monthlyCounts.hasOwnProperty(month)) {
                counts.push(this.monthlyCounts[month]);
            } else {
                counts.push(0);
            }
        }

        // Define your month names here if needed
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        this.barChartLabels = monthNames;
        this.barChartData = [{ data: counts, label: 'Transaction Count' }];

        // Define your bar chart colors here if needed
        this.barChartColors = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
        ];

        // Define your bar chart options here if needed
        this.barChartOptions = {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
    }



    renderChart(): void {
        const canvas = <HTMLCanvasElement>document.getElementById('transactionChart');
        const ctx = canvas.getContext('2d');

        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.barChartLabels,
                datasets: [{
                    label: 'Transaction Count',
                    data: this.barChartData[0].data,
                    backgroundColor: this.barChartColors,
                    borderColor: this.barChartColors,
                    borderWidth: 1
                }]
            },
            options: this.barChartOptions
        });
    }

    /*  getMonthName(month: number): string {
        // Define month names in the desired language
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        // Adjust month number (e.g., 1 for January) to match array index
        return monthNames[month - 1];
    }

   */
}
