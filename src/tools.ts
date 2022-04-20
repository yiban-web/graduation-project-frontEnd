import { ElMessage } from "element-plus";
import { ElLoading } from 'element-plus'

export const successTip = (msg: string) =>
	ElMessage({
		message: msg,
		type: "success",
	});

export const errorTip = (msg: string) => ElMessage.error(msg);

export const loading = (msg:string)=> ElLoading.service({ fullscreen: true ,text:msg})
