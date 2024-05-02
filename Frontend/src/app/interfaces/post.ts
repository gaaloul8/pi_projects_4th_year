import { UserModel } from "../models/userModel";


export interface Post {
    postId?: number;
    image?: string;
    postDate?: Date;
    content?: string;
    user?: UserModel;
    likes?: number;
    likedByCurrentUser?: boolean;
    
    comments?: Comment[]; // Assuming you have a Comment model
  }
  