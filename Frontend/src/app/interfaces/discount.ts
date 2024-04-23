import {Reward} from "./reward";
import {User} from "./user";

export interface Discount{
    idDiscount?: number;
    createdDiscount?: Date;
    endDiscount?: Date;
    discountValue?: string;
    rewardId?: number;
}
