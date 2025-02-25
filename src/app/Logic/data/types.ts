//LOGIN
export type LoginState = {
    errors?: {
        email?: string[];
        password?: string[];
        server?: string[];
    } | null;
    message?: string | null;
};




//SIGNUP
export type UserState = {
    errors?: {
        name?: string[];
        surname?: string[];
        userName?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];

        server?: string[];
    } | null;
    message?: string | null;
};


//REVIEWS
export interface Review {
    _id: string;
    content: string;
    rating: number;
    userId: {
        name: string;
        email: string;
        userName: string;
    };
}
