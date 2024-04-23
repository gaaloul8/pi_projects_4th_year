import {Component, OnInit} from '@angular/core';
import {Reward, RewardService} from "../../services/reward.service";
import {Transaction_history} from "../../interfaces/Transaction_history";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {DatePipe, JsonPipe, NgIf} from "@angular/common";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToolbarModule} from "primeng/toolbar";
import {Discount} from "../../interfaces/discount";

@Component({
  selector: 'app-transactionhistory',
  standalone: true,
    imports: [
        ButtonModule,
        CalendarModule,
        DialogModule,
        DropdownModule,
        FormsModule,
        InputTextModule,
        NgIf,
        RippleModule,
        SharedModule,
        TableModule,
        ToolbarModule,
        DatePipe,
        JsonPipe
    ],
  templateUrl: './transactionhistory.component.html',
  styleUrl: './transactionhistory.component.scss'
})
export class TransactionhistoryComponent implements OnInit{
    transactions: Transaction_history[] = [];
    transaction: Transaction_history = {};

    constructor(private rewardservice:RewardService) { }
    ngOnInit() {
        this.findAll();
    }
    findAll(): void {
        this.rewardservice.getalltransactions().subscribe(
            (transactions:Transaction_history[]) => {
                this.transactions = transactions;
                console.log('Transactions:', this.transactions);
            },
            error => {
                console.log("error fetching transaction",error);
            }
        );
    }
}
