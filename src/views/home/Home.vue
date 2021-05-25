<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center" class="home-center">购物街</div>
    </nav-bar>
    <scroll 
      class="wrapper" 
      ref="bscroll" 
      :probeType="3" 
      @ScrollY="gobackisplay"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <home-swiper :bannerList="bannersList"/>
      <home-recommend :recommendList="recommendsList"/>
      <home-feature/>
      <tab-control class="tab_control" @tab-click="tabClick" :titles="['流行','新款','精选']"/>
      <goods-list :goodsList="showgoods"/>
    </scroll>
    <back-top @click.native="goBack" v-show="isShowBacTop"/>
  </div>
</template>

<script>
import HomeSwiper from './childcomps/HomeSwiper.vue'
import HomeRecommend from './childcomps/HomeRecommend.vue'
import HomeFeature from './childcomps/HomeFeature.vue'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

import {getHomeMultidata,getHomeGoods} from 'network/home'

export default {
  name: "Home",
  components:{
    HomeSwiper,
    HomeRecommend,
    HomeFeature,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data(){
    return{
      bannersList:[],
      recommendsList:[],
      goods:{
        'pop' : {page:0,list:[]},
        'new' : {page:0,list:[]},
        'sell': {page:0,list:[]},
      },
      currentType:'pop',
      bscroll:null,
      isShowBacTop:false, 
    }
  },
  computed:{
    showgoods(){
      return this.goods[this.currentType].list
    }
  },
  created(){
    //1.请求多个数据
    this.getHomeMultidata();
    //2.请求goods数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
    // console.log(this.goods[type].list);
  },
  mounted(){
    //上拉加载更多
    // this.$refs.bscroll.bscroll.on('pullingUp',()=>{
    //   // console.log('上拉加载更多');
    //   this.getHomeGoods('pop');
    //   this.$refs.bscroll.bscroll.finishPullUp();
    // });
  },
  methods:{
    /**
     * 事件监听相关的方法
     */
    tabClick(index){
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    goBack(){
      this.$refs.bscroll.ScrollTo(0,0);
    },
    gobackisplay(position){
      // console.log(position.y);
      // >-1109
      this.isShowBacTop = (-position.y) > 1109
    },
    loadMore(){
      this.getHomeGoods(this.currentType);

      this.$$refs.bscroll.bscroll.refresh();
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata(){
      getHomeMultidata().then(res =>{
        this.bannersList = res.data.banner.list;
        this.recommendsList = res.data.recommend.list;
        // console.log(res.data.recommend.list);
      });
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res=>{
      this.goods[type].list.push(...res.data.list);
      // this.goods[type].list.concat(res.data.data.list);
      // console.log(res.data.list);
      // console.log(this.goods[type].list);
      this.goods[type].page++;

      this.$refs.bscroll.finishPullUp()
    })
    },
   
  }
};
</script>

<style scoped>
#home{
  width: 100%;
  height: 94vh;
  position: relative;
}
.home-nav{
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  background-color: var(--color-tint);
  color: #fff;
  z-index: 9;
}
.home-center{
  font-size: 18px;
  font-weight: 500;
}
.wrapper{
  height: calc(100% - 44px);
  overflow: hidden;
  margin: 44px 0 49px;
}
.tab_control{
  position: sticky;
  top: 44px;
}
</style>