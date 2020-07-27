import Vue from 'vue'
import Router from 'vue-router'





Vue.use(Router)

export default new Router({
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
          name:'管理员管理'
        },
        {
          path: 'caidan',
          component: ()=>import('../pages/caidan/caidan'),
          name:'菜单管理'
        },
        {
          path: 'juese',
          component: ()=>import('../pages/juese/juese'),
          name:'角色管理'
        },
        {
          path: 'banner',
          component: ()=>import('../pages/banner/banner'),
          name:'轮播图管理'
        },
        {
          path: 'huiyuan',
          component: ()=>import('../pages/huiyuan/huiyuan'),
          name:'会员管理'
        },
        {
          path: 'shopRules',
          component: ()=>import('../pages/shopRules/shopRules'),
          name:'商品规格管理'
        },
        {
          path: 'shopGuanli',
          component: ()=>import('../pages/shopGuanli/shopGuanli'),
          name:'商品管理'
        },
        {
          path: 'shopFenlei',
          component: ()=>import('../pages/shopFenlei/shopFenlei'),
          name:'商品分类'
        },
        {
          path: 'miaosha',
          component: ()=>import('../pages/miaosha/miaosha'),
          name:'秒杀活动'
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
