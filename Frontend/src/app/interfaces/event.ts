import { Status } from "./status";
import { TypeEvent } from "./type-event";
import { User } from "./user";
    
export interface Event {
     idEvent?:number;
     eventName?:string;
     eventType?: TypeEvent;
     datetime?: Date;
     location?: string;
     description?:string;
     image?:string;
     nbplacesMax?:number;
     nbPlacesReservees?:number;
     tokenvalue?:number;
     status?:Status;
     eventOwner?:User;
  }
 
