import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PostService, Post } from 'src/app/services/post.service';
import BadWordsFilter from 'bad-words'; // Import BadWordsFilter library
import { UserModel } from 'src/app/models/userModel';



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
  selectedImage: any ;
  content: string;
  deletedPosts: any[] = [];
  //imageUrl:String;
  filter: any;
  user: UserModel;
  

  constructor(private postService: PostService, private formbuilder: FormBuilder,private http:HttpClient,) { }


  ngOnInit(): void {
    this.filter = new BadWordsFilter();
this.getUser();
    this.getAllPosts();
    this.postForm = this.formbuilder.group({
      image: [''],
      postDate: [''],
      content: ['']
    });
  }
  onImageSelected(event: any) {
    this.selectedImage=event.target.files[0];
   /* const file: File = event.target.files[0];
        this.post.image = file;

        // Preview the image
        const reader = new FileReader();
        reader.onload = () => {
            this.imageUrl = reader.result as string;
        };
        reader.readAsDataURL(file);*/
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


//  async addPost(): Promise<void> {
//     this.submitted = true;
//     try {
//         const newpost=await this.postService.addPost(this.content , this.selectedImage).toPromise();

//                 console.log("Post created Successfully");
//                 this.postDialog = false;
//                 this.posts.push(newpost);

//                 this.content='';
//                 //window.location.reload();
//     }catch (error){
//         console.error(error)
//     }
  //}
  async addPost(): Promise<void> {
    this.submitted = true;
    const filteredContent = this.filter.clean(this.content); // Filter out bad words
    try {
      const newpost = await this.postService.addPost(filteredContent, this.selectedImage).toPromise();
      console.log("Post created Successfully");
      this.posts.push(newpost);
      this.content = '';
      this.postDialog = false;
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

 /* deletePost(postId: number): void {
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
      },
      () => {
        this.getAllPosts(); // Reload posts after deletion
      }
    );
  }*/
  async deletePost(postId: number): Promise<void> {
    try {
      const deletedPostIndex = this.posts.findIndex(post => post.postId === postId);
      
      // If the post exists in the array
      if (deletedPostIndex !== -1) {
        const deletedPost = this.posts.splice(deletedPostIndex, 1)[0];
        this.deletedPosts.push(deletedPost); // Assuming there's a deletedPosts array to store deleted posts
      }
      
      // Close the delete confirmation modal
      this.deletePostDialog = false;
  
      // Delete the post from the server
      await this.postService.deletePost(postId).toPromise();
  
      // Optionally, you can display a success message here
      if (this.messageService) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Post Deleted Successfully', life: 3000 });
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      
      // Optionally, you can display an error message here
      if (this.messageService) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete post', life: 3000 });
      }
    }
  }
  

  confirmDelete(post: Post) {
    this.selectedPostId = post.postId;
    this.deletePostDialog = true;
  }
  updatePost(postId: number,content:string,selectedImage:File): void {
    this.selectedImage=selectedImage;
    this.content=content;

    this.submitted = true;
    try {
        this.postService.updateReward(postId, this.content, this.selectedImage).toPromise();
        console.log("Post updated Successfully");
        window.location.reload();
        // Handle success, e.g., show a success message to the user
    } catch (error) {
        console.error(error);
        // Handle error, e.g., show an error message to the user
    }
}
getUser(): void {
  this.postService.getUser().subscribe(
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



  editPost(postEdit: Post) {
     this.post = { ...postEdit };
    console.log(postEdit.content);
    this.content=postEdit.content;

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
