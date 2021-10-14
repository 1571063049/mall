import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/store.js'
import toast from 'components/common/toast'

Vue.config.productionTip = false

//安装toast插件
Vue.use(toast);

//添加事件总线对象
Vue.prototype.$bus = new Vue()

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')