export interface MeetType {
    _id?: String,
    organiser: String,
    date: Date,
    location: String, 
    description: String,
    tags: [{}], 
    attendants: [{}],
}