export interface User {
    email: string;
    password: string;
}

export interface Note {
    note: string;
    _id?: string;
    isCompleted?: boolean;
}