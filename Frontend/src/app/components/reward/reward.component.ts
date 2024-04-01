import {Component, OnInit} from '@angular/core';
import {RewardService} from "../../services/reward.service";
import {FormBuilder, FormGroup, FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';import { ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reward',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule,FormsModule  ],
  templateUrl: './reward.component.html',
  styleUrl: './reward.component.scss'
})
export class RewardComponent implements OnInit {
    rewards: any[] = [];
    rewardForm: FormGroup; // If you have a form for adding rewards

    constructor(
        private rewardService: RewardService,
        private formBuilder: FormBuilder, // Inject FormBuilder if needed
    ) {
    }

    ngOnInit(): void {
        this.loadRewards();
        // Initialize rewardForm if you have a form for adding rewards
        this.rewardForm = this.formBuilder.group({
            name: [''],
            description: [''],
            cost: [''],
            nbDispo: ['']
        });
    }

    loadRewards(): void {
        this.rewardService.getAllRewards().subscribe(
            data => {
                this.rewards = data;
            },
            error => {
                console.log(error);
                // Handle error or log it
            }
        );
    }

    addReward(): void {
        this.rewardService.addReward(this.rewardForm.value).subscribe(
            data => {
                console.log('Reward added successfully:', data);
                this.loadRewards(); // Refresh the list of rewards
            },
            error => {
                console.log('Error adding reward:', error);
                // Handle error or log it
            }
        );
    }

    updateReward(id: number, reward: any): void {
        this.rewardService.updateReward(id, reward).subscribe(
            data => {
                console.log('Reward updated successfully:', data);
                this.loadRewards(); // Refresh the list of rewards
            },
            error => {
                console.log('Error updating reward:', error);
                // Handle error or log it
            }
        );
    }

    deleteReward(id: number): void {
        this.rewardService.deleteReward(id)
            .subscribe(
                () => {
                    console.log('Reward deleted successfully');
                    // You can perform additional actions after successful deletion if needed
                },
                error => {
                    console.error('Error deleting reward:', error);
                    // Handle error as per your requirement, e.g., show error message to the user
                }
            );
    }
}
    // You can implement other methods similarly
