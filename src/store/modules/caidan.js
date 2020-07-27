import { requestCaidan,requestCaidanInfo } from '../../utils/request'

const state = {
    caidan: [],
}

const mutations = {
    changeCaidan(state, arr) {
        state.caidan = arr
    },

}
const actions = {
    changeCaidanAc(context) {
        requestCaidan({istree:true}).then(res => {
            context.commit('changeCaidan',res.data.list)
        })
    },

}
const getters = {
    caidan(state) {
        return state.caidan
    },

}


export default {
    state, mutations, actions, getters,namespaced: true
}