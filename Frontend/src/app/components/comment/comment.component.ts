import { User } from './../../services/forum.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommentService,Comment } from 'src/app/services/comment.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PostService } from 'src/app/services/post.service';
import { UserModel } from 'src/app/models/userModel';



@Component({
  selector: 'app-comment',
  
  
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit{
  comments: Comment[] = [];
  commentForm: FormGroup;
  myvarPost:any;
  commentDialog: boolean = false;
  submitted: boolean = false;
  comment: Comment = {};
  deleteCommentDialog: boolean = false;
  selectedCommentId: number;
  messageService: MessageService;
  editedComments: { [key: number]: string } = {}; // Object to store edited comment texts
  user:UserModel;

  constructor(private commentService: CommentService,private postService : PostService, private formbuilder: FormBuilder,public bsModalRef: BsModalRef) { }
  postId: number;
  

  ngOnInit(): void {
    this.getUser();
   // this.getCommentsForPost(1);
   
    
    this.commentForm = this.formbuilder.group({
      content: ['']
    });
  }

  calculateTimeAgo(createdAt: Date): string {
    // Calculate time difference in milliseconds
    const now = new Date().getTime();
    const created = new Date(createdAt).getTime();
    let difference = Math.abs(now - created);

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    difference -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(difference / (1000 * 60 * 60));
    difference -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(difference / (1000 * 60));
    difference -= minutes * (1000 * 60);
    const seconds = Math.floor(difference / 1000);

    // Construct the time ago string
    let timeAgo = '';
    if (days > 0) {
      timeAgo += `${days} day${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      timeAgo += `${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      timeAgo += `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
      timeAgo += `${seconds} second${seconds > 1 ? 's' : ''}`;
    }

    return timeAgo + ' ago';
}

  getAllComments(): void {
    this.commentService.getAllComments()
      .subscribe((response: Comment[]) => {
        console.log('All comments:', response);
        this.comments = response;
      }, error => {
        console.error('Error fetching comments:', error);
      });
  }
  closeModal(): void {
    this.bsModalRef.hide();
  }

  async addComment(): Promise<void> {
   
    if (!this.postId) {
      console.error('postId is not defined');
      return;
    }
    this.submitted = true;
    this.commentDialog = false;
    this.submitted = false; // Reset the submitted flag
    //  // Clear the comment object
    this.getCommentsForPost(this.postId); // Refresh the comments list
    
    const content1=await this.commentService.addComment(this.comment.content, this.postId).toPromise(
    
    
    );
    
    this.comments.push(content1);
    console.log(content1);
    this.comment = {};
  }
  
  editComment(comment: Comment): void {
    // Toggle the editing state
    comment.isEditing = true;

    this.editedComments[comment.commentId] = comment.content;

    
  }

  saveEditedComment(comment: Comment): void {
    // Retrieve the new text for the comment
    // Assign the new text to the comment object
        const newText = this.editedComments[comment.commentId];
    comment.content = newText;
    this.postService.getPostById(this.postId).subscribe(data=>{
      this.myvarPost=data;
     

      comment.post=this.myvarPost;
      
      
      this.commentService.newupdateComment(comment.commentId,comment)
      .subscribe(updatedComment => {
       console.log("updated comment ",updatedComment);
        

          // Find the index of the edited comment in the comments array
          const index = this.comments.findIndex(c => c.commentId === updatedComment.commentId);
          if (index !== -1) {
              // Update the comment in the comments array with the updated data
              this.comments[index] = updatedComment;
          }
          // Toggle off the editing state
          comment.isEditing = false;
          // Hide the edit input field and the "Save" button
          //delete this.editedComments[comment.commentId]; // Remove the edited comment from the editedComments object
      });

    })
   
   
  }
  updateComment(comment: Comment): void {
    

    this.commentService.updateComment(comment).subscribe(
      () => {
        console.log("Comment updated Successfully");        
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa",comment);


        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Comment updated successfully', life: 3000 });
      },
      error => {
        console.error('Error updating comment:', error);
        // Handle error appropriately, e.g., show error message
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update comment', life: 3000 });
      }
    );
  }

  async deleteComment(commentId: number): Promise<void> {
    try {
        await this.commentService.deleteComment(commentId).toPromise();
        // Find the index of the comment to be deleted
        const index = this.comments.findIndex(comment => comment.commentId === commentId);
        // If the comment is found, remove it from the array
        if (index !== -1) {
            this.comments.splice(index, 1);
        }
    } catch (error) {
        console.error("Error deleting comment:", error);
    }
}

  
  getCommentsForPost(postId: number): void {
    this.commentService.getCommentsForPost(postId).subscribe(
      (response: Comment[]) => {
        console.log('Comments for post:', response);
        this.postId=postId;
        this.comments = response; // Assign the comments for the specified post to the comments array
      },
      error => {
        console.error('Error fetching comments for post:', error);
      }
    );
  }

  getUser(): void {
    this.commentService.getUser().subscribe(
      (response: UserModel) => {
        this.user = response;
        console.log('User:', this.user.id_user);
        console.log('User:', response);
      },
      error => {
        console.error('Error fetching user:', error);
      }
    );
  }
  
  


}

