import { post } from "../../http";

export const logInApi = (params: object) => post("/login", params);
