import { Component, OnInit , AfterViewInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService, Forum, Question, QuestionWithTags, User } from '../../services/forum.service';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.css','../../../assets/scss/core.scss'
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
  tagsList: string[][] = [];
  questionsWithTags: { question: Question, tags: string[] }[] = [];
  user:User;
  searchTag: string = '';
  filteredQuestions: { question: Question, tags: string[] }[] = [];
  constructor(private renderer: Renderer2,
    private forumService: ForumService,
    private questionsService: QuestionsService,
    private route: ActivatedRoute
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadJsFiles();
    }, 50);
    this.getForumDetails();
    this.fetchForums();
  }
  ngOnInit(): void {
    // Get the current forum ID from route parameters
    this.route.params.subscribe(params => {
      this.currentForumId = +params['id']; // '+' is used to convert the parameter to a number
    });
    this.fetchQuestions();
    this.GetUser();
  }
  loadJsFiles(): void {
    this.loadJsFile("../../../../assets/js/common.js");
    this.loadJsFile("../../../../assets/js/global.js");
    this.loadJsFile("../../../../assets/js/main.js");
  }
  filterQuestions(): void {
    // If the search tag is empty, display all questions
    if (this.searchTag.trim() === '') {
      this.filteredQuestions = this.questionsWithTags;
      this.loadJsFiles();
      return;
    }
  
    // Filter questions based on the typed tag
    this.filteredQuestions = this.questionsWithTags.filter(questionWithTags => {
      this.loadJsFiles();
      return questionWithTags.tags.includes(this.searchTag.trim().toLocaleLowerCase());
      
    });
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
    this.questionsService.getAllQuestionsByForumId(forumId).subscribe(
      (questions: Question[]) => {
        this.questions = questions;
        // console.log('Questions:', this.questions);
        questions.forEach((question) => {
          this.questionsService.getTags(question.content).subscribe(
            (tags: string[]) => {
              // console.log(tags);
             // this.tagsList.push(tags);
              this.questionsWithTags.push({ question, tags });
              this.filteredQuestions = this.questionsWithTags;

            },
            (error) => {
              console.error('Error fetching tags:', error);
            }
          );
        });
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }
  GetUser(){
    this.forumService.getUser().subscribe(
      (user: User) => {
        this.user = user;
      },
      (error) => {
        console.log('Error fetching user:', error);
      }
    );
  }
  toggleActiveClass(action: string, event: MouseEvent, question: Question): void {
    event.preventDefault(); // Prevent any default behavior of the anchor tag
  
    const target = event.currentTarget as HTMLElement;
  
    // Remove 'active' class from all buttons
    const allButtons = document.querySelectorAll('.comment-action');
    allButtons.forEach(button => {
      if (button !== target) {
        button.classList.remove('active');
  
        // Reset the color of the SVG icon
        const svg = button.querySelector('svg');
        svg.style.stroke = '#c8c8c8'; // Placeholder color
      }
    });
  
    // Toggle the 'active' class on the clicked element
    target.classList.toggle('active');
  
    // Get the SVG element within the clicked element
    const svg = target.querySelector('svg');
  
    // Increment upvotes when 'like' button is clicked
    if (action === 'like') {
      this.upvoteQuestion(question);
      question.upvotes++; // Increment upvotes by 1
      if(question.downvotes != 0){
        question.downvotes--;
      }
    }else if (action === "dislike"){
     this.downvoteQuestion(question);
     if(question.upvotes != 0){
      question.upvotes--; // Increment upvotes by 1
     }
     question.downvotes++;
    }
  
    // Here you can add more logic to handle other actions based on the 'action' parameter
    switch (action) {
      case 'like':
        if (target.classList.contains('active')) {
          // Apply the color for active like
          svg.style.stroke = '#1ce589'; // Green
        } else {
          // Apply the default color for inactive like
          svg.style.stroke = '#c8c8c8'; // Placeholder color
        }
        break;
      case 'dislike':
        if (target.classList.contains('active')) {
          // Apply the color for active dislike
          svg.style.stroke = '#f71416'; // Red
        } else {
          // Apply the default color for inactive dislike
          svg.style.stroke = '#c8c8c8'; // Placeholder color
        }
        break;
      case 'reply':
        if (target.classList.contains('active')) {
          // Apply the color for active reply
          svg.style.stroke = '#393a4f'; // Dark text color
        } else {
          // Apply the default color for inactive reply
          svg.style.stroke = '#c8c8c8'; // Placeholder color
        }
        break;
      default:
        break;
    }
  }
  upvoteQuestion(question: Question): void {
    this.questionsService.upvoteQuestion(question.questionId).toPromise();
  }
  
  downvoteQuestion(question: Question): void {
    this.questionsService.downvoteQuestion(question.questionId).toPromise();
  
  }
  calculateTimeAgo(createdAt: Date): string {
    // Calculate time difference in milliseconds
    const now = new Date().getTime();
    const created = new Date(createdAt).getTime();
    let difference = Math.abs(now - created);
  
    const days = Math.floor(difference / (1000 * 60 * 60 * 24)); // Calculate days
    difference -= days * (1000 * 60 * 60 * 24); // Update difference
  
    const hours = Math.floor(difference / (1000 * 60 * 60));
    difference -= hours * (1000 * 60 * 60);
    
    const minutes = Math.floor(difference / (1000 * 60));
    difference -= minutes * (1000 * 60);
    
    const seconds = Math.floor(difference / 1000);
  
    let timeAgo = '';
  
    if (days > 0) {
      timeAgo += `${days} day${days > 1 ? 's' : ''} `;
    }
    if (hours > 0) {
      timeAgo += `${hours} hour${hours > 1 ? 's' : ''} `;
    }
    if (minutes > 0) {
      timeAgo += `${minutes} minute${minutes > 1 ? 's' : ''} `;
    }
    if (days === 0 && hours === 0 && minutes === 0) {
      timeAgo += `${seconds} second${seconds > 1 ? 's' : ''} `;
    }
  
    return timeAgo + 'ago';
  }
  
  async saveQuestion() {

    
    this.questionn.title = this.title;
    this.questionn.content = this.content;
    // this.questionn.author = { id_user: 1, role: "User" };
    this.questionn.forum = {forumId : this.route.snapshot.paramMap.get('id')};
    // this.questionn.createdAt = new Date();
    this.questionn.closed=false;
    this.questionn.upvotes=0;
    try {
      const newQuestion: { question: Question, tags: string[] } = {
        question: {...this.questionn},
        tags: [] // Add tags here if needed
      };
      const createdQuestion = await this.questionsService.createQuestion(this.questionn).toPromise();
      // console.log('New Question created:', newQuestion);
  
      // // Load necessary scripts
      // // Fetch forums and close the dialog
      // this.forumDialog = false; 
      //window.location.reload();
      this.questionsWithTags.push({ question: createdQuestion, tags: newQuestion.tags });

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
        // console.log('Forum details:', this.forum);
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
