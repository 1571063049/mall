<template>
  <div id="goodslist">
   <goods-item v-for="item in goodsList" :goodsItem="item"/>
  </div>    
</template>

<script>
import GoodsItem from './GoodsItem.vue'
    export default {
        name:"GoodsList",
        components:{
            GoodsItem
        },
        props:{
            goodsList:{
                type:Array,
                default(){
                    return []
                }
            }
        }
}
</script>

<style scoped>
#goodslist{
  padding: 4px;   
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
</style>