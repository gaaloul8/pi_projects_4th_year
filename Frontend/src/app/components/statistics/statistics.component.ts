import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { RewardService } from "../../services/reward.service";

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    standalone: true,
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
    totalUsers: number = 0;
    usersWithRewards: number = 0;
    usersWithNoRewards: number = 0;


    constructor(private rewardService: RewardService) { }

    ngOnInit() {
        this.getStatistics();
    }

    getStatistics(): void {
        this.rewardService.getStatistics().subscribe(
            statistics => {
                this.totalUsers = statistics.totalUsers;
                this.usersWithRewards = statistics.usersWithRewards;
                this.usersWithNoRewards=statistics.usersWithNoRewards
                this.renderPieChart();
                this.renderPieChart1();
            },
            error => {
                console.error('Error fetching statistics:', error);
            }
        );
    }

    renderPieChart(): void {
        const canvas = <HTMLCanvasElement>document.getElementById('myChart');
        const ctx = canvas.getContext('2d');

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Total Users', 'Users with Rewards'],
                datasets: [{
                    data: [this.totalUsers, this.usersWithRewards],
                    backgroundColor: [
                        'rgba(255, 99, 132)',
                        'rgba(54, 162, 235)'
                    ],
                    hoverOffset: 4
                }]
            }
        });
    }
    renderPieChart1(): void {
        const canvas = <HTMLCanvasElement>document.getElementById('myChart1');
        const ctx = canvas.getContext('2d');

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Users with Rewards', 'Users with No Rewards'],
                datasets: [{
                    data: [this.usersWithRewards, this.usersWithNoRewards],
                    backgroundColor: [
                        'rgba(255, 99, 132)',
                        'rgba(54, 162, 235)'
                    ],
                    hoverOffset: 4
                }]
            }
        });
    }
}
