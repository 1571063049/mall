<template>
  <div id="cart">
    <nav-bar class="cart_nav">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <scroll  ref="bscroll" :probeType="0" :pullUpLoad="true" class="content">
       <cart-list></cart-list>
    </scroll>
    <cart-total/>
  </div>
</template>

<script>
import CartList from './childcomps/CartList.vue'
import CartTotal from './childcomps/CartTotal.vue'


import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

import { mapGetters } from 'vuex'
export default {
  naem: "Cart",
  components:{
    CartList,
    CartTotal,

    NavBar,
    Scroll,
  },
  computed:{
    //mapGetters 辅助函数
    // mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
    //写法一
    // ...mapGetters(['cartListlength','carList'])
    //写法二
    ...mapGetters({
      length:'cartListlength',
      // list:'carList'
    })

    //普通计算属性
    // CartListLength(){
    //   // return this.$store.state.CartList.length
    //   return this.$store.getters.cartListlength
    // }

  },
  methods:{
  },
  activated(){
    this.$refs.bscroll.refresh();
  }
};
</script>

<style scoped> 
#cart{
  height: 100vh;
}
.cart_nav{
  background-color: var(--color-tint);
  color: #fff;

}
.content{
  height: calc(100% - 44px - 40px - 49px);
  overflow: hidden;
}
</style>