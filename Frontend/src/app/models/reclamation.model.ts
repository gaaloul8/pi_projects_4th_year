import {UserModel} from "./userModel";

export interface Reclamation {
    clubName: string;
    submittedTo: UserModel;
    reclamationId: number;
    title: string;
    description: string;
    status: ReclamationStatus;
    createdBy: number;
    createdAt: Date;
    isArchived: boolean;
    imageUrl: string;
}

export enum ReclamationStatus {
    SUBMITTED = 'SUBMITTED',
    IN_PROGRESS = 'IN_PROGRESS',
    RESOLVED = 'RESOLVED'
}
