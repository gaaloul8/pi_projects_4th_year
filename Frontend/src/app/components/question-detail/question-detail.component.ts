import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacebookService } from 'src/app/services/facebook.service';
import { Forum, ForumService, Question } from 'src/app/services/forum.service';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['../../../assets/scss/core.scss'
]})
export class QuestionDetailComponent implements AfterViewInit {
  constructor(private renderer: Renderer2 ,private route: ActivatedRoute , private questionsService: QuestionsService,
    private forumService: ForumService,private facebookService: FacebookService

  ){ 
  }
  
  forum:Forum;
  question:Question;

    ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadJsFiles();
    }, 100);
    this.getQuestionDetails();
  }
  loadJsFiles(): void {
    this.loadJsFile("../../../../assets/js/common.js");
    this.loadJsFile("../../../../assets/js/global.js");
    this.loadJsFile("../../../../assets/js/main.js");
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
  publishToFacebook() {
    const message = `
    [Forum Title]: ${this.forum.topic}
    [Forum Content]: ${this.forum.content}
    ######################
    [Question Title]: ${this.question.title}
    [Question Content]: ${this.question.content}
  `;    
  this.facebookService.shareOnFacebook(message).toPromise();
  window.location.reload();
  }
  getQuestionDetails(): void {
    const questionId = +this.route.snapshot.paramMap.get('id');
    
    this.questionsService.getQuestionById(questionId).subscribe(
      (question:Question) => {
        this.question = question;
        const forumId = +this.question.forum.forumId;
    
    this.forumService.getForumById(forumId).subscribe(
      (forum: Forum) => {
        this.forum = forum;
        console.log('Forum details:', this.forum);
      },
      (error) => {
        console.error('Error fetching forum details:', error);
      }
    );
        console.log('Question details:', this.question);
        console.log("forum id for question : "+this.question.forum.forumId);
      },
      (error) => {
        console.error('Error fetching forum details:', error);
      }
    );
  }
  getForumDetails(): void {
    const forumId = +this.question.forum.forumId;
    
    this.forumService.getForumById(forumId).subscribe(
      (forum: Forum) => {
        this.forum = forum;
        console.log('Forum details:', this.forum);
      },
      (error) => {
        console.error('Error fetching forum details:', error);
      }
    );
  }
   openShareModal() {
    console.log("aaa");
    // Get a reference to the modal element
    var modal = document.getElementById('share-modal');
    
    // Add the 'is-active' class to the modal to show it
    modal.classList.add('is-active');
}

}

