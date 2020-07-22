import axios from 'axios'

//  axios 里面封装的有 promise 所以可以直接 返回一个 axios 实例 
export function request(options) {
    // 1.实例化
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:8000/api/n3',
        timeout: 5000
    })

    // 2. 请求拦截器 
    // instance.interceptors.request.use(拦截成功函数，拦截失败函数)
    instance.interceptors.request.use(config => {
            console.log('request 拦截成功');
            // 拦截成果之后需要返回 config
            return config
        }, err => {
            console.log('request 拦截失败');
            return err
        })
        // 响应拦截器
    instance.interceptors.response.use(config => {
            console.log('response success!');
            return config.data
        }, err => {
            console.log('response failed');
            return err
        })
        // 3.返回请求结果
    return instance(options)
}