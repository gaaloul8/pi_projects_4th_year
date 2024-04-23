import { Event } from "./event";
import { User } from "./user";

export interface Feedback {
    idFeedback?: number;
    content?: string;
    status?: StatusFeedback;
    evenement?: Event;
    user?: User;
    rating?:number;
}

export enum StatusFeedback {
    Processed,
    Unprocessed
}
