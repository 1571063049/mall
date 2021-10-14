<template>
  <div id="goodsitem" @click="itemClick(goodsItem)">
    <img :src="showImage" alt="" @load="imgLoad">
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
  },
  computed:{
    showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods:{
    imgLoad(){
      // 监听图片加载

       this.$bus.$emit('ItemimgLoad');

      //如果为home页面，就用图片加载，而detail页面就不用，反之亦然
      // if(this.$route.path.indexOf('/home')){
      //    this.$bus.$emit('ItemimgLoad');
      // }else if(this.$route.path.indexOf('/detail')){
      //   this.$bus.$emit('ItemimgLoad');
      // }
    },
    itemClick(item){
      this.$router.push('/detail/'+ item.iid);
      // this.$router.push({
      //   path:'/detail',
      //   query:{

      //   }
      // });
    }
  },
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