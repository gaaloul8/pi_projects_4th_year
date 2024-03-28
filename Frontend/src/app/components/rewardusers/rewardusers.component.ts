import { Component } from '@angular/core';
import {RewardService} from "../../services/reward.service";

@Component({
  selector: 'app-rewardusers',
  standalone: true,
  imports: [],
  templateUrl: './rewardusers.component.html',
  styleUrl: './rewardusers.component.scss'
})
export class RewardusersComponent {
    rewards: any[];

    constructor(private rewardService: RewardService) { }

    ngOnInit() {
        this.findAll();
    }

    findAll(): void {
        this.rewardService.getAllRewards().subscribe(
            data => {
                this.rewards = data;
                console.log(data);
            },
            error => {
                console.error('Error fetching rewards:', error);
            }
        );
    }

    purchaseReward(id: number): void {
        this.rewardService.purchaseReward(id).subscribe(
            () => {
                console.log('Reward purchased successfully');
                // Optionally, you can update the rewards list here or trigger a reload
                // this.findAll();
            },
            error => {
                console.error('Error purchasing reward:', error);
            }
        );
    }


    getRewardsWithDiscount(): void {
        this.rewardService.getRewardsWithDiscount().subscribe(
            rewards => {
                console.log('Rewards with discount:', rewards);
            },
            error => {
                console.error('Error fetching rewards with discount:', error);
            }
        );
    }

    getRewardsWithoutDiscount(): void {
        this.rewardService.getRewardsWithoutDiscount().subscribe(
            rewards => {
                console.log('Rewards without discount:', rewards);
            },
            error => {
                console.error('Error fetching rewards without discount:', error);
            }
        );
    }
}

