export interface IJwt {
    readonly validate: string;
    readonly secret: string;
    readonly issuer: string;
    readonly expiresIn: number;
}