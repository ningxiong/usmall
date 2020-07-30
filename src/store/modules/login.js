import { requestGuanliyuanLogin } from '../../utils/request'

const state = {
    data : sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem("user")):null
}

const mutations = {
    changeData(state, json) {
        state.data = json
        if(json){
            sessionStorage.setItem('user',JSON.stringify(json))
        }else{
            sessionStorage.removeItem('user')
        }
    },

}
const actions = {
    changeDataAc(context,params) {
        requestGuanliyuanLogin(params).then(res => {
            context.commit('changeData',res.data)
        })
    },

}
const getters = {
    data(state) {
        return state.data
    },

}


export default {
    state, mutations, actions, getters,namespaced: true
}