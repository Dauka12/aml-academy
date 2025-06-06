export interface Student {
    id?: number;
    firstname: string;
    lastname: string;
    middlename: string;
    iin: string;
    phone: string;
    university: string;
    email: string;
    password: string;
}

export interface RegisterStudentRequest {
    firstname: string;
    lastname: string;
    middlename: string;
    iin: string;
    phone: string;
    university: string;
    email: string;
    password: string;
    categoryId: number;
    studyYear: number;
}

export interface RegisterStudentResponse {
    success: boolean;
    message?: string;
}