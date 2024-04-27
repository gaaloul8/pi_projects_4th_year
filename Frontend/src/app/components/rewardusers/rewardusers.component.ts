import {Component, OnInit} from '@angular/core';
import {RewardService} from "../../services/reward.service";
import {Reward} from "../../interfaces/reward";
import {MessageService, SelectItem} from "primeng/api";
import {DataView, DataViewModule} from "primeng/dataview";
import {DropdownChangeEvent, DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {RatingModule} from "primeng/rating";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RippleModule} from "primeng/ripple";
import {Forum} from "../../services/forum.service";
import {OrderListModule} from "primeng/orderlist";
import {PickListModule} from "primeng/picklist";

@Component({
  selector: 'app-rewardusers',
  standalone: true,
    imports: [
        DataViewModule,
        DropdownModule,
        FormsModule,
        RatingModule,
        DatePipe,
        ToastModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        InputTextareaModule,
        NgForOf,
        NgIf,
        RippleModule,
        OrderListModule,
        PickListModule
    ],
  templateUrl: './rewardusers.component.html',
  styleUrl: './rewardusers.component.scss'
})
export class RewardusersComponent implements OnInit{
    rewards: Reward[] = [];
    sortOrder: number = 0;
    sortField: string = '';
    reward: Reward = {};
    submitted: boolean = false;
    rewardDialog: boolean = false;

    searchInput: string = '';
    searchResults: any[] = [];
    sortOptions: SelectItem[] = [];
    showDropdown: boolean = false;
    closed?: boolean;

    constructor(private rewardService: RewardService, private messageService: MessageService) { }

    ngOnInit() {
        this.loadRewards();

        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ];
    }





    loadRewards(): void {
        this.rewardService.getAllRewards().subscribe(
            (rewards: Reward[]) => {
                this.rewards = rewards;
                console.log('Rewards:', this.rewards);
            },
            (error) => {
                console.log('Error fetching rewards:', error);
            }
        );

    }

    purchaseReward(id: number): void {
        this.rewardService.purchaseReward(id).subscribe(
            () => {
                console.log('Reward purchased successfully');
                this.loadRewards(); // Optionally, you can update the rewards list here or trigger a reload
            },
            error => {
                console.error('Error purchasing reward:', error);
            }
        );
    }



    onFilter(dv: DataView, event: Event) {
        const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
        console.log('Filtering by:', value);
        dv.filter(value);
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



}
