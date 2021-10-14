<template>
  <div class="detailnav">
    <nav-bar>
        <div slot="left" class="detail_left" @click="goback">
            <img src="~assets/images/common/后退.png" alt="">
        </div>
        <div slot="center" class="detail_center">
            <div v-for="(item,index) in titles" 
                 class="detail_item"
                 @click="titleClick(index)"
                 :class="{active:currentIndex == index}"
                 >{{item}}
            </div>
        </div>
     </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
    export default {
        name:"DetailNavBar",
        components:{
            NavBar
        },
        data(){
            return{
                titles:['商品','参数','评论','推荐'],
                currentIndex:0,
            }
        },
        methods:{
            titleClick(index){
                // console.log(index);
                this.currentIndex = index;
                this.$emit('titleClick',index)
            },
            goback(){
                this.$router.go(-1);
            }
        },
        mounted(){
            // this.currentIndex = this.currentTopIndex
        }
    }
</script>

<style scoped>
.detail_left{
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
   
}
.detail_left img{
    width: 30px;
    height: 30px;
}
.detail_center{
    display: flex;
    justify-content: center;
    align-items: center;
   
}
.detail_item{
     margin: 0 10px;
     height: 44px;
}
.active{
    color: var(--color-tint);
}
</style>