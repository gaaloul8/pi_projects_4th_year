import { Component, OnInit,AfterViewInit, Renderer2 } from '@angular/core';
import { Forum, ForumService } from '../../services/forum.service';
import { MessageService } from 'primeng/api';




@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['../../../assets/scss/core.scss'
  ],
  // providers: [MessageService]
})
export class ForumComponent implements AfterViewInit {
  forums: Forum[] = [];
  forumDialog: boolean = false;
  forum: Forum = {};
  deleteForumDialog: boolean = false;
  submitted: boolean = false;
  selectedForumId: number;
  messageService : MessageService;
  showDropdown: boolean = false;
  statuses: any[] = [];
  isLiked: boolean = false;



  constructor(private renderer: Renderer2, private forumService: ForumService) { 
 }
 ngAfterViewInit(): void {
  setTimeout(() => {
    this.loadJsFiles();
  }, 100);
  this.fetchForums();
  this.loadLikedStates();
}

loadJsFiles(): void {
  this.loadJsFile("../../../../assets/js/common.js");
  this.loadJsFile("../../../../assets/js/global.js");
  this.loadJsFile("../../../../assets/js/main.js");
}

  openNew() {
    this.forum = {};
    this.submitted = false;
    this.forumDialog = true;
    this.showDropdown = false;
}

confirmDeleteForum() {
  this.forumService.deleteForum(this.selectedForumId).subscribe(
    () => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Forum Deleted Successfully', life: 3000 });
    },
    (error) => {
      console.error('Error deleting forum:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete forum', life: 3000 });
    }
  );
  this.deleteForumDialog = false;
  window.location.reload();

}
confirmDelete(forumId: number){
  this.selectedForumId = forumId;
  this.deleteForumDialog = true;
}

editForum(forum: Forum) {
  this.showDropdown = true;
  this.forum = { ...forum };
  console.log(forum);
  this.forumDialog = true;
  this.statuses = [
    { label: 'OPEN', value: false },
    { label: 'CLOSED', value: true },
];
}
onOptionClick(event: Event) {
  event.stopPropagation(); // Prevent event propagation to keep the dropdown open
}

  fetchForums(): void {
    this.forumService.getAllForums().subscribe(
      (forums: Forum[]) => {
        this.forums = forums;
        console.log('Forums:', this.forums);
      },
      (error) => {
        console.log('Error fetching forums:', error);
      }
    );
  }
  hideDialog() {
    this.forumDialog = false;
    this.submitted = false;
    this.showDropdown = false;
}
// resetComponentState(): void {
//   this.ngOnInit();
// }


async saveForum() {
  this.submitted = true;

  console.log("topic : " + this.forum.topic + " content : " + this.forum.content);

  this.forum.forumOwner = { id_user: 3, role: "ClubManager" }; 
  if(this.showDropdown = false){
  this.forum.createdAt = new Date(); 
  this.forum.closed = false;
  this.forum.likes = 0;
  }

  try {
    const newForum = await this.forumService.createForum(this.forum).toPromise();
    console.log('New forum created:', newForum);

    // Load necessary scripts
    // Fetch forums and close the dialog
    this.forumDialog = false; 
    window.location.reload();
  } catch (error) {
    console.error('Error creating forum:', error);
  }
}


  openClosedForumDialog(): void {
    const isConfirmed = window.confirm('This forum is closed. You cannot enter.');
    if (!isConfirmed) {
      // Optionally handle the cancel action
    }
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
  toggleLike(forum: Forum): void {
    const forumId = forum.forumId.toString(); // Assuming forumId is unique and can be converted to string
    const isLikedString = localStorage.getItem(`forumLiked_${forumId}`);
    let isLiked = isLikedString ? JSON.parse(isLikedString) : false;
    
    if (!isLiked) {
      this.likeForum(forum);
      console.log("liked");
    } else {
      this.dislikeForum(forum);
      console.log("disliked");
    }
  
    forum.isLiked = !isLiked; // Update the isLiked property of the forum
    localStorage.setItem(`forumLiked_${forumId}`, JSON.stringify(forum.isLiked)); // Store the updated liked state in Local Storage
  }
  
  loadLikedStates(): void {
    this.forums.forEach(forum => {
      const forumId = forum.forumId.toString(); // Assuming forumId is unique and can be converted to string
      const isLikedString = localStorage.getItem(`forumLiked_${forumId}`);
      forum.isLiked = isLikedString ? JSON.parse(isLikedString) : false; // Retrieve the liked state from Local Storage and store it in the isLiked property
    });
  }
  
  


  likeForum(forum: Forum): void {
    this.forumService.likeForum(forum.forumId).subscribe(
      (updatedForum: Forum) => {
        forum.likes = updatedForum.likes;
        this.isLiked = true;
      },
      (error) => {
        console.error('Error liking forum:', error);
      }
    );
  }

  dislikeForum(forum: Forum): void {
    this.forumService.dislikeForum(forum.forumId).subscribe(
      (updatedForum: Forum) => {
        forum.likes = updatedForum.likes;
        this.isLiked = false;
      },
      (error) => {
        console.error('Error disliking forum:', error);
      }
    );
  }
}
