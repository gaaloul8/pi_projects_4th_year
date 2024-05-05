import { UserModel } from "../models/userModel";
import { Post } from "./post";
;

export interface Comment {
    commentId?: number;
    date?: Date;
    content?: string;
    user?: UserModel;
    post?: Post;
    isEditing?: boolean; 

  }
  