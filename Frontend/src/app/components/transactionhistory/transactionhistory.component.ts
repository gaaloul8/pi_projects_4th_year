import {Component, OnInit} from '@angular/core';
import {RewardService} from "../../services/reward.service";
import {TransactionhistoryModule} from "../../services/transactionhistory/transactionhistory.module";

@Component({
  selector: 'app-transactionhistory',
  standalone: true,
  imports: [],
  templateUrl: './transactionhistory.component.html',
  styleUrl: './transactionhistory.component.scss'
})
export class TransactionhistoryComponent implements OnInit{
    transactions:any;

    constructor(private transaction:TransactionhistoryModule) { }
    ngOnInit() {
        this.findAll();
    }
    findAll(): void {
        this.transaction.getAlltransacrion().subscribe(
            data => {
                this.transactions = data;
                console.log(data);
            },
            error => {
                console.error('Error fetching rewards:', error);
            }
        );
    }
}
