import { createRouter, createWebHistory} from "vue-router";
import log from "./pages/LogPage/index.vue";
import register from "./pages/RegisterPage/index.vue";
import Cookie from "js-cookie";
import { errorTip } from "./tools";
import Main from './pages/MainPage/index.vue'
import HadFiles from './pages/MainPage/HadVoicePage.vue'
import UploadFile from "./pages/MainPage/recordVoicePage.vue";
import FileDetail from './pages/MainPage/DetailPage.vue'
import StatsScore from './pages/StatsScorsPage/index.vue'
const routes = [
	{
		path: "/",
		redirect: () => {
			if (Cookie.get("username")) {
				return { path: "/main/had" };
			}
			return { path: "/log" };
		},
	},
	{ path: "/log", component: log },
	{
		path: "/register",
		name: "register",
		component: register,
	},
	
	{
		path: "/main",
		name: "main",
		component: Main,
		register: () => {
			return { path: "main/had" };
		},
		children: [
			{
				path: "had",
				component: HadFiles,
			},
			{
				path: "record",
				component: UploadFile,
			},
			{
				path: "detail",
				component: FileDetail,
			},
			{
				path:'statsScore',
				component:StatsScore
			},
		],
	},
];
export const router = createRouter({
	history: createWebHistory('/h5/'),
	routes,
});

// 判断是否进行了登录
router.beforeEach((to, from, next) => {
	if (to.path.indexOf("main") !== -1 && !Cookie.get("username")) {
		errorTip("请进行登录");
		next({ path: "/log" });
	}
	next();
});
