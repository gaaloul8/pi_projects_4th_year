import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
 
import { EventService } from 'src/app/services/event.service';
import { Event } from "../../interfaces/event";
import { MessageService, SelectItem } from 'primeng/api';
import { ReservationService } from 'src/app/services/reservation.service';
import { Reservation } from 'src/app/interfaces/reservation';
import { TypeEvent } from "../../interfaces/type-event";
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { EvenementWithRating } from 'src/app/interfaces/evenement-with-rating';
@Component({
  selector: 'app-eventfront',
  templateUrl: './eventfront.component.html',
  styleUrls: ['./eventfront.component.scss' ,'../forum/forum.component.scss','../../../assets/scss/core.scss'] 

 
})
export class EventfrontComponent implements OnInit{
  reservations: Reservation[] = [];
events: Event[] = [];
sortOrder: number = 0;
sortField: string = '';
event: Event = {};
searchInput: string = '';
searchResults: any[] = [];
sortOptions: SelectItem[] = [];
searchEventValue: any;
eventTypes: SelectItem[] = Object.keys(TypeEvent).map((key) => ({
  label: TypeEvent[key as keyof typeof TypeEvent],
  value: TypeEvent[key as keyof typeof TypeEvent],
}));
selectedTypes: string[] = [];
eventsWithRatings: EvenementWithRating[];

constructor(private eventService : EventService,
  private reservationService: ReservationService,
  private messageService: MessageService,
  private router: Router,
  private renderer: Renderer2
){}



ngOnInit(): void {
  this.getEventsWithRatings();
  setTimeout(() => {
    this.loadJsFiles();

}, 100);
}

getEventsWithRatings(): void {
  this.eventService.getAllEventsWithRatings()
      .subscribe(events => this.eventsWithRatings = events);
}

bookEvent(eventId: number): void {
  const reservation: Reservation = {
    //user: { id_user: 1, role: "User" }
  };

  this.reservationService.addReservation(eventId, reservation)
    .subscribe(
      () => {
        // La réservation a été ajoutée avec succès
        console.log('Réservation ajoutée pour l\'événement avec l\'ID : ', eventId);
        this.messageService.add({severity:'success', summary:'Success', detail:'Réservation effectuée avec succès!'});
        // Rediriger l'utilisateur vers la liste des réservations
       this.router.navigate(['/listreservationfront']);
      },
      error => {
        // Gérer les erreurs
        console.error('Impossible de réserver. Toutes les places sont déjà réservées.', error);
        this.messageService.add({severity:'error', summary:'Error', detail:'Impossible de réserver. Toutes les places sont déjà réservées.'});
      }
    );
}


public loadJsFile(url: string) {
  const body = <HTMLDivElement>document.body;
  const script = document.createElement('script');
  script.innerHTML = '';
  script.src = url;
  script.async = false;
  script.defer = true;
  script.className = "custom-js";
  script.onerror = (error) => {
      console.error('Failed to load script:', error);
  };
  this.renderer.appendChild(document.body, script);
}

loadJsFiles(): void {
  this.loadJsFile("../../../../assets/js/common.js");
  this.loadJsFile("../../../../assets/js/global.js");
  this.loadJsFile("../../../../assets/js/main.js");
}
navigateToEventDetails(eventId: number) {
  this.router.navigate(['/event-details', eventId]);
}
 
}

