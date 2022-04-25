import { post, get } from "../../http";

export const statsCount = (params: object) => get("/statsCount", params);