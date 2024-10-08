import { UserModel } from "../models/userModel";

export interface Club{
  clubId?: number;
  
  clubName?: string;
  // manager?: User; // Assuming User interface is defined elsewhere
  description?: string;
  membershipCount?: number;
  tag?: string;
  image?: any;
  user?: UserModel;
}
