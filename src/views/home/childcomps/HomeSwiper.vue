<template>
    <swiper>
        <swiper-item v-for="(item,index) in bannerList" :key="item.index">
            <a :href="item.link">
                <img :src="item.image" alt="">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
    import {Swiper,SwiperItem} from 'components/common/swiper/index'
    export default {
        name:"HomeSwiper",
        props:{
            bannerList:{
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

</style>