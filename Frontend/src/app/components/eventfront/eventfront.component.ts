import { Component, OnInit } from '@angular/core';
 
import { EventService } from 'src/app/services/event.service';
import { Event } from "../../interfaces/event";

@Component({
  selector: 'app-eventfront',
  templateUrl: './eventfront.component.html',
  styleUrl: './eventfront.component.scss'
})
export class EventfrontComponent implements OnInit{
events: Event[] = [];
 
sortOrder: number = 0;
sortField: string = '';


constructor(private eventService : EventService){}

ngOnInit(): void {
  this.getEvent();
}


getEvent(): void {
  this.eventService.getAllEvent().subscribe(
    (events: Event[]) => {
      this.events = events;
      console.log('Events:', this.events);
    },
    (error) => {
      console.log('Error fetching events:', error);
    }
  );
}
}
