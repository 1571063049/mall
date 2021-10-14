<template>
  <div id="detail">
     <detail-nav-bar @titleClick="titleClick" ref="delnav"/>
     <scroll class="content" ref="bscroll" @ScrollY="gobackisplay" :probeType="3">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info 
          :detailgoods-info="detailgoodsInfo" 
          @imagesLoad="imagesLoad" 
          ref="goods"
        />
        <detail-param-info :params-info="paramsInfo" ref="parmas"/>
        <detail-comment-info :comment-info="commentInfo" ref="comment"/>
        <goods-list :goodsList="recommendList" ref="recommend"/>
     </scroll>
     <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="goBack" v-show="isShowBacTop"/>
    <!-- <Toast :message="message" :isShow="isShow"/> -->
  </div>
</template>

<script>
import DetailNavBar from './childcomps/DetailNavBar.vue'
import DetailSwiper from './childcomps/DetailSwiper.vue'
import DetailBaseInfo from './childcomps/DetailBaseInfo.vue'
import DetailShopInfo from './childcomps/DetailShopInfo.vue'
import DetailGoodsInfo from './childcomps/DetailGoodsInfo.vue'
import DetailParamInfo from './childcomps/DetailParamInfo.vue'
import DetailCommentInfo from './childcomps/DetailCommentInfo.vue'
import DetailBottomBar from './childcomps/DetailBottomBar.vue'


import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
// import BackTop from 'components/content/backTop/BackTop.vue'
// import Toast from 'components/common/toast/Toast.vue'


import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
import {ItemListenerMixin,BackTopMixin} from 'common/mixin.js'

import { debounce } from 'common/utils.js'

import {mapActions} from 'vuex'
export default {
    name:"Detail",
    components:{
        DetailNavBar,
        DetailBaseInfo,
        DetailSwiper,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        GoodsList,

        Scroll,
        // BackTop,
        // Toast
    },
    mixins:[ItemListenerMixin,BackTopMixin],
    data(){
        return{
            id:null,
            topImages:null,
            goods:{},
            shop:{},
            detailgoodsInfo:{},
            paramsInfo:{},
            commentInfo:{},
            recommendList:[],
            themeTopLY:[],
            getThemeTopY:null,
            currentTopIndex:0,
            // isShowBacTop:false,
            // message:'',
            // isShow:false,
        }
    },
    created(){
        this.id = this.$route.params.id;
        // console.log(this.$route.params);
        //请求详情数据
        getDetail(this.id).then(res=>{
            const data = res.result;
            // console.log(data);
            //1.获取顶部的图片轮播数据
            // console.log(res.result.itemInfo.topImages);
            this.topImages = data.itemInfo.topImages;

            //2.获取DetailBaseInfo(商品)数据
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo,data.shopInfo.services);
            // const goods = new Goods(data.itemInfo,data.columns,data.shopInfo,data.shopInfo.services);
            // this.goods = goods;
            // console.log(this.goods);

            //3.获取DetailShopInfo(店铺)数据
            this.shop = new Shop(data.shopInfo);
            // const shop = new Shop(data.shopInfo);
            // this.shop = shop;
            // console.log(this.shop);

            //4.获取商品详细信息
            this.detailgoodsInfo = data.detailInfo;
            // console.log(this.detailgoodsInfo);

            //5.保留参数信息
            this.paramsInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
            // console.log(this.paramsInfo);

            //6.获取评论信息
            if(data.rate.cRate !== 0){
                // 获取的是data.rate中的一个对象
                this.commentInfo = data.rate.list[0];
                // console.log(this.commentInfo);
            }

            //组件内容渲染完成后调用
            //根据最新的数据,对应的DOW已经被渲染出来(图片没加载完成)
            // this.$nextTick(()=>{
            //     this.themeTopLY = [];
            //     this.themeTopLY.push(0);
            //     this.themeTopLY.push(this.$refs.parmas.$el.offsetTop-44);
            //     this.themeTopLY.push(this.$refs.comment.$el.offsetTop-44);
            //     this.themeTopLY.push(this.$refs.recommend.$el.offsetTop-44);
            //     console.log(this.themeTopLY);

            // })
            //7. 给getThemeTopY 赋值,(对 this.themeTopLY赋值的操作进行防抖)
            this.getThemeTopY = debounce(()=>{
                this.themeTopLY = [];
                this.themeTopLY.push(0);
                this.themeTopLY.push(this.$refs.parmas.$el.offsetTop - 44);
                this.themeTopLY.push(this.$refs.comment.$el.offsetTop - 44);
                this.themeTopLY.push(this.$refs.recommend.$el.offsetTop - 44);
                this.themeTopLY.push(Number.MAX_VALUE);
                // console.log(this.themeTopLY);
            },50)
        });
        // 请求推荐 数据
        getRecommend().then(res=>{
            // console.log(res);
            this.recommendList = res.data.list;
            // console.log(this.recommendList);
        })
    },
    methods:{

        //映射,将actions里面的方法映射到当前数组
        ...mapActions(['addCart']),

        imagesLoad(){
            //1.不使用防抖函数,但要做判断(DetailGoodsInfo中已经做出了判断)，否则将执行图片加载次数
            // this.$refs.scroll.refresh();

            // 2.使用防抖函数
            this.newrefresh();

            //3.详细首部跳转
            this.getThemeTopY();
            // console.log(this.getThemeTopY);
            
        },
        //3.标题点击切换
        titleClick(index){
            // console.log(index);
            this.$refs.bscroll.ScrollTo(0,-this.themeTopLY[index],100);
        },
        //4.添加购物车
        addToCart(){
            // console.log('添加购物车');
            const product = {};
                //1.获取购物车需要展示的信息
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                product.id = this.id;
                // console.log(product);


                //2.江将商品加入到购物车中(1.Promise,2.mapActions)
                // this.$store.commit('addCart',product);
                // console.log(this.$store.state.CartList);
                // const list = {};
                // list.count = 1;   //count:1
                // let odd = list;
                // odd.count += 1;
                // console.log(list); //count:2

                //添加购物车

                // this.$store.dispatch('addCart',product).then(res =>{
                //     console.log(res);
                // });

                this.addCart(product).then(res=>{
                    // console.log(res);


                    //普通封装弹窗
                    // this.message = res;
                    // this.isShow = true;

                    // setTimeout(()=>{
                    //     this.message = ''
                    //     this.isShow = false;
                    // },1200)


                    //插件方式的封装封装弹窗
                    this.$toast.show(res)
                })
        },
        gobackisplay(position){
            // console.log(position.y);

            //法一：繁琐且打印频繁
            // if(-position.y >= 0 && -position.y < this.$refs.parmas.$el.offsetTop - 44){
            //    this.currentTopIndex = 0;
            // }else if(-position.y < this.$refs.comment.$el.offsetTop - 44){
            //         this.currentTopIndex = 1;
            // }else if(-position.y < this.$refs.recommend.$el.offsetTop - 44){
            //         this.currentTopIndex = 2;
            // }else{
            //         this.currentTopIndex = 3;
            // }

            //法二：防止赋值的操作过于频繁，且减少了代码量
            //this.currentTopIndex !== i 可以防止赋值的操作过于频繁
            // let length = this.themeTopLY.length;
            // for(let i = 0; i < length; i++){
            //     if(this.currentTopIndex !== i && ((i < length-1 && -position.y >= this.themeTopLY[i] && -position.y < this.themeTopLY[i+1]) || (i === length-1 && -position.y >= this.themeTopLY[i]))){
            //         this.currentTopIndex = i;
            //         // console.log(this.currentTopIndex);
            //         this.$refs.delnav.currentIndex = this.currentTopIndex;
            //     }
            // }

            //法三：hack
            //  this.themeTopLY.push(Number.MAX_VALUE);
            let length = this.themeTopLY.length;
            for(let i = 0; i < length-1; i++){
                if(this.currentTopIndex !== i && (-position.y >= this.themeTopLY[i] && -position.y < this.themeTopLY[i+1])){
                    this.currentTopIndex = i;
                    this.$refs.delnav.currentIndex = this.currentTopIndex;
                }
            }

            //返回顶部
            // this.isShowBacTop = (-position.y) > 1000; 
            this.listenBacktopShow(position);

          
        },
      
    },
    mounted(){
    //混入mixin;

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

   
    // console.log(this.$refs.bscroll.ScrollTo());
    },  
    destroyed(){
        this.$bus.$off('ItemimgLoad',this.ItemimgLoadListen)
    }

}
</script>

<style scoped>
#detail{
    height: 100vh;
    position: relative;
    z-index: 10;
    background-color: #fff;
}
.content{
    height: calc(100% - 44px - 49px);
    overflow: hidden;
}
</style>