export enum Role {
    User = 'User',
    Admin = 'Admin',
    ClubManager = 'ClubManager'
}

export interface UserModel {
    id_user?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: Role;
    profilePicture?: string;
    identifiant?: string;
    niveau?: string;
}
