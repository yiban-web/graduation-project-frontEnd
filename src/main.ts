import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import log from "./pages/LogPage/index.vue";
import register from './pages/RegisterPage.vue'
import 'element-plus/dist/index.css'

const routes = [
  { path: "/", redirect:()=>{
    return {path:'/log'}
  } },
  { path: "/log", component: log },
  {
    path:'/register',name:'register',component:register
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp({
  template: ` <router-view></router-view>`,
})
  .use(router)
  .mount("#app");
