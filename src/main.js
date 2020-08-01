import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import toast from './components/common/toast';

Vue.config.productionTip = false

//给bus一个 vue 实例，vue 实例可以初始化一个全局的事件总线
Vue.prototype.$bus = new Vue()

// 安装 toast 插件 use 方法本质是在调用 toast 对象的 install 方法
Vue.use(toast)
new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')