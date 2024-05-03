import { Pipe, PipeTransform } from '@angular/core';
import { Reservation } from './interfaces/reservation';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(reservations: Reservation[], filterText: string) {
    console.log('Filter pipe called!');
    if(reservations.length === 0 || filterText === ''){
        return reservations;
    } else {
        return reservations.filter((reservation) => 
        { 
            return reservation.user.identifiant.toLowerCase() === filterText.toLowerCase()
        })
    }
}

}
