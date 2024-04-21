import {Reward} from "./reward";
import {User} from "./user";

export interface Transaction_history{
    id?: number;
    user?: User;
    purchaseDate?: Date;
    reward?: Reward;
    image?: string;
    price?:number;
}
