import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PostService, Post } from 'src/app/services/post.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  postForm: FormGroup;
  postDialog: boolean = false;
  submitted: boolean = false;
  post: Post = {};
  deletePostDialog: boolean = false;
  selectedPostId: number;
  messageService: MessageService;
  showConfirmation: boolean = false;
  selectedImage: string | ArrayBuffer | null = null;

  constructor(private postService: PostService, private formbuilder: FormBuilder) { }
  chooseImage() {
    document.getElementById('imageInput')?.click();
  }

  ngOnInit(): void {
    this.getAllPosts();
    this.postForm = this.formbuilder.group({
      image: [''],
      postDate: [''],
      content: ['']
    });
  }
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  getAllPosts(): void {
    this.postService.getAllPosts()
      .subscribe((response: Post[]) => {
        console.log('All posts:', response);
        this.posts = response;
      }, error => {
        console.error('Error fetching posts:', error);
      });
  }

  addPost(): void {
    this.submitted = true;
    try {
      this.postService.addPost(this.post).toPromise();
      console.log("Post created Successfully");
      this.postDialog = false;
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  openNew() {
    this.post = {};
    this.submitted = false;
    this.postDialog = true;
  }

  hideDialog() {
    this.postDialog = false;
    this.submitted = false;
  }

  deletePost(postId: number): void {
    this.postService.deletePost(postId).subscribe(
      () => {
        if (this.messageService) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Post Deleted Successfully', life: 3000 });
        }
        // Update the posts array without reloading the page
        this.posts = this.posts.filter(post => post.postId !== postId);
        this.deletePostDialog = false;
      },
      error => {
        console.error('Error deleting post:', error);
        if (this.messageService) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete post', life: 3000 });
        }
        this.deletePostDialog = false;
      }
    );
  }

  confirmDelete(postId: number) {
    this.selectedPostId = postId;
    this.deletePostDialog = true;
  }

  updatePost(post: Post) {
    this.showConfirmation= true;
    this.postService.updatePost(post).subscribe(
      
      updatedPost => {
        console.log('Post updated:', updatedPost);
        // Success: Handle the updated response if necessary
      },
      error => {
        console.error('Error updating post:', error);
        // Error: Handle errors if necessary
      }
    );
  }

  editPost(postEdit: Post) {
    this.post = { ...postEdit };
    this.postDialog = true;
  }

  showDialogToAdd(): void {
    this.postForm.reset();
    this.postDialog = true;
  }
  cancelUpdate(): void {
    // Close the confirmation dialog
    this.showConfirmation = false;
    
  }
  confirmUpdate(): void {
    // Close the confirmation dialog
    this.showConfirmation = false;
    this.postDialog = false;
    // Call the updateClubService to update the club
    this.postService.updatePost(this.post).subscribe(
      updatedClub => {
        console.log('Post updated:', updatedClub);
        this.postDialog = false;
        // Optionally, perform any other actions upon successful update
      },
      error => {
        console.error('Error updating Post:', error);
        // Optionally, display an error message or perform any other error handling
      }
    );
  }
}
