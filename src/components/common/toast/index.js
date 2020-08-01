import Toast from './Toast';
const obj = {}

//install 默认传入一个参数 Vue，不需要再 import Vue
obj.install = function(Vue) {
    // console.log(Vue);
    // 1. 创建组建的构造器
    const toastContrustor = Vue.extend(Toast);

    // 2.new 的方式，根据组件的构造器，可以创造出来一个组件对象
    const toast = new toastContrustor();

    // 3.将组件对象 手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))

    // 4.toast.$el 对应的就是 div
    document.body.appendChild(toast.$el)

    // 5 $toast 添加到 Vue 原型
    Vue.prototype.$toast = toast
}
export default obj