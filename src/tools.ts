import { ElMessage } from "element-plus";

export const successTip = (msg: string) =>
	ElMessage({
		message: msg,
		type: "success",
	});

export const errorTip = (msg: string) => ElMessage.error(msg);
