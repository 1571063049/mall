<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="#1afa29">
      <img src="~assets/images/tabbar/首页.png" alt="" slot="item-icon" />
      <img
        src="~assets/images/tabbar/首页_active.png"
        alt=""
        slot="item-icon-active"
      />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="#1afa29">
      <img src="~assets/images/tabbar/分类.png" alt="" slot="item-icon" />
      <img
        src="~assets/images/tabbar/分类_active.png"
        alt=""
        slot="item-icon-active"
      />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="#1afa29">
      <img src="~assets/images/tabbar/购物车.png" alt="" slot="item-icon" />
      <img
        src="~assets/images/tabbar/购物车_active.png"
        alt=""
        slot="item-icon-active"
      />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="#1afa29">
      <img src="~assets/images/tabbar/我的.png" alt="" slot="item-icon" />
      <img
        src="~assets/images/tabbar/我的_active.png"
        alt=""
        slot="item-icon-active"
      />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar.vue";
import TabBarItem from "components/common/tabbar/TabBarItem.vue";
export default {
  name: "MainTabBar",
  components: {
    TabBarItem,
    TabBar,
  },
};
</script>

<style scoped>
</style>