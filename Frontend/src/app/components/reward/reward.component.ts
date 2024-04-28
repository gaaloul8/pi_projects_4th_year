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
import {Event} from "../../interfaces/event";
import {CalendarModule} from "primeng/calendar";
import {InputNumberModule} from "primeng/inputnumber";
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
//import { reward } from "../../interfaces/reward";

@Component({
    selector: 'app-reward',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonModule, DialogModule, DropdownModule, InputTextModule, InputTextareaModule, RippleModule, SharedModule, CalendarModule, InputNumberModule, TableModule, ToolbarModule],
    templateUrl: './reward.component.html',
    styleUrl: './reward.component.scss'
})
export class RewardComponent implements OnInit{
    rewards: Reward[] = [];
    rewardForm: FormGroup;
    rewardDialog: boolean = false;
    submitted: boolean = false;
    reward:Reward={};
   // messageService: MessageService
    deleteRewardDialog: boolean = false;
    selectedRewardId: number;
    selectedImage:any;
     name: string;
     cost: number;
     description: string;
     nbDispo: number;
    constructor(
        private rewardService: RewardService,
        private formBuilder: FormBuilder,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.loadRewards();
        this.rewardForm=this.formBuilder.group({
            image:['', ],
            name:['', ],
            description:['', ],
            cost:[''],
            nbDispo:['']
        });
    }

    loadRewards(): void {
        this.rewardService.getAllRewards().subscribe(
            (rewards:Reward[]) => {
                this.rewards = rewards;
                console.log('Reward:', this.rewards);
            },
            error => {
                console.log("error fetching rewards",error);
            }
        );
    }

    // Inside your TypeScript component
    addReward(): void {
        this.submitted = true;
        try {
            this.rewardService.addReward(this.rewardForm.value , this.selectedImage).toPromise();

                    console.log("Reward created Successfully");
                    this.rewardDialog = false;
                    window.location.reload();
        }catch (error){
            console.error(error)
        }


        }


    openNew() {
        this.reward = {};
        this.submitted = false;
        this.rewardDialog = true;
    }

    hideDialog() {
        this.rewardDialog = false;
        this.submitted = false;
    }


    deleteReward(Rewardid: number): void {
        this.rewardService.deleteReward(Rewardid).subscribe(
            () => {
                if (this.messageService) {
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Event Deleted Successfully', life: 3000 });
                }
                this.loadRewards(); // Refresh rewards after deletion
                this.deleteRewardDialog = false; // Move it here
            },
            error => {
                console.error('Error deleting reward:', error);
                if (this.messageService) {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete event', life: 3000 });
                }
                this.deleteRewardDialog = false; // Move it here too, to handle error case
            }
        );
    }


    confirmDelete(Rewardid: number){
        this.selectedRewardId = Rewardid;
        this.deleteRewardDialog = true;
    }


    updateReward(rewardId: number): void {
        this.submitted = true;
        try {
            this.rewardService.updateReward(rewardId, this.rewardForm.value, this.selectedImage).toPromise();
            console.log("Reward updated Successfully");
            window.location.reload();
            // Handle success, e.g., show a success message to the user
        } catch (error) {
            console.error(error);
            // Handle error, e.g., show an error message to the user
        }
    }

    editReward(rewardEdit: Reward) {
        // Populate the form fields with existing reward information
        this.rewardForm.patchValue({
            // Assuming rewardEdit contains properties like name, description, etc.
            name: rewardEdit.name,
            description: rewardEdit.description,
            cost: rewardEdit.cost,
            nbDispo: rewardEdit.nbDispo,
            image: rewardEdit.image,

            // Add other fields as needed
        });

        this.reward = { ...rewardEdit };
        this.rewardDialog = true;
    }

    showDialogToAdd(): void {
        this.rewardForm.reset();
        this.rewardDialog = true;
    }
    onImageSelected(event: any) {
        this.selectedImage=event.target.files[0];
    }



}
