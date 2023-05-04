export class ValidationError extends Error{
    
    status: number;

    constructor(message: string){
        super(message);
        this.name = "ValidationError"
        this.status = 400
    }
}

export class AuthenticationError extends Error{
    
    status: number;

    constructor(message: string){
        super(message);
        this.name = "AuthenticationError"
        this.status = 400
    }
}