import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommentService,Comment } from 'src/app/services/comment.service';



@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit{
  comments: Comment[] = [];
  commentForm: FormGroup;
  commentDialog: boolean = false;
  submitted: boolean = false;
  comment: Comment = {};
  deleteCommentDialog: boolean = false;
  selectedCommentId: number;
  messageService: MessageService;

  constructor(private commentService: CommentService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllComments();
    this.commentForm = this.formbuilder.group({
      content: ['']
    });
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

  addComment(postId: number): void {
    this.submitted = true;
    this.commentService.addComment(this.comment.content, postId).subscribe(
      response => {
        console.log("Comment added Successfully");
        this.commentDialog = false;
        this.submitted = false; // Reset the submitted flag
        this.comment = {}; // Clear the comment object
        this.getAllComments(); // Refresh the comments list
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Comment added successfully', life: 3000 });
      },
      error => {
        console.error('Error adding comment:', error);
        // Handle error appropriately, e.g., show error message
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add comment', life: 3000 });
      }
    );
  }
  

  updateComment(comment: Comment): void {
    this.commentService.updateComment(comment).subscribe(
      () => {
        console.log("Comment updated Successfully");
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Comment updated successfully', life: 3000 });
      },
      error => {
        console.error('Error updating comment:', error);
        // Handle error appropriately, e.g., show error message
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update comment', life: 3000 });
      }
    );
  }

  deleteComment(commentId: number): void {
    this.commentService.deleteComment(commentId).subscribe(
      () => {
        console.log("Comment deleted Successfully");
        this.comments = this.comments.filter(comment => comment.commentId !== commentId); // Remove the deleted comment from the list
        this.deleteCommentDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Comment deleted successfully', life: 3000 });
      },
      error => {
        console.error('Error deleting comment:', error);
        // Handle error appropriately, e.g., show error message
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete comment', life: 3000 });
      }
    );
  }
  


}

