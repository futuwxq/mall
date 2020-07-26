import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false
    //给bus一个 vue 实例，vue 实例可以初始化一个全局的事件总线
Vue.prototype.$bus = new Vue()
new Vue({
    render: h => h(App),
    router
}).$mount('#app')