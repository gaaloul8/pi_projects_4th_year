import {Component, OnInit} from '@angular/core';
import {Reward, RewardService} from "../../services/reward.service";
import {FormBuilder, FormGroup, FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';import { ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import {MessageService, SharedModule} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RippleModule} from "primeng/ripple";
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-reward',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonModule, DialogModule, DropdownModule, InputTextModule, InputTextareaModule, RippleModule, SharedModule],
  templateUrl: './reward.component.html',
  styleUrl: './reward.component.scss'
})
export class RewardComponent implements OnInit{
    rewards: Reward[] = [];
    rewardForm: FormGroup;
    rewardDialog: boolean = false;
    selectedReward: Reward;
    submitted: boolean = false;

    constructor(
        private rewardService: RewardService,
        private formBuilder: FormBuilder,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.loadRewards();
        this.rewardForm = this.formBuilder.group({
            idReward: [''],
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
            }
        );
    }

    addReward(): void {
        this.rewardService.addReward(this.rewardForm.value).subscribe(
            data => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reward added successfully' });
                this.loadRewards(); // Refresh rewards after adding
                this.hideDialog();
            },
            error => {
                console.log('Error adding reward:', error);
            }
        );
    }

    updateReward(): void {
        this.rewardService.updateReward(this.selectedReward.idReward, this.rewardForm.value).subscribe(
            data => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reward updated successfully' });
                this.loadRewards(); // Refresh rewards after updating
                this.hideDialog();
            },
            error => {
                console.log('Error updating reward:', error);
            }
        );
    }

    deleteReward(id: number): void {
        this.rewardService.deleteReward(id).subscribe(
            () => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reward deleted successfully' });
                this.loadRewards(); // Refresh rewards after deletion
            },
            error => {
                console.error('Error deleting reward:', error);
            }
        );
    }

    confirmDelete(id: number): void {
        this.selectedReward = this.rewards.find(reward => reward.idReward === id);
        this.messageService.clear();
        this.messageService.add({ severity: 'warn', summary: 'Confirm', detail: 'Are you sure you want to delete this reward?' });
    }

    showDialogToAdd(): void {
        this.rewardForm.reset();
        this.rewardDialog = true;
    }

    showDialogToUpdate(reward: Reward): void {
        this.selectedReward = reward;
        this.rewardForm.patchValue(reward);
        this.rewardDialog = true;
    }

    hideDialog(): void {
        this.rewardDialog = false;
        this.submitted = false;
        this.selectedReward = null;
    }
}
