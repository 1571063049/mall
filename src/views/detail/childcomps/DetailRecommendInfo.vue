<template>
  <div class="recommend_Info" >
    <div class="info_list" v-for="(item,index) in recommendList" :key="item.index">
        <img :src="item.image" alt="">
        <div class="goods_content">
          <p>{{item.title}}</p>
          <span class="price">{{item.price}}</span>
          <span>☆</span>
          <span class="cfav">{{item.discountPrice}}</span>
    </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"DetailRecommend",
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
.recommend_Info{
  padding: 4px;   
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
.info_list{
  flex: 47%;
  height: 340px;
  overflow: hidden;
  border-radius: 10px;
  margin: 0 4px;
}
.info_list img{
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