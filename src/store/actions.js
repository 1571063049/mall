import { reject, resolve } from 'core-js/fn/promise';
import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-types'

export default {
    addCart(context, payload) {
        //判断对象是否在数组中的方法
        // 法一
        return new Promise((resolve, reject) => {
            // 1.查找之前数组中是否有该商品
            let oldProduct = context.state.CartList.find(item => item.id === payload.id)

            //2.判断oldProduct
            if (oldProduct) {
                // oldProduct.count += 1;
                context.commit(ADD_COUNTER, oldProduct);
                resolve('当前商品数量加一');
            } else {
                payload.count = 1;
                // context.state.CartList.push(payload);
                context.commit(ADD_TO_CART, payload);
                resolve('添加购物车成功');
            };
        })
    },
    //方法二、三
    addCart1(state, payload) {
        // 法二
        let oldProduct = null;
        for (let item in state.CartList) {
            if (item.id === payload.id) {
                oldProduct = item
            }
        };
        if (oldProduct) {
            oldProduct.count += 1;
        } else {
            payload.count = 1;
            state.CartList.push(payload);
        }

        // 法三
        // let oldProduct = null;
        // let index = state.CartList.indexOf(payload)

        // if (index === -1) {
        //     oldProduct = state.CartList[index]
        //     oldProduct.count += 1;
        // } else {
        //     payload.count = 1;
        //     state.CartList.push(payload)
        // }
    }
}