import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {EventService } from '../../services/event.service';
import { MessageService } from 'primeng/api';
import { Status } from "../../interfaces/status";
import { TypeEvent } from "../../interfaces/type-event";
import { User } from "../../interfaces/user";
import { Event } from "../../interfaces/event";
import { FormBuilder,FormControl,Validator, Validators } from '@angular/forms';


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
  messageService: MessageService
  eventTypes: string[] = Object.values(TypeEvent);
  eventStatus: string[] = Object.values(Status);
  constructor(private eventService : EventService,private fb: FormBuilder){}

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

  public addEvent() {
    this.submitted = true;
    this.event.eventOwner = { id_user: 4, role: "ClubManager" };
    
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
  this.eventService.deleteEvent(idEvent).subscribe(
    () => {
      if (this.messageService) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Event Deleted Successfully', life: 3000 });
      }
      // Rafraîchir la liste des événements après la suppression réussie
      this.getEvent();
    },
    (error) => {
      console.error('Error deleting event:', error);
      if (this.messageService) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete event', life: 3000 });
      }
    }
  );
  this.deleteEventDialog = false; // Supposé pour fermer la boîte de dialogue après la suppression
}

confirmDelete(idEvent: number){
  this.selectedEventId = idEvent;
  this.deleteEventDialog = true;
}
updateEvent(eventToUpdate : Event) {
  this.eventService.updateEvent(eventToUpdate).subscribe(
    updatedEvent => {
      console.log('Event updated:', updatedEvent);
      // Réussite : Gérer la réponse mise à jour si nécessaire
    },
    error => {
      console.error('Error updating event:', error);
      console.log('Selected eventType:', this.event.eventType);
      // Erreur : Gérer les erreurs si nécessaire
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

