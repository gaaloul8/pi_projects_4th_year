import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../interfaces/event';
import { Image } from 'primeng/image';
import { EvenementWithRating } from '../interfaces/evenement-with-rating';
import { Feedback } from '../interfaces/feedback';
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class EventService {
 //private baseUrl = 'http://localhost:8081';
    private baseUrl = environment.backendUrl;

    private token =  localStorage.getItem('jwtAccessToken');
 constructor(private http: HttpClient) { }

  public getAllEvent(): Observable<Event[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return this.http.get<Event[]>(`${this.baseUrl}/event/getAllEvent`,{ headers: headers });
  }


      deleteEvent(idEvent: number): Observable<void> {
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + this.token
        });
        return this.http.delete<void>(`${this.baseUrl}/event/${idEvent}`,{ headers: headers });
      }

      searchEventByType(type: string) {
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + this.token
        });
        return this.http.get<Event[]>(`${this.baseUrl}/event/searchByType/${type}`,{ headers: headers });
    }

    getEventById(idEvent: number): Observable<Event> {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      });
      return this.http.get<Event>(`${this.baseUrl}/event/eventId/${idEvent}`,{ headers: headers });
    }
    searchEventByDate(date: Date): Observable<any[]> {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      });
      const isoDate = date.toISOString();
      return this.http.get<any[]>(`${this.baseUrl}/event/searchByDate/${isoDate}`,{ headers: headers });
    }

    searchEventByName(name : String): Observable<any[]> {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      });
      return this.http.get<any[]>(`${this.baseUrl}/event/searchByName/${name}`,{ headers: headers });
    }
    getEventFeedbackStatistics(): Observable<any[]> {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      });
      return this.http.get<any[]>(`${this.baseUrl}/event/feedbackStatistics`,{ headers: headers });
    }


    getAllEventsWithRatings(): Observable<EvenementWithRating[]> {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      });
      return this.http.get<EvenementWithRating[]>(`${this.baseUrl}/event/with-ratings`,{ headers: headers });
  }

  addNewEvent(event:Event ,image:File): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    const formData = new FormData();
    formData.append('eventName', event.eventName);
    formData.append('location', event.location);
    formData.append('datetime', event.datetime.toISOString()); // Convert date to ISO string
    formData.append('image', image);
    formData.append('nbplacesMax',  event.nbplacesMax.toString() );
    formData.append('eventType', event.eventType);
    formData.append('description', event.description);
    formData.append('tokenvalue',  event.tokenvalue.toString() );
    return this.http.post<Event>(`${this.baseUrl}/event/addEvent`,formData,{ headers: headers });
}



updateEvent(idEvent: number, event: Event, image: File): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });

  const formData = new FormData();
  formData.append('eventName', event.eventName);
  formData.append('location', event.location);
  formData.append('datetime', event.datetime.toISOString()); // Convert date to ISO string
  formData.append('image', image);
  formData.append('nbplacesMax', event.nbplacesMax.toString());
  formData.append('eventType', event.eventType);
  formData.append('description', event.description);
  formData.append('tokenvalue', event.tokenvalue.toString());

  // Now send the updated form data in the PUT request
  return this.http.put(`${this.baseUrl}/event/updateEvent/${idEvent}`, formData, { headers: headers });
}


generateQRCode(eventName: string): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });
  return this.http.post(`${this.baseUrl}/event/addQRCode`, { eventName },{ headers: headers });
}

 /*
assignTokensToUser(idEvent: number, id_user: number): Observable<any> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });
  // Utiliser l'ID de l'utilisateur dans l'URL
  return this.http.post(`${this.baseUrl}/event/${idEvent}/assignTokens?id_user=${id_user}`, null,{ headers: headers });
}
*/

/*assignTokenEventToUser(eventId: number, userId: number): Observable<string> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });
  return this.http.post<string>(`${this.baseUrl}/event/${eventId}/assign-token/${userId}`, {headers: headers });
}*/

assignTokens(eventId: number, userId: number) {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });
  return this.http.post<String>(`${this.baseUrl}/event/${eventId}/assign-token/${userId}`,  {headers: headers });
}

getFeedbackByIdEvent(id: number): Observable<Feedback[]> {
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.token
  });
  return this.http.get<Feedback[]>(`${this.baseUrl}/feedback/events/${id}/feedbacks`,{ headers: headers });
}



  }



