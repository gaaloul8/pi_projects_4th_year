import { Component } from '@angular/core';
declare var google: any;
@Component({
  selector: 'app-googlemap',
  standalone: true,
  imports: [],
  templateUrl: './googlemap.component.html',
  styleUrl: './googlemap.component.scss'
})
export class GooglemapComponent {
    map: any;
    infowindow: any;

    constructor() { }

    ngOnInit(): void {
        this.initMap();
    }

    initMap(): void {
        this.map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 48.8566, lng: 2.3522 }, // Coordonnées de Paris (vous pouvez modifier selon votre emplacement)
            zoom: 12,
        });
        this.infowindow = new google.maps.InfoWindow();
    }

    searchPsychologists(): void {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            console.log(userLocation);

            const request = {
                location: userLocation,
                radius: '5000',
                type: ['psychologist']
            };

            const service = new google.maps.places.PlacesService(this.map);
            service.nearbySearch(request, this.callback.bind(this));
        });
    }

    callback(results, status): void {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.clearMarkers();
            for (let i = 0; i < results.length; i++) {
                this.createMarker(results[i]);
            }
        }
    }

    createMarker(place): void {
        const marker = new google.maps.Marker({
            map: this.map,
            position: place.geometry.location,
        });

        google.maps.event.addListener(marker, "click", () => {
            this.infowindow.setContent(place.name);
            this.infowindow.open(this.map, marker);
        });
    }

    clearMarkers(): void {
        this.infowindow.close();
        this.map.data.forEach((feature) => {
            this.map.data.remove(feature);
        });
    }
}
