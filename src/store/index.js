import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { state,mutations,getters } from './mutations'
import actions from './actions'
import caidan from './modules/caidan'
import juese from './modules/juese'
import guanliyuan from './modules/guanliyuan'
import login from './modules/login'
import fenlei from './modules/fenlei'
import rules from './modules/rules'
import huiyuan from './modules/huiyuan'
import guanli from './modules/guanli'
import banner from './modules/banner'
import miaosha from './modules/miaosha'

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        caidan,
        juese,
        guanliyuan,
        login,
        fenlei,
        rules,
        huiyuan,
        guanli,
        banner,
        miaosha,
    }
})