import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {EventService } from '../../services/event.service';
import { MessageService } from 'primeng/api';
import { Status } from "../../interfaces/status";
import { TypeEvent } from "../../interfaces/type-event";
import { User } from "../../interfaces/user";
import { Event } from "../../interfaces/event";

import { DatePipe} from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-event-back',
  templateUrl: './event-back.component.html',
  styleUrl: './event-back.component.scss'
})
export class EventBackComponent implements OnInit {
  eventForm:FormGroup;
  events: Event[] = [];
  eventDialog: boolean = false;
  submitted: boolean = false;
  event: Event = {};
  deleteEventDialog: boolean = false;
  selectedEventId: number;
  eventTypes: string[] = Object.values(TypeEvent);
 
  eventStatus: string[] = Object.values(Status);
  selectedImage: any;
  selectedFile: File ;
  imagesToUpload: File[] = [];
  qrCodeImage: any;

  constructor(private http: HttpClient,private eventService : EventService,private messageService: MessageService,private datePipe: DatePipe,private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.getEvent();
    this.eventForm=this.formBuilder.group({
        image:['', ],
        description:['', ],
        eventName:['',],
        eventType:['',],
        datetime:['',],
        location:['',],
        nbplacesMax:['',],
        tokenvalue:['',]

     
    });

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
        this.getEvent(); // Mettez à jour les données si nécessaire
        this.deleteEventDialog = false; // Fermer la boîte de dialogue après la suppression
      },
      error => {
        // Gestion des erreurs
        console.error('Error deleting event:', error);
      }
    );
}

confirmDelete(idEvent: number){
  this.selectedEventId = idEvent;
  this.deleteEventDialog = true;
}



// Angular Component
updateEvent(idEvent : number): void {
  this.submitted = true;
  try {
      this.eventService.updateEvent(idEvent, this.eventForm.value, this.selectedImage).toPromise();
      console.log("event updated Successfully");
      window.location.reload();
  } catch (error) {
      console.error(error);
  }

}
 
editEvent(eventEdit : Event) {
  this.event = { ...eventEdit };
  this.eventDialog = true;
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


onImageSelected(event: any) {
  this.selectedImage=event.target.files[0];}


  addEvent(): void {
    this.submitted = true;
    try {
        this.eventService.addNewEvent(this.eventForm.value , this.selectedImage).toPromise();
                console.log("Reward created Successfully");
                this.eventDialog= false;
                window.location.reload();
    }catch (error){
        console.error(error)
    }


    }
    filterEventsByType(eventType: string): void {
      // Si aucun type n'est sélectionné, afficher tous les événements
      if (!eventType) {
        this.getEvent();
        return;
      }
  
      // Filtrer les événements par type
      this.eventService.searchEventByType(eventType)
        .subscribe(
          events => {
            this.events = events;
            console.log('Filtered events by type:', events);
          },
          error => {
            console.error('Error filtering events by type:', error);
          }
        );
    }

  

}
