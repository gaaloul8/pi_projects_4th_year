import { Component, OnInit , AfterViewInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService, Forum, Question } from '../../services/forum.service';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['../../../assets/scss/core.scss'
]})
export class ForumDetailComponent implements AfterViewInit , OnInit {
  forum: Forum;
  question:Question;
  questionn:any = {};
  currentForumId: number;
  forums: Forum[] = [];
  questions: Question[] = [];
  title: string;
  content: string;
  constructor(private renderer: Renderer2,
    private forumService: ForumService,
    private questionsService: QuestionsService,
    private route: ActivatedRoute
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadJsFiles();
    }, 100);
    this.getForumDetails();
    this.fetchForums();
  }
  ngOnInit(): void {
    // Get the current forum ID from route parameters
    this.route.params.subscribe(params => {
      this.currentForumId = +params['id']; // '+' is used to convert the parameter to a number
    });
    this.fetchQuestions();
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
  fetchQuestions(): void {
    const forumId = +this.route.snapshot.paramMap.get('id');
    // Fetch questions for the current forum ID
    this.questionsService.getAllQuestionsByForumId(forumId).subscribe(
      (questions: Question[]) => {
        this.questions = questions;
        console.log('Questions:', this.questions);
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }
  async saveQuestion() {

    console.log("question title : " + this.title + " content : " + this.content);
    
    this.questionn.title = this.title;
    this.questionn.content = this.content;
    this.questionn.author = { id_user: 1, role: "User" };
    this.questionn.forum = {forumId : this.route.snapshot.paramMap.get('id')};
    this.questionn.createdAt = new Date();
    this.questionn.closed=false;
    this.questionn.upvotes=0;
    try {
      const newQuestion = await this.questionsService.createQuestion(this.questionn).toPromise();
      console.log('New Question created:', newQuestion);
  
      // // Load necessary scripts
      // // Fetch forums and close the dialog
      // this.forumDialog = false; 
      //window.location.reload();
      this.questions.push(newQuestion);

    // Reset input fields
    this.title = '';
    this.content = '';
    } catch (error) {
      console.error('Error creating question:', error);
    }
  }

  getForumDetails(): void {
    const forumId = +this.route.snapshot.paramMap.get('id');
    
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
  fetchForums(): void {
    this.forumService.getAllForums().subscribe(
      (forums: Forum[]) => {
        this.forums = forums;
      },
      (error) => {
        console.log('Error fetching forums:', error);
      }
    );
  }
}
