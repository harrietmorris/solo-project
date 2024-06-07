export interface MeetType {
    _id?: string;
    organiser: string;
    date: Date;
    location: string;
    description: string;
    tags: Array<{key: string, value: boolean}>;
    attendants: string[];
}