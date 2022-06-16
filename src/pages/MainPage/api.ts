import { post, get } from "../../http";

export const uploadApi = (params: object) => post("/upload", params);

export const haveFilesNum = () => get("/haveFilesNum", {});

export const getFilesList = (params: object) => post("/getFilesList", params);

export const getFilesDetail = (params: object) =>
	post("/getFileDetail", params);

export const deleteFile = (params: object) => post("/deleteFile", params);

export const readTextFile = (params: object) => post("/readTextFile", params);


export const countGrade = (params:object)=>post(`/countGrade`,params)

export const selectFiles =  (params:any)=>get(`/selectFiles?name=${params?.fileName}`,{})

export const reFileName = (params:object)=>post(`/reFileName`,params)

export const reExamFile = (params:any)=>get(`/reExam?id=${params?.id}`,{})