<template>
  <div id="home">
    <nav-bar class="home_nav">
      <div slot="center" class="home_center">购物街</div>
    </nav-bar>
    <tab-control
      class="tab_control"
      @tab-click="tabClick"
      ref="tabcontrol2"
      :titles="['流行', '新款', '精选']"
      v-show="tabControlShow"
    />
    <scroll
      class="wrapper"
      ref="bscroll"
      :probe-type="3"
      @ScrollY="gobackisplay"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :bannerList="bannersList" @swiperImgLoad="SwiperImgLoad" />
      <home-recommend :recommendList="recommendsList" />
      <home-feature />
      <tab-control
        @tab-click="tabClick"
        ref="tabcontrol1"
        :titles="['流行', '新款', '精选']"
      />
      <goods-list :goodsList="showgoods" />
    </scroll>
    <back-top @click.native="goBack" v-show="isShowBacTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childcomps/HomeSwiper.vue";
import HomeRecommend from "./childcomps/HomeRecommend.vue";
import HomeFeature from "./childcomps/HomeFeature.vue";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { ItemListenerMixin } from "common/mixin.js";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommend,
    HomeFeature,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  mixins: [ItemListenerMixin],
  data() {
    return {
      bannersList: [],
      recommendsList: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBacTop: false,
      isLoad: false,
      tabControlTop: 0,
      tabControlShow: false,
      HomeScrollY: 0,
    };
  },
  computed: {
    showgoods() {
      // goods-list组件的数据
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求goods数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    // console.log(this.goods[type].list);
  },
  activated() {
    //1.获取y值
    this.$refs.bscroll.ScrollTo(0, this.HomeScrollY, 0);

    //2.刷新页面
    this.$refs.bscroll.refresh();
    // console.log('activated');

    //3.取消全局监听事件(图片加载函数)
    this.$bus.$off("ItemimgLoad", this.ItemimgLoadListen);
  },
  deactivated() {
    this.HomeScrollY = this.$refs.bscroll.getscrollY();
    // console.log('deactivated');
  },
  mounted() {
    //混入mixin
    // // 1.图片加载完成的事件监听
    // const refresh = debounce(this.$refs.bscroll.refresh,50);
    // // 2.抽离刷新函数
    // this.ItemimgLoadListen = ()=>{
    //   this.$refs.bscroll && refresh();
    //   // this.$refs.bscroll.refresh();
    //   // console.log(this.$refs.bscroll.refresh);
    // }
    // // 3.全局监听
    // this.$bus.$on('ItemimgLoad',this.ItemimgLoadListen)
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabcontrol1.currentIndex = index;
      this.$refs.tabcontrol2.currentIndex = index;
    },
    goBack() {
      this.$refs.bscroll.ScrollTo(0, 0);
    },
    gobackisplay(position) {
      // console.log(position.y);
      // >-1109
      this.isShowBacTop = -position.y > 1109;
      this.tabControlShow = -position.y > this.tabControlTop - 44;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);

      // this.$refs.bscroll.refresh();
    },
    SwiperImgLoad() {
      // 2.获取TabControl的offsetTop
      if (!this.isLoad) {
        //  console.log(this.$refs.tabcontrol1.$el.offsetTop);
        this.tabControlTop = this.$refs.tabcontrol1.$el.offsetTop;
        this.isLoad = true;
      }
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.bannersList = res.data.banner.list;
        this.recommendsList = res.data.recommend.list;
        // console.log(res.data.recommend.list);
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        // this.goods[type].list.concat(res.data.data.list);
        this.goods[type].page++;

        this.$refs.bscroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  width: 100%;
  height: 100vh;
}
.home_nav {
  background-color: var(--color-tint);
  color: #fff;
  z-index: 9;
}
.home_center {
  font-size: 18px;
  font-weight: 500;
}
.wrapper {
  height: calc(100% - 44px);
  overflow: hidden;
}
.tab_control {
  position: absolute;
  z-index: 8;
}
</style>