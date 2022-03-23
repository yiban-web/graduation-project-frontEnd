import { post } from "../../http";

export const registerApi = (params: object) => post("/register", params);
