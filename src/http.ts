import axios from "axios";
import { ElMessage } from "element-plus";
const baseURL = "http://localhost:3000/test";

interface res {
	code: number;
	msg: string;
	data?: Object;
}
function http(
	method: "GET" | "POST",
	url: string,
	params: object
): Promise<res> {
	return new Promise((resolve, reject) => {
		axios({
			method,
			baseURL: "/test",
			url,
			headers: {
				"Content-Type": "text/plain;charset=UTF-8;application/json",
			},
			data: params,
			responseType: "json",
			responseEncoding: "utf8",
			withCredentials: false,
		})
			.then((res) => {
				if (res.data.code === 0 || res.status !== 200) {
					ElMessage.error(res.data.msg || "请求出错");
				}
				resolve(res.data);
			})
			.catch((err) => {
				ElMessage.error("请求出错");
				resolve({ code: 0, msg: "error" });
			});
	});
}

export const get = (url: string, params: object) => http("GET", url, params);
export const post = (url: string, params: object) => http("POST", url, params);
