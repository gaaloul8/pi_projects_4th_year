export interface EvenementWithRating {
  
        idEvent: number;
        eventName: string;
        eventType: string;
        datetime: Date;
        location: string;
        description: string;
        image: string;
        nbplacesMax: number;
        nbPlacesReservees: number;
        tokenvalue: number;
        status: string;
        averageRating: number; // Inclure la propriété averageRating
    
    
}
