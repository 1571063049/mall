<template>
  <div ref="wrapper">
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

                // better-scroll2.0版本新增属性,
                //详细 可以查看谷歌书签
                observeDOM:true,
                observeImage:{
                     debounceTime: 50
                },

                pullUpLoad:this.pullUpLoad,
                // pullDownRefresh: true,
            });
            //监听滚动的位置 
            if(this.probeType == 2 || this.probeType == 3){
                 this.bscroll.on('scroll',(position)=>{
                // console.log(position.x,position.y);
                this.$emit('ScrollY',position);
                });
            }
            if(this.pullUpLoad){
                this.bscroll.on('pullingUp',()=>{
                // console.log('上拉加载更多');
                this.$emit('pullingUp');
                });
            }
            // console.log(this.bscroll);
        },
        methods:{
            ScrollTo(x,y,time){
                this.bscroll && this.bscroll.scrollTo(x,y,500);
            },
            finishPullUp(){
                this.bscroll && this.bscroll.finishPullUp();
            },
            refresh(){
                this.bscroll && this.bscroll.refresh();
            },
            getscrollY(){
                return this.bscroll ? this.bscroll.y : 0
                // console.log(this.bscroll.y);
            }
        }
    }
</script>

<style scoped>

</style>