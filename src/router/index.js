import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'


Vue.use(VueRouter)



const router = new VueRouter({
  routes: [
    // 路由重定向
      {path:'/',redirect: '/login'},
      {path:'/login', component: login},
      {path:'/home', component: home},

  ]
})

router.beforeEach((to, from,  next)  =>  {
  //to 将要访问的路径
  //from 代表从那个路径跳转而来
  //next是一个放行函数
  // next() 放行  next('/login')强制跳转
  
  if(to.path === '/login') return next()
  //获取token
  const  tokenStr = sessionStorage.getItem('token');
  if(!tokenStr) return next('/login');
  next();
})

export default router;