export interface MeetType {
    // _id?: string;
    organiser: string;
    date: Date;
    location: string;
    description: string;
    tags: string[];
    attendants: string[];
}