import { ADD_COUNT, ADD_TO_CART } from './mutation-types';

export default {
    addCart(context, payload) {
        return new Promise((resolve) => {
            // playload 是新添加的商品
            // find 函数会将查找到的 product 信息返回给 oldProudct,否则返回 undefined
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            if (oldProduct) {
                context.commit(ADD_COUNT, oldProduct)
                resolve('商品数量 + 1')
            } else {
                payload.count = 1
                payload.isChecked = true
                context.commit(ADD_TO_CART, payload)
                resolve('添加商品成功')
            }
        })

    }
}