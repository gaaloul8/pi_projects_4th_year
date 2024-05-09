import { User } from "./user";

export interface Reward {
    idReward?: number;
    name?: string;
    image?: string;
    User?: User;
    cost?: number;
    description?: string;
    nbDispo?: number;
    rating?:number;
}
