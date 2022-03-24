import { post,get } from "../../http";

export const uploadApi = (params: object) => post("/upload", params);

export const haveFilesNum = ()=>get('/haveFilesNum',{})