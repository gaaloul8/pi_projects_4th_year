import { Component, OnInit } from '@angular/core';
import { PostService, Post } from 'src/app/services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-front',
  templateUrl: './post-front.component.html',
  styleUrls: ['./post-front.component.scss']
})
export class PostFrontComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getAllPosts();
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
}
