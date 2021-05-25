<template>
  <div class="wrapper" ref="wrapper">
      <div>
          <slot></slot>
      </div>
  </div>
</template>

<script>
    import BScroll from 'better-scroll'
    // import Pullup from '@better-scroll/pull-up'
    // import PullDown from '@better-scroll/pull-down'
    // BScroll.use(Pullup);
    // BScroll.use(PullDown);
    export default {
        name:"Scroll",
        props:{
            probeType:{
                type:Number,
                default:0,
            },
            pullUpLoad:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return{
                bscroll:null
            }
        },
        mounted(){
            //创建better-scroll实例对象
            this.bscroll = new BScroll(this.$refs.wrapper,{
                probeType: this.probeType,
                click: true,
                observeDOM:true,
                pullUpLoad:this.pullUpLoad,
                // pullDownRefresh: true,
            });
            //监听滚动的位置 
            this.bscroll.on('scroll',(position)=>{
                // console.log(position.x,position.y);
                this.$emit('ScrollY',position)
            });
            this.bscroll.on('pullingUp',()=>{
                // console.log('上拉加载更多');
               this.$emit('pullingUp');
            });
        },
        methods:{
            ScrollTo(x,y,time){
                this.bscroll.scrollTo(x,y,500);
            },
            finishPullUp(){
                this.bscroll.finishPullUp();
            },
        }
    }
</script>

<style scoped>

</style>