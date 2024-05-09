
import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';

import { Club, ClubService } from 'src/app/services/club.service';
import {FormBuilder, FormGroup, FormsModule, NgForm} from "@angular/forms";
import {NgForOf} from "@angular/common";
import { CommonModule } from '@angular/common';
import {ProgressBarModule} from "primeng/progressbar";
import {BadgeModule} from "primeng/badge";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RippleModule} from "primeng/ripple";
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from 'src/app/models/userModel';
@Component({
  selector: 'app-front-club',
  standalone: true,
  imports: [
    FormsModule,
        NgForOf,
        CommonModule,
        ProgressBarModule,
        BadgeModule,
        ProgressSpinnerModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        InputTextareaModule,
        RippleModule,

       
  ],
  templateUrl: './front-club.component.html',

  styleUrls: ['./front-club.component.scss','../../../assets/scss/core.scss'
    ],
})

export class FrontClubComponent implements OnInit{
  clubs: Club[] = [];
  selectedClubId:number;
  selectedClub: Club;
  deleteForumDialog:boolean;
  searchQuery: string = '';
  clubDialog: boolean = false;
  submitted: boolean = false;
  club: Club = {};
  
  user: UserModel;
  private token = localStorage.getItem('jwtAccessToken');
  
  private searchSubject: Subject<string> = new Subject<string>();
  constructor(private clubService:ClubService,private formbuilder:FormBuilder,private renderer:Renderer2,private http:HttpClient) {
    this.searchSubject.pipe(
      debounceTime(300), // Wait for 300ms after the last keystroke
      distinctUntilChanged() // Only emit distinct search queries
    ).subscribe(() => {
      this.searchClubs();
    });
  }
  ngOnInit(): void {
    this.onGetAllClubs();
    this.getUser();
    this.loadJsFiles();
    
  }
  //modal club
  openModal(club: any) {
    this.selectedClub = club;
    document.body.classList.add('modal-open'); // Ajoute une classe pour empêcher le défilement de la page en arrière-plan
}

closeModal() {
    this.selectedClub = null;
    document.body.classList.remove('modal-open'); // Retire la classe ajoutée pour permettre le défilement
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
getUser(): void {
  this.clubService.getUser().subscribe(
    (response: UserModel) => {
      this.user = response;
    },
    error => {
      console.error('Error fetching user:', error);
    }
  );
}

loadJsFiles(): void {
    this.loadJsFile("../../../../assets/js/common.js");
    this.loadJsFile("../../../../assets/js/global.js");
    this.loadJsFile("../../../../assets/js/main.js");
}
onGetAllClubs(): void {
  this.clubService.getAllClubs()
    .subscribe((response: Club[])=> {
      console.log('All clubs:', response);
      this.clubs = response;
    }, error => {
      console.error('Error fetching clubs:', error);
    });
}
confirmDelete(forumId: number){
  this.selectedClubId = forumId;
  this.deleteForumDialog = true;
}
openNew() {
  this.club = {};
  this.submitted = false;
  this.clubDialog = true;
}
searchClubs(): void {
  if (this.searchQuery.trim() !== '') {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json'
    });
    this.http.get<Club[]>('http://localhost:8081/clubs/search', { params: { query: this.searchQuery.trim() } , headers: headers })
      .subscribe((response: Club[]) => {
        console.log('Searched clubs:', response);
        this.clubs = response;
      }, error => {
        console.error('Error searching clubs:', error);
        this.clubs = []; // Clear clubs array in case of error
      });
  } else {
    // If search query is empty, fetch all clubs
    this.onGetAllClubs();
  }
}


emitSearchQuery(): void {
  this.searchSubject.next(this.searchQuery); // Pass the search query to next method
}


}
