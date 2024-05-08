import { Component } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrl: './calender.component.scss'
})
export class CalenderComponent {

  selectedDate: Date;
  minDate: Date = new Date();
  maxDate: Date = new Date(); 
  
    events: any[];
  
    options: any;
  
    header: any;
  
    constructor(private eventService: EventService) { }
  
    ngOnInit() {
      this.eventService.getEvents().then(events => {
        this.events = events;
        this.options = {
          initialDate: '2019-01-01',
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          editable: true,
          selectable: true,
          selectMirror: true,
          dayMaxEvents: true,
          events: this.events // Utilisez ici les événements obtenus
        };
      });
    }
  }
  
  
  

