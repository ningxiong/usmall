import Vue from 'vue'
import Router from 'vue-router'

import store from '../store/modules/login'


function havePower(url){
  return store.state.data.list.menus_url.some(item=>item==url)
}

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/login',
      component: ()=>import('../pages/login/login')
    },
    {
      path: '/index',
      component: ()=>import('../pages/index/index'),
      children: [
        {
          path: 'home',
          component: ()=>import('../pages/home/home'),
        },
        {
          path: 'guanliyuan',
          component: ()=>import('../pages/guanliyuan/guanliyuan'),
          name:'管理员管理',
          beforeEnter(to,from,next){
            havePower('/index/guanliyuan')?next():next('/index')
          }
        },
        {
          path: 'caidan',
          component: ()=>import('../pages/caidan/caidan'),
          name:'菜单管理',
          beforeEnter(to,from,next){
            havePower('/index/caidan')?next():next('/index')
          }
        },
        {
          path: 'juese',
          component: ()=>import('../pages/juese/juese'),
          name:'角色管理',
          beforeEnter(to,from,next){
            havePower('/index/juese')?next():next('/index')
          }
        },
        {
          path: 'banner',
          component: ()=>import('../pages/banner/banner'),
          name:'轮播图管理',
          beforeEnter(to,from,next){
            havePower('/index/banner')?next():next('/index')
          }
        },
        {
          path: 'huiyuan',
          component: ()=>import('../pages/huiyuan/huiyuan'),
          name:'会员管理',
          beforeEnter(to,from,next){
            havePower('/index/huiyuan')?next():next('/index')
          }
        },
        {
          path: 'shopRules',
          component: ()=>import('../pages/shopRules/shopRules'),
          name:'商品规格管理',
          beforeEnter(to,from,next){
            havePower('/index/shopRules')?next():next('/index')
          }
        },
        {
          path: 'shopGuanli',
          component: ()=>import('../pages/shopGuanli/shopGuanli'),
          name:'商品管理',
          beforeEnter(to,from,next){
            havePower('/index/shopGuanli')?next():next('/index')
          }
        },
        {
          path: 'shopFenlei',
          component: ()=>import('../pages/shopFenlei/shopFenlei'),
          name:'商品分类',
          beforeEnter(to,from,next){
            havePower('/index/shopFenlei')?next():next('/index')
          }
        },
        {
          path: 'miaosha',
          component: ()=>import('../pages/miaosha/miaosha'),
          name:'秒杀活动',
          beforeEnter(to,from,next){
            havePower('/index/miaosha')?next():next('/index')
          }
        },
        {
          path:'',
          redirect:'/index/home'
        }
      ]
    },
    {
      path:'*',
      redirect:'/login'
    }
  ]
})

router.beforeEach((to, from, next) => {

  if(to.path=="/login"){
    next()
    return;
  }

  if(store.state.data){
    next();
    return;
  }
  next("/home")
})


export default router