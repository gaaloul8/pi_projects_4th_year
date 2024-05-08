import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from 'src/app/demo/service/photo.service';
import { EventService } from 'src/app/services/event.service';
import { Event } from "../../interfaces/event";
import { Feedback } from '../../interfaces/feedback';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-page-event',
  templateUrl: './page-event.component.html',
  styleUrl: './page-event.component.scss'
})
export class PageEventComponent implements OnInit  {
  eventId: number;
  event: Event;
  feedbacks: Feedback[] = [];
  events!: Event[];
  images!: any[];
  searchValue: string = '';
  mapUrl: SafeResourceUrl = '';

  

  galleriaResponsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '960px',
        numVisible: 4
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];

carouselResponsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
];

  constructor(private route: ActivatedRoute, private eventService: EventService, private photoService: PhotoService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventId = +params.get('idEvent');
      this.getEventDetails(this.eventId);
    });
    this.photoService.getImages().then(images => {
      this.images = images;
  });
  }

  getEventDetails(id: number): void {
    this.eventService.getEventById(id).subscribe(event => {
      this.event = event;
      this.getFeedbacksForEvent(id); // Call method to fetch feedbacks for the event
    });
  }

  getFeedbacksForEvent(id: number): void {
    this.eventService.getFeedbackByIdEvent(id).subscribe(feedbacks => {
      this.feedbacks = feedbacks;
    });
  }

  getStarsArray(rating: number): any[] {
    return Array(rating).fill(0);
  }
  updateMapUrl() {
    const encodedValue = encodeURIComponent(this.searchValue.trim());
    const url = `https://maps.google.com/maps?q=${encodedValue}&output=embed`;
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


}
