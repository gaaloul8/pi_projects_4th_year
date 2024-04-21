export enum Role {
    User = "User",
    Admin = "Admin",
    ClubManager = "ClubManager"
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string; // Consider not including sensitive data like passwords in front-end models
    registrationDate: Date;
    lastLogin: Date;
    status: string; // This might be better as an enum if there are a set number of statuses
    role: Role;
}
