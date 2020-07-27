// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false


//引入vuex仓库
import store from './store'

//全局过滤器
import filrers from './filter'
for(let i in filrers){
  Vue.filrer(i,filrers[i])
}
//全局组件
import commonCom from './components'
for(let i in commonCom){
  Vue.component(i,commonCom[i])
}


//引入element框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)


router.beforeEach((to, from, next) => {
  // 登录成功-设置一个标记，作为是否登录的标记
  //每去一个路由，先验证去的路径是不是登录；如果去登录，next()
  //去的如果不是登录页面，验证标记有没有。有-next()  ,没有-next("/login")

  if(to.path=="/login"){
    next()
    return;
  }

  var isLogin=localStorage.getItem("islogin");
  if(isLogin){
    next();
    return;
  }
  next("/login")
})


Vue.prototype.$imgPre = 'http://localhost:3000'

import './assets/css/reset.css'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
