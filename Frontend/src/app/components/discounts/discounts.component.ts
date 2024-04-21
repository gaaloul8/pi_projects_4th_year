import { Component,OnInit } from '@angular/core';
import {DiscountService} from "../../services/discount.service";
import {Reward, RewardService} from "../../services/reward.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageService, SharedModule} from "primeng/api";
import {Discount} from "../../interfaces/discount";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {NgIf} from "@angular/common";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-discounts',
  standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        InputNumberModule,
        InputTextModule,
        InputTextareaModule,
        NgIf,
        ReactiveFormsModule,
        RippleModule,
        SharedModule,
        TableModule,
        ToolbarModule,
        CalendarModule,
        DropdownModule,
        FormsModule
    ],
  templateUrl: './discounts.component.html',
  styleUrl: './discounts.component.scss'
})
export class DiscountsComponent implements OnInit {
    discounts: Discount[] = [];
    dicountForm: FormGroup;
    discountDialog: boolean = false;
    submitted: boolean = false;
    discount: Discount = {};
    messageService: MessageService
    deleteDiscountDialog: boolean = false;
    selectedDiscountId: number;
    rewards: Reward[] = [];
    selectedReward: Reward | null = null;
    selectedRewardName: string;

    constructor(private discountService: DiscountService, private fb: FormBuilder,private rewardService: RewardService) {
    }

    ngOnInit(): void {
        this.loadDiscounts();
        this.loadRewards();
        //console.log("rewards wahadha",this.rewards);
    }
    onRewardSelect() {
        if (this.selectedReward) {
            this.discount.rewardId = this.selectedReward.idReward; // Use idReward to get the ID
            console.log('Assigned rewardId:', this.discount.rewardId);
        } else {
            console.error('No reward selected.');
        }
    }

    loadDiscounts() {
        this.discountService.getAllDiscounts().subscribe(
            (discounts) => {
                this.discounts = discounts;
                console.log('Discounts:', this.discounts);

            },
            (error) => {
                console.log('Error fetching discounts:', error);
            }
        );
    }

    addDiscount() {
        this.submitted = true;

        try {
            console.log(this.discount);
            this.discountService.addDiscount(this.discount).toPromise();
            console.log("discount created");
            window.location.reload();

            this.discountDialog = false;
           // window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    openNew() {
        this.discount = {};
        this.submitted = false;
        this.discountDialog = true;
    }

    hideDialog() {
        this.discountDialog = false;
        this.submitted = false;
    }

    deleteDiscount(idDiscount: number) {
        this.discountService.deleteDiscount(idDiscount).subscribe(
            () => {
                if (this.messageService) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Discount Deleted Successfully',
                        life: 3000
                    });
                }
                // Rafraîchir la liste des événements après la suppression réussie
                this.loadDiscounts();
            },
            (error) => {
                console.error('Error deleting discount:', error);
                if (this.messageService) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to delete discount',
                        life: 3000
                    });
                }
            }
        );
        this.deleteDiscountDialog = false;
    }
    confirmDelete(idDiscount: number){
        this.selectedDiscountId = idDiscount;
        this.deleteDiscountDialog = true;
    }

    filterDiscountsByDate(date : Date){
        // const selectedType = event.value;
        this.discountService.searchDiscountByDate(date).subscribe(
            (discounts) => {
                this.discounts = discounts;
            },
            (error) => {
                console.log('Error fetching discounts:', error);
            }
        );
    }
    loadRewards(): void {
        this.rewardService.getAllRewards().subscribe(
            (rewards:Reward[]) => {
                this.rewards = rewards;
                console.log('Rewards:', this.rewards);

            },
            error => {
                console.log("error fetching rewards",error);
            }
        );
    }
    onPanelHide(event) {
        event.originalEvent.stopPropagation();
    }

    calculateNewCost(discount: Discount): void {
        this.discountService.calculateNewCost(discount).subscribe(
            () => {
                console.log('New cost calculated successfully.');
            },
            error => {
                console.error('Error occurred while calculating new cost:', error);
            }
        );}
}

