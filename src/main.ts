import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import log from "./pages/LogPage/index.vue";
import register from './pages/RegisterPage.vue'
import main from './pages/LookHadVoicePage/index.vue'
import 'element-plus/dist/index.css'

// 路由
const routes = [
  { path: "/", redirect:()=>{
    return {path:'/log'}
  } },
  { path: "/log", component: log },
  {
    path:'/register',name:'register',component:register
  },
  {
    path:'/main',name:'main',component:import('./pages/MainPage/index.vue'),children:[
      {
        path:'had',
        component:import('./pages/MainPage/HadViocePage.vue')
      },
      {
        path:'record',
        component:import('./pages/MainPage/recordVoicePage.vue')
      }
    ]
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
