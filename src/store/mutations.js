import { ADD_COUNT, ADD_TO_CART } from './mutation-types';

export default {
    // addCart(state, payload) {
    //     // playload 是新添加的商品
    //     // find 函数会将查找到的 product 信息返回给 oldProudct,否则返回 undefined
    //     let oldProduct = state.cartList.find(item => item.iid === payload.iid)
    //     if (oldProduct) {
    //         oldProduct.count++
    //     } else {
    //         payload.count = 1
    //         state.cartList.push(payload)
    //     }
    // }
    [ADD_COUNT](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        state.cartList.push(payload)
    }
}