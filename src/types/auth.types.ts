// User types matching backend
export interface UserPayload {
    id: string;
    email: string;
    username: string;
    timezone: string;
}

export interface RegisterInput {
    email: string;
    username: string;
    password: string;
    timezone: string;
    name?: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: UserPayload;
    token: string;
}
