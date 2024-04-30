import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {EventService } from '../../services/event.service';
import { MessageService } from 'primeng/api';
import { Status } from "../../interfaces/status";
import { TypeEvent } from "../../interfaces/type-event";
import { User } from "../../interfaces/user";
import { Event } from "../../interfaces/event";

import { DatePipe} from '@angular/common';

@Component({
  selector: 'app-event-back',
  templateUrl: './event-back.component.html',
  styleUrl: './event-back.component.scss'
})
export class EventBackComponent implements OnInit {

  events: Event[] = [];
  eventDialog: boolean = false;
  submitted: boolean = false;
  event: Event = {};
  deleteEventDialog: boolean = false;
  selectedEventId: number;
  eventTypes: string[] = Object.values(TypeEvent);
  eventStatus: string[] = Object.values(Status);
  selectedImage: File | null = null;
  selectedFile: File | null = null;
  imagesToUpload: File[] = [];
  constructor(private eventService : EventService,private messageService: MessageService,private datePipe: DatePipe){}

  ngOnInit(): void {
    this.getEvent();
  }



onFileChange(event) {
    this.imagesToUpload = event.target.files;
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

  addEvent() {
    this.submitted = true;
    //this.event.eventOwner = { id_user: 1}; 
    try {
        console.log(this.event);
        this.eventService.addNewEvent(this.event).toPromise();
        console.log("event created");

        this.eventDialog = false;
        window.location.reload();
    } catch(error) {
        console.error(error);
    }
}

  openNew() {
    this.event = {};
    this.submitted = false;
    this.eventDialog = true;
}
hideDialog() {
  this.eventDialog = false;
  this.submitted = false;
}

confirmDeleteEvent(idEvent: number) {
  this.eventService.deleteEvent(idEvent)
    .subscribe(
      () => {
        // La suppression de l'événement a réussi
        console.log('Event deleted with ID:', idEvent);
        this.messageService.add({severity:'success', summary:'Success', detail:'Event deleted successfully!'});
        this.getEvent(); // Mettez à jour les données si nécessaire
        this.deleteEventDialog = false; // Fermer la boîte de dialogue après la suppression
      },
      error => {
        // Gestion des erreurs
        console.error('Error deleting event:', error);
        this.messageService.add({severity:'error', summary:'Error', detail:'Error deleting event.'});
      }
    );
}

confirmDelete(idEvent: number){
  this.selectedEventId = idEvent;
  this.deleteEventDialog = true;
}



// Angular Component
updateEvent(eventToUpdate: Event) {
  this.eventService.updateEvent(eventToUpdate).subscribe(
    updatedEvent => {
      console.log('Event updated:', updatedEvent);
      this.eventDialog = false;
      window.location.reload();
    },
    error => {
      console.error('Error updating event:', error);
    }
  );
}


editEvent(eventEdit : Event) {
  this.event = { ...eventEdit };
  this.eventDialog = true;
}

filterEventsByType(event) {
  const selectedType = event.value;
  this.eventService.searchEventByType(selectedType).subscribe(
    (events) => {
      this.events = events;
    },
    (error) => {
      console.log('Error fetching events:', error);
    }
  );
}
filterEventsByDate(date : Date){
 // const selectedType = event.value;
  this.eventService.searchEventByDate(date).subscribe(
    (events) => {
      this.events = events;
    },
    (error) => {
      console.log('Error fetching events:', error);
    }
  );
}

}

