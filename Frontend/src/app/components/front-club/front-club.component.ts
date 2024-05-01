
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
  constructor(private clubService:ClubService,private formbuilder:FormBuilder,private renderer:Renderer2) {}
  ngOnInit(): void {
    this.onGetAllClubs();
    this.loadJsFiles();
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
onGetAllClubs(): void {
  this.clubService.getAllClubs()
    .subscribe((response: Club[])=> {
      console.log('All clubs:', response);
      this.clubs = response;
    }, error => {
      console.error('Error fetching clubs:', error);
    });
}


}
