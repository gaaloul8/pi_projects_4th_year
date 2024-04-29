import { User } from "./user";
import { Event } from "./event";
export interface Reservation {
    idR?: number;
    user?: User;
    evenementR?: Event;
}
