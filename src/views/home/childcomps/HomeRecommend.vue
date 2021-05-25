<template>
  <div class="recommend">
          <div v-for="(item,index) in recommendList" :key="item.index" class="recomment_item">
                <a :href="item.link">
                    <img :src="item.image" alt="">
                </a>
                <div class="recomment_title">{{item.title}}</div>
          </div>
  </div>
</template>

<script>
    export default {
    name:"HomeRecommend",
    props:{
           recommendList:{
                type:Array,
                default(){
                    return []
                }
           }
        }
    }
</script>

<style scoped>
.recommend{
    width: 100%;
    height: 160px;
    display: flex;
    border-bottom: 8px solid rgba(255, 105, 156,.1);
    box-sizing: border-box;
    padding: 10px 0;
}
.recomment_item{
    height: 140px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    list-style: none;
}
.recomment_item img{
    width: 85px;
    height: 85px;
}
.recomment_title{
    font-size: 16px;
}
</style>