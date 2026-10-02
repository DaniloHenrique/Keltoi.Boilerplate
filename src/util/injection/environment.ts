import { IEnvironment } from "../../ports/config";

const env:IEnvironment = {
    environment: process.env.NODE_ENV || "development",
    http: {
        port: parseInt(process.env.PORT  || "3000"),
        host: process.env.HOST || "localhost"
    },
    cors: {
        origin: process.env.CORS_ORIGIN || "*",
        methods: process.env.CORS_METHODS || "GET,POST,PUT,DELETE,OPTIONS",
        allowedHeaders: process.env.CORS_ALLOWED_HEADERS || "*"
    },
    jwt: {
        validate: process.env.JWT_VALIDATE || "true",
        secret: process.env.JWT_SECRET || "bA2xcjpf8y5aSUFs2o5tNus7tBuRNHNo",
        issuer: process.env.JWT_ISSUER || "Keltoi.Tech",
        expiresIn: parseInt(process.env.JWT_EXPIRES_IN || "300")
    }
}

export default env;