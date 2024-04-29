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
import {UserModel} from "../../models/userModel";
import {User} from "../../interfaces/user";
import {MatDialog} from "@angular/material/dialog";

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

    connectedUser: User;
    constructor(private rewardService: RewardService, private messageService: MessageService,private dialog: MatDialog) { }

    ngOnInit() {
        this.loadRewards();
        this.GetConnectedUser();

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
    GetConnectedUser():void {
        this.rewardService.getConnectedUser().subscribe(
            (user: User) => {
                this.connectedUser = user;
                console.log("User",this.connectedUser)

            },
            (error) => {
                console.error('Error fetching connected user:', error);
            }
        );
    }


    purchaseReward(id: number): void {
        console.log(this.connectedUser.tokenSolde);
        this.rewardService.getRewardById(id).subscribe(
            (reward) => {
                console.log(reward.cost); // Ensure that reward is fetched correctly
                if (reward.cost < this.connectedUser.tokenSolde) {
                    this.rewardService.purchaseReward(id).subscribe(
                        () => {
                            this.openDialog('Reward purchased successfully');
                            console.log('Reward purchased successfully');
                            this.loadRewards();
                            window.location.reload();// Optionally, you can update the rewards list here or trigger a reload
                        },
                        error => {
                            console.error('Error purchasing reward:', error);
                        }
                    );
                } else {
                    this.openDialog('Solde insuffisant');
                }
            },
            error => {
                console.error('Error fetching reward:', error);
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


    openDialog(message: string): void {
        alert(message);
    }

    sendSMS(rewardName: string, cost: number, NbDispo: number): void {
        this.rewardService.sendSMS(rewardName, cost, NbDispo).subscribe(
            response => {
                console.log('Message sent successfully:', response);
                // Handle success, if needed
            },
            error => {
                console.error('Failed to send message:', error);
                // Handle error, if needed
            }
        );
    }
}
