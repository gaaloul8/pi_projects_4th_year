export interface Reclamation {
    reclamationId: number;
    title: string;
    description: string;
    status: ReclamationStatus;
    createdBy: number;
    createdAt: Date;
    isArchived: boolean;
}

export enum ReclamationStatus {
    SUBMITTED = 'SUBMITTED',
    IN_PROGRESS = 'IN_PROGRESS',
    RESOLVED = 'RESOLVED'
}
