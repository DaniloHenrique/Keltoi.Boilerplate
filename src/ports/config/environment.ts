import type { ICors } from "./cors.js";
import type { IHttp } from "./http.js";
import type { IJwt } from "./jwt.js";

export interface IEnvironment {
    readonly environment: string;
    readonly http: IHttp;
    readonly cors: ICors;
    readonly jwt: IJwt;
}