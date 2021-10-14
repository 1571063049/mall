<template>
  <div class="detail_swiper">
    <swiper>
        <swiper-item v-for="(item,index) in topImages" :key="item.index" class="swiper_item">
            <img :src="item" alt="">
        </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'

export default {
    name:"DetailSwiper",
    props:{
        topImages:{
            type:Array,
            default(){
                return[]    
            }
        }
    },
    components:{
        Swiper,
        SwiperItem
    },
}
</script>

<style scoped>
.detail_swiper{
    height: 300px;
    overflow: hidden;
}
.swiper_item{
    height: 300px;
}
</style>