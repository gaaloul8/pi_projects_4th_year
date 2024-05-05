import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 ,ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacebookService } from 'src/app/services/facebook.service';
import { Forum, ForumService, Question , Response, User } from 'src/app/services/forum.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { ResponsesService } from 'src/app/services/responses.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css','../../../assets/scss/core.scss'
]})
export class QuestionDetailComponent implements AfterViewInit{
  @ViewChild('likeIcon') likeIcon: ElementRef;
  @ViewChild('dislikeIcon') dislikeIcon: ElementRef;
  @ViewChild('replyIcon') replyIcon: ElementRef;
  constructor(private renderer: Renderer2 ,private route: ActivatedRoute , private questionsService: QuestionsService,
    private forumService: ForumService,private facebookService: FacebookService ,private responseService: ResponsesService,
    private elementRef: ElementRef

  ){ 
  }
  
  
  forum:Forum;
  question:Question;
  response:any = {};
  responses: Response[] = [];
  sentimentResult: string = '';
  forumId:number;
  user:User;
  deleteResponseDialog: boolean = false;
  activeButtons = {
    like: false,
    dislike: false,
    reply: false
  };


    ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadJsFiles();
    }, 100);
    this.getQuestionDetails();
    this.fetchResponses();
    this.GetUser();
    this.initModals();
    const bestAnswerId = parseInt(localStorage.getItem('bestAnswerId'));
    if (bestAnswerId) {
      console.log('Best answer ID from localStorage:', bestAnswerId);
      const bestAnswer = this.responses.find(response => response.responseId === bestAnswerId);
      console.log('Best answer:', bestAnswer);
      this.bestAnswer = bestAnswer;
      console.log('Assigned best answer:', this.bestAnswer);
    }
    // this.setupClickListeners();
  }
  loadJsFiles(): void {
    this.loadJsFile("../../../../assets/js/common.js");
    this.loadJsFile("../../../../assets/js/global.js");
    this.loadJsFile("../../../../assets/js/main.js");
  }
  saveEditedResponse(response: Response) {
    // Call your backend API to update the response content
    // For example:
    this.responseService.updateResonse(response.responseId,response).subscribe(updatedResponse => {
      response.content = updatedResponse.content;
      response.editing = false;
    });
    
    // For demonstration purposes, we'll just toggle editing back to false
    response.editing = false;
  }

  toggleEditing(response: Response) {
    response.editing = !response.editing;
  }
  confirmDelete(){
    this.deleteResponseDialog = true;
  }
  deleteResponse(response: Response) {
    // Call your backend API to delete the response
    // For example:
    this.responseService.deleteResponse(response.responseId).subscribe(() => {
      this.responses = this.responses.filter(item => item !== response);
    });
    
    // For demonstration purposes, we'll just remove the response from the array
    this.responses = this.responses.filter(item => item !== response);
    this.deleteResponseDialog = false;
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
  cancelEdit(response: any) {
    response.editing = false;
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
        this.forumId = +this.question.forum.forumId;
        
    
    this.forumService.getForumById(this.forumId).subscribe(
      (forum: Forum) => {
        this.forum = forum;
        console.log('Forum details:', this.forum);
      },
      (error) => {
        console.error('Error fetching forum details:', error);
      }
    );
    this.questionsService.SentimentAnalyzer(question.content).subscribe(
      (result: string) => {
        this.sentimentResult = result;
        console.log('Sentiment analysis result:', this.sentimentResult);
        // You can further process the result here, such as displaying it in the UI
      },
      (error: any) => {
        console.error('Error analyzing sentiment:', error);
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
    // Get a reference to the modal element
    var modal = document.getElementById('share-modal');
    
    // Add the 'is-active' class to the modal to show it
    modal.classList.add('is-active');
}
initModals(): void {
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalID = trigger.getAttribute('data-modal');
      const modal = document.getElementById(modalID);
      if (modal) {
        modal.classList.toggle('is-active');
      }
    });
  });

  const modalCloseTriggers = document.querySelectorAll('.modal-close, .close-modal');
  modalCloseTriggers.forEach(closeTrigger => {
    closeTrigger.addEventListener('click', () => {
      const activeModals = document.querySelectorAll('.modal.is-active');
      activeModals.forEach(modal => {
        modal.classList.remove('is-active');
      });
    });
  });
}
openReplyModal() {
  // Get a reference to the modal element
  var modal = document.getElementById('reply-modal');
  
  // Add the 'is-active' class to the modal to show it
  modal.classList.add('is-active');
}
async submitResponse() {
  this.response.accepted=true;
  // this.response.createdAt = new Date();
  this.response.question = {questionId : this.route.snapshot.paramMap.get('id')};
  this.response.reported=false;
  this.response.upvotes=0;
  // this.response.author = { id_user: 1, role: "User" };
  try {
    const newResponse = await this.responseService.createResponse(this.response).toPromise();
    console.log('New Response created:', newResponse);

    // // Load necessary scripts
    // // Fetch forums and close the dialog
    // this.forumDialog = false; 
    //window.location.reload();
    this.responses.push(newResponse);
    window.location.reload();
  } catch (error) {
    console.error('Error creating question:', error);
  }
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
fetchResponses(): void {
  const questionId = +this.route.snapshot.paramMap.get('id');
  // Fetch questions for the current forum ID
  this.responseService.getAllResponsesByQuestionId(questionId).subscribe(
    (responses: Response[]) => {
      this.responses = responses;
      responses.forEach(response => {
        if (!this.bestAnswer || response.upvotes > this.bestAnswer.upvotes )  {
          if(response.upvotes > 0){
          this.bestAnswer = response;
          }
    }});
      
      console.log('Responses :', this.responses);
    },
    (error) => {
      console.error('Error fetching questions:', error);
    }
  );
}
bestAnswer: any; // Variable to store the best answer

// findBestAnswer(): void {
//   let newBestAnswer: Response = null;
//   for (const response of this.responses) {
//     if (!newBestAnswer || response.upvotes > newBestAnswer.upvotes) {
//       newBestAnswer = response;
//     }
//   }
//   this.bestAnswer = newBestAnswer;
// }
findBestAnswer(): void {
  let newBestAnswer: Response = null;
  for (const response of this.responses) {
    console.log('Response:', response);
    if (!newBestAnswer || response.upvotes > newBestAnswer.upvotes) {
      newBestAnswer = response;
      console.log('New best answer found:', newBestAnswer);
    }
  }
  this.bestAnswer = newBestAnswer;
  console.log('Assigned best answer:', this.bestAnswer);
}

toggleActiveClass(action: string, event: MouseEvent, response: Response): void {
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
    this.upvoteResponse(response);
    response.upvotes++; // Increment upvotes by 1
    if (!this.bestAnswer || response.upvotes > this.bestAnswer.upvotes) {
      this.bestAnswer = response;
      localStorage.setItem('bestAnswerId', response.responseId.toString());
    }
  }else if (action === "dislike"){
   this.downvoteResponse(response);
    response.upvotes--; // Increment upvotes by 1
    if (this.bestAnswer && response.responseId === this.bestAnswer.responseId) {
      this.bestAnswer =null;
      localStorage.removeItem('bestAnswerId');
      // If the disliked response was the best answer, find the new best answer
      this.findBestAnswer();
    }
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

upvoteResponse(response: Response): void {
  this.responseService.upvoteResponse(response.responseId).toPromise();
}

downvoteResponse(response: Response): void {
  this.responseService.downvoteResponse(response.responseId).toPromise();

}



}

