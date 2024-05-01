export interface  AuthResponse{
    jwtaccestoken?: string;
    jwtRefreshtoken?: string;
    firstLogin?: boolean;
    failedLoginAttempts?: number;
    userLocked?: boolean;
    role?: String;
}
