import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import log from "./pages/LogPage/index.vue";
import register from "./pages/RegisterPage/index.vue";
import "element-plus/dist/index.css";
import {router} from './route'

createApp({
	template: `<router-view></router-view>`,
})
	.use(router)
	.mount("#app");
