<template>
  <div id="goodsitem">
    <a :href="goodsItem.link">
      <img :src="goodsItem.show.img" alt="">
    </a>
    <div class="goods_content">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span>☆</span>
      <span class="cfav">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
   name:"GoodsItem",
      data(){
          return{
          }
        },
      props:{
        goodsItem:{
          type:Object,
          default(){
            return {}
          }
        }
      }
}
</script>

<style scoped>
#goodsitem{
  flex: 47%;
  height: 340px;
  overflow: hidden;
  border-radius: 10px;
  margin: 0 4px;
}
#goodsitem img{
  width: 100%;
  height: 300px;
}
.goods_content{
  display: flex;
  flex-wrap:wrap;
  justify-content: center;
  align-items: center;
}
.goods_content p{
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.price{
  color: var(--color-tint);
}
.goods_content span{
  margin: 0 3px;
}
</style>