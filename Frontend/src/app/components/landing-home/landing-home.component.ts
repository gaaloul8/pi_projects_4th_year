import { Component, OnInit , AfterViewInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService, Forum, Question } from '../../services/forum.service';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.scss'
]})
export class LandingHomeComponent implements  OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
    this.loadJsFiles();
      }
      loadJsFiles(): void {
        this.loadExternalScript("../../../../assets/js/main/main.js");
      }
      loadExternalScript(url: string): void {
        this.loadScript(url)
          .then(() => {
            console.log('Script loaded successfully');
          })
          .catch((error) => {
            console.error('Script loading failed:', error);
          });
      }
      loadScript(url: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
          const scriptElement = document.createElement('script');
          scriptElement.src = url;
    
          scriptElement.onload = () => {
            resolve();
          };
    
          scriptElement.onerror = (error) => {
            reject(error);
          };
    
          document.body.appendChild(scriptElement);
        });
      } 

  
}
