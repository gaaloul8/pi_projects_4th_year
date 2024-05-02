import { Component, OnInit } from '@angular/core';
import { PostService, Post } from 'src/app/services/post.service';
import { CommonModule } from '@angular/common';
import { CommentService,Comment } from 'src/app/services/comment.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommentComponent } from '../comment/comment.component';



@Component({
  selector: 'app-post-front',
  templateUrl: './post-front.component.html',
  styleUrls: ['./post-front.component.scss']
})
export class PostFrontComponent implements OnInit {
  posts: Post[] = [];
  comments: Comment[] = [];
  likedPosts:number[]=[];
  liked:boolean=false;

  constructor(private postService: PostService,private commentService:CommentService,private modalService : BsModalService) { }

  ngOnInit(): void {
    this.loadLikedPosts();
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.postService.getAllPosts()
      .subscribe((response: Post[]) => {
        console.log('All posts:', response);
        this.posts = response;
        this.posts.forEach(post => {
          const postId = post.postId;
          const key = `likedPosts-${postId}`;
          const likedPosts = localStorage.getItem(key);
          post.likedByCurrentUser = likedPosts ? JSON.parse(likedPosts) : false;
          console.log("post id is " + postId + ", liked is " + post.likedByCurrentUser);
        });
      }, error => {
        console.error('Error fetching posts:', error);
      });
  }
  
  loadLikedPosts(): void {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || {};
    this.posts.forEach(post => {
      post.likedByCurrentUser = likedPosts[post.postId] || false;
    });
  }
  toggleLike(post: Post): void {
    // Toggle the like status for the current post
    post.likedByCurrentUser = !post.likedByCurrentUser;

    // Get liked posts from local storage or initialize as an empty array
     this.likedPosts = JSON.parse(localStorage.getItem('likedPosts'));

    // Check if the current post's ID is already in the liked posts array
    let found = false;
    for (let i = 0; i < this.likedPosts.length; i++) {
        if (this.likedPosts[i] === post.postId) {
            found = true;
            break;
        }
    }

    // If the post is liked, remove it from the liked posts array
    if (post.likedByCurrentUser && !found) {
      //this.likedPosts.push(post.postId);
      post.likes++;
      post.likedByCurrentUser = true;
      this.postService.likePost(post.postId).subscribe((response: Post) => {
        console.log('Post liked:', response);
      }), error => {
        console.error('Error liking post:', error);
      }
  } 
  // If the post is unliked and found in the array, remove it
  else if (!post.likedByCurrentUser && found) {
    post.likes--;
    post.likedByCurrentUser = false;
      const index = this.likedPosts.indexOf(post.postId);
      this.likedPosts.splice(index, 1);
      this.postService.dislikePost(post.postId).subscribe((response: Post) => {
        console.log('Post disliked:', response);
      }), error => {
        console.error('Error disliking post:', error);
      }
  }

    // Save the updated liked posts array back to local storage
    localStorage.setItem('likedPosts', JSON.stringify(this.likedPosts));
}
Toggleliked(post: Post): void {
  const key = `likedPosts-${post.postId}`;
  const likedPosts = localStorage.getItem(key);
  let liked = likedPosts ? JSON.parse(likedPosts) : false;

  if (!liked) {
    post.likes++;
    this.postService.likePost(post.postId).subscribe((response: Post) => {
      this.liked = true;
      localStorage.setItem(key, JSON.stringify(true)); // Save liked status in local storage
      post.likedByCurrentUser = true; // Update liked status immediately
      console.log("liked");
    });
  } else {
    post.likes--;
    this.postService.dislikePost(post.postId).subscribe((response: Post) => {
      this.liked = false;
      localStorage.setItem(key, JSON.stringify(false)); // Save unliked status in local storage
      post.likedByCurrentUser = false; // Update liked status immediately
    });
  }
}





  /*showComments(post: Post): void {
    // Call the comment service to get comments for the selected post
    this.commentService.getCommentsForPost(post.postId)
      .subscribe((comments: Comment[]) => {
        console.log('Comments for post:', comments);
        // Display the comments modal or any other UI logic here
        // For example, you could set a property in your component to hold the comments and use it to populate a modal
      }, error => {
        console.error('Error fetching comments for post:', error);
      });
  }*/
  showComments(post: Post): void {
    // Call the comment service to get comments for the selected post
    this.commentService.getCommentsForPost(post.postId)
      .subscribe((comments: Comment[]) => {
        console.log('Comments for post:', comments);
        // Set the comments to be displayed in the modal
        this.comments = comments;
        this.modalService.show(CommentComponent, { initialState: { comments: this.comments ,postId :post.postId } });
      }, error => {
        console.error('Error fetching comments for post:', error);
      });
  }
  calculateTimeAgo(createdAt: Date): string {
    // Calculate time difference in milliseconds
    const now = new Date().getTime();
    const created = new Date(createdAt).getTime();
    let difference = Math.abs(now - created);

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(difference / 3600000); // 1 hour = 3600000 ms
    difference -= hours * 3600000;
    const minutes = Math.floor(difference / 60000); // 1 minute = 60000 ms
    difference -= minutes * 60000;
    const seconds = Math.floor(difference / 1000); // 1 second = 1000 ms

    // Construct the time ago string
    let timeAgo = '';
    if (hours > 0) {
      timeAgo += `${hours} hour${hours > 1 ? 's' : ''}`;
    }
    if (minutes > 0) {
      timeAgo += ` ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    if (hours === 0 && minutes === 0) {
      timeAgo += ` ${seconds} second${seconds > 1 ? 's' : ''}`;
    }

    return timeAgo + ' ago';
  }


  




}
