import { requestGuanliyuanLogin } from '../../utils/request'

const state = {
    data : {},
}

const mutations = {
    changeData(state, json) {
        state.data = json
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