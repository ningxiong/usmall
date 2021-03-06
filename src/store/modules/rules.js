import { requestRulesList, requestRulesCount } from '../../utils/request'

const state = {
    list: [],
    size: 2,
    page: 1,
    count: 0
}

const mutations = {
    changeList(state, arr) {
        arr.forEach(i => {
            i.attrs = JSON.parse(i.attrs)
        });
        state.list = arr
    },
    changePage(state, page) {
        state.page = page
    },
    changeCount(state, count) {
        state.count = count
    }
}
const actions = {
    changeListAc(context, bool) {
        var params = {}
        if (bool) {
            params = {}
        } else {
            params = {
                size: context.state.size,
                page: context.state.page
            }
        }
        requestRulesList(params).then(res => {
            if (res.data.list.length == 0 && context.state.page > 1) {
                context.commit('changePage', context.state.page - 1)
                context.dispatch('changeListAc')
                return
            }
            context.commit('changeList', res.data.list)
        })
    },
    changePageAc(context, page) {
        context.commit('changePage', page)
    },
    changeCountAc(context) {
        requestRulesCount().then(res => {
            context.commit('changeCount', res.data.list[0].total)
        })
    }
}
const getters = {
    list(state) {
        return state.list
    },
    size(state) {
        return state.size
    },
    count(state) {
        return state.count
    },

}


export default {
    state, mutations, actions, getters, namespaced: true
}