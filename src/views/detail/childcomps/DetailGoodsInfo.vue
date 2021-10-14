<template>
  <div class="goods_info" v-if="Object.keys(detailgoodsInfo).length !== 0">
      <div class="goods_desc">
          <div class="desc_start"></div>
          <div class="desc_middle">
              <div>{{detailgoodsInfo.desc}}</div>
              <div>{{detailgoodsInfo.detailImage[0].desc}}</div>
          </div>
          <div class="desc_end"></div>
      </div>
      <div class="goods_list" v-for="(item,index) in detailgoodsInfo.detailImage">
          <div class="list_key">{{item.key}}</div>
          <div class="list_item" v-for="(it,ix) in item.list" :key="it.ix">
              <img :src="it" alt="" @load="imgLoad">
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"DetailGoodsInfo",
    props:{
        detailgoodsInfo:{
            type:Object,
            default(){
                return{}
            }
        },
    },
    data(){
        return{
            imagesLength:0,
            counter:0,
        }
    },
    methods:{
        imgLoad(){
            //判断所有的图片都加载完，那么进行一次回调就可以了
            //  this.counter += 1;
            //  this.$emit('magesLoad');
            if(++this.counter === this.imagesLength-1){
                this.$emit('imagesLoad');
            }
        }
    },
    mounted(){
        // console.log('mounted');
        // console.log(this.detailgoodsInfo);
        // console.log(this.imagesLength);
    },
    watch:{
        detailgoodsInfo(){
            //获取图片的个数
            this.imagesLength = this.detailgoodsInfo.detailImage[0].list.length;
        }
    }

}
</script>

<style>
.goods_info{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: 4px solid rgba(100, 98, 98, 0.1);
    box-shadow: 0px 2px 5px rgba(100,100,100,.1);
}
.goods_desc{
    padding: 10px;
    font-size: 14px;
    height: 100%;
    margin: 5px 0;
    position: relative;
    text-indent: 10px;
}
.desc_middle{
    margin: 10px;
}
.desc_start,
.desc_end{
    width: 5px;
    height: 5px;
    background-color: #111;
    position: relative;
}
.desc_end{
    position: absolute;
    bottom: 10px;
    right: 10px;
}
.desc_start::after{
    content: "";
    position: absolute;
    top: 5px;
    left: 0;
    width: 100px;
    height: 2px;
    background-color: #aaa;
}
.desc_end::after{
    content: "";
    position: absolute;
    top: 5px;
    left: -95px;
    width: 100px;
    height: 2px;
    background-color: #aaa;
}
.goods_list{
    margin: 5px 0;
}
.list_key{
    text-indent: 10px;
    font-size: 18px;
    color: #000;
    margin: 10px 0;
}
.list_item {
    width: 100%;
    height: 610px;
}
.list_item img{
    width: 100%;
    height: 100%;
}
</style>