import { createRouter, createWebHashHistory } from "vue-router";
import log from "./pages/LogPage/index.vue";
import register from "./pages/RegisterPage/index.vue";
import Cookie from 'js-cookie'
import { errorTip } from "./tools";
const routes = [
	{
		path: "/",
		redirect: () => {
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
		component: import("./pages/MainPage/index.vue"),
    register:()=>{
      return {path:'main/had'}
    },
		children: [
			{
				path: "had",
				component: import("./pages/MainPage/HadVoicePage.vue"),
			},
			{
				path: "record",
				component: import("./pages/MainPage/recordVoicePage.vue"),
			},
			{
				path: "detail",
				component: import("./pages/MainPage/DetailPage.vue"),
			},
		],
	},
];
export const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

// 判断是否进行了登录
router.beforeEach((to,from,next)=>{
    if(to.path.indexOf('main')!==-1&&!Cookie.get('username')){
        errorTip('请进行登录')
        next({path:'/log'})
    }
    next()
})