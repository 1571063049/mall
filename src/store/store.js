import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//1.安装插件
Vue.use(Vuex)

//2.创建Store对象并挂载
const state = {
    CartList: []
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
})