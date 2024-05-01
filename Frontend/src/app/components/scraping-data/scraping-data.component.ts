import {Component, OnInit, Renderer2} from '@angular/core';
import {QuizUserService} from "../../services/quiz-user/quiz-user.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-scraping-data',
  standalone: true,
    imports: [

        CommonModule,
        FormsModule
    ],
  templateUrl: './scraping-data.component.html',
  styleUrls: ['./scraping-data.component.scss','../forum/forum.component.scss','../../../assets/scss/core.scss']
})
export class ScrapingDataComponent implements OnInit {
    doctorsData: string;
    doctors: any[];
    constructor(private doctorService: QuizUserService,private renderer: Renderer2) { }

    ngOnInit(): void {

            this.doctorService.retrieveAllDocters().subscribe(
                data => {
                    this.doctorsData = data.csvData;
                    console.log(this.doctorsData); // Afficher les données dans la console pour vérification
                },
                error => {
                    console.log('Error fetching doctors data:', error);
                }
            );
        setTimeout(() => {
            this.loadJsFiles();

        }, 100);
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

    searchQuery: string = ''; // Propriété pour stocker la requête de recherche

    get filteredDoctors() {
        const query = this.searchQuery.toLowerCase().trim(); // Convertir la requête de recherche en minuscules et la nettoyer
        if (!query) {
            return this.doctorsData.split('\n').slice(1); // Retourner toutes les données si aucune requête de recherche n'est saisie
        } else {
            // Filtrer les médecins dont le nom ou la description contient la requête de recherche
            return this.doctorsData.split('\n').slice(1).filter(doctor => {
                const doctorFields = doctor.split(',');
                const doctorName = doctorFields[0].toLowerCase();
                const doctorDescription = doctorFields[2].toLowerCase();
                const doctorUrl = doctorFields[1].toLowerCase();

                return doctorName.includes(query) || doctorDescription.includes(query) || doctorUrl.includes(query);
            });
        }
    }

}
