import { Component,OnInit } from '@angular/core';
import {DiscountService} from "../../services/discounts/discounts.module";

@Component({
  selector: 'app-discounts',
  standalone: true,
  imports: [],
  templateUrl: './discounts.component.html',
  styleUrl: './discounts.component.scss'
})
export class DiscountsComponent implements OnInit{
    discounts: any[] = [];
    newDiscount: any = {
        createdDiscount: null,
        endDiscount: null,
        discountValue: '',
        reward: null
    };

    constructor(private discountService: DiscountService) { }

    ngOnInit(): void {
        this.loadDiscounts();
    }

    loadDiscounts() {
        this.discountService.getAllDiscounts().subscribe(
            (data) => {
                this.discounts = data;
            },
            (error) => {
                console.log('Error fetching discounts:', error);
            }
        );
    }

    addDiscount() {
        this.discountService.addDiscount(this.newDiscount).subscribe(
            (data) => {
                console.log('Discount added successfully:', data);
                this.loadDiscounts();
                // Reset the newDiscount object for next entry
                this.newDiscount = {
                    createdDiscount: null,
                    endDiscount: null,
                    discountValue: '',
                    reward: null
                };
            },
            (error) => {
                console.log('Error adding discount:', error);
            }
        );
    }

    deleteDiscount(id: number) {
        this.discountService.deleteDiscount(id).subscribe(
            () => {
                console.log('Discount deleted successfully');
                this.loadDiscounts();
            },
            (error) => {
                console.log('Error deleting discount:', error);
            }
        );
    }
}


