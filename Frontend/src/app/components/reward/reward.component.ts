import { Component, OnInit } from '@angular/core';
import { RewardService } from "../../services/reward.service";

@Component({
    selector: 'app-reward',
    templateUrl: './reward.component.html',
    styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
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
    addReward(event: any): void {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const cost = parseFloat(formData.get('cost') as string);
        const nbDispo = parseInt(formData.get('nbDispo') as string);
        const userId = formData.get('userId') as string;
        // Call your addReward method with the extracted data
    }

    updateReward(event: any): void {
        event.preventDefault();
        const formData = new FormData(event.target);
        const id = parseInt(formData.get('updateId') as string);
        const name = formData.get('updateName') as string;
        const description = formData.get('updateDescription') as string;
        const cost = parseFloat(formData.get('updateCost') as string);
        const nbDispo = parseInt(formData.get('updateNbDispo') as string);
        const userId = formData.get('updateUserId') as string;
        // Call your updateReward method with the extracted data
    }

   /* addReward(name: string, description: string, cost: number, nbDispo: number, User: any): void {
        this.rewardService.addReward(name, description, cost, nbDispo, User).subscribe(
            reward => {
                console.log('Reward added successfully:', reward);
                // Optionally, you can update the rewards list here or trigger a reload
                // this.findAll();
            },
            error => {
                console.error('Error adding reward:', error);
            }
        );
    }
*/
    deleteReward(id: number): void {
        this.rewardService.deleteReward(id).subscribe(
            () => {
                console.log('Reward deleted successfully');
                // Optionally, you can update the rewards list here or trigger a reload
                // this.findAll();
            },
            error => {
                console.error('Error deleting reward:', error);
            }
        );
    }
/*
    updateReward(id: number, name: string, description: string, cost: number, nbDispo: number, User: any): void {
        this.rewardService.updateReward(id, name, description, cost, nbDispo, User).subscribe(
            reward => {
                console.log('Reward updated successfully:', reward);
                // Optionally, you can update the rewards list here or trigger a reload
                // this.findAll();
            },
            error => {
                console.error('Error updating reward:', error);
            }
        );
    }

 */
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

    getStatistics(): void {
        this.rewardService.getStatistics().subscribe(
            statistics => {
                console.log('User statistics:', statistics);
            },
            error => {
                console.error('Error fetching statistics:', error);
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
