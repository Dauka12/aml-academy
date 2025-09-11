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
    organization: string; // переименовал university в organization
    email: string;
    password: string;
    categoryId: number;
    regionId: number; // добавил regionId
    studyYear: number;
}

export interface RegisterStudentResponse {
    success: boolean;
    message?: string;
}