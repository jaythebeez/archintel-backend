export class ValidationError extends Error {
    status;
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.status = 400;
    }
}
export class AuthenticationError extends Error {
    status;
    constructor(message) {
        super(message);
        this.name = "AuthenticationError";
        this.status = 400;
    }
}
//# sourceMappingURL=error.js.map