import {Component, OnInit} from '@angular/core';
import {Reward, RewardService} from "../../services/reward.service";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService, SelectItem, SharedModule} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {DataViewModule} from "primeng/dataview";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {NgForOf} from "@angular/common";
import {RatingModule} from "primeng/rating";
import {DialogModule} from "primeng/dialog";
import {RippleModule} from "primeng/ripple";
import {Feedback} from "../../interfaces/feedback";
import {Reservation} from "../../interfaces/reservation";

@Component({
  selector: 'app-rewardfront',
  standalone: true,
    imports: [
        ButtonModule,
        DataViewModule,
        DropdownModule,
        InputTextModule,
        NgForOf,
        RatingModule,
        ReactiveFormsModule,
        SharedModule,
        FormsModule,
        DialogModule,
        RippleModule
    ],
  templateUrl: './rewardfront.component.html',
  styleUrl: './rewardfront.component.scss'
})
export class RewardfrontComponent implements OnInit{
    rewards: Reward[] = [];
    sortOrder: number = 0;
    sortField: string = '';
    sortOptions: SelectItem[] = [];
    searchTerm: string = '';
    displayDialog: boolean = false;
    rating: number = 0;
    selectedReward: Reward;



    constructor(
        private rewardService: RewardService){}

    ngOnInit(): void {
        this.loadRewards();
        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ];
    }

    loadRewards(): void {
        this.rewardService.getrewarbyuser().subscribe(
            (rewards:Reward[]) => {
                this.rewards = rewards;
                console.log('Reward:', this.rewards);
            },
            error => {
                console.log("error fetching rewards",error);
            }
        );
    }
    filterRewards() {
        if (!this.searchTerm) {
            this.loadRewards();
            return;
        }

        this.rewards = this.rewards.filter(reward =>
            reward.name.toLowerCase().includes(this.searchTerm.toLowerCase())

        );
    }


    onSortChange(event: any) {
        const value = event.value;

        if (value === 'price') {
            this.sortOrder = 1;
            this.sortField = 'cost';
        } else if (value === '!price') {
            this.sortOrder = -1;
            this.sortField = 'cost';
        }
    }

    showDialog(reward: Reward) {
        this.selectedReward = reward; // Store the selected reward
        this.displayDialog = true; // Open the dialog
    }

    sendRating() {
        console.log('Sending rating:', this.rating, 'for reward:', this.selectedReward);
        this.displayDialog = false; // Close the dialog
        this.rewardService.updateRate(this.selectedReward.idReward,this.rating).toPromise();
    }

}
