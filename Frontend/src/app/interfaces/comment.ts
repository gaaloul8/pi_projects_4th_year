import { Post } from "./post";

export interface Comment {
    commentId?: number;
    //date?: Date;
    content?: string;
    post?: Post; // Assuming you have a Post model
  }
  