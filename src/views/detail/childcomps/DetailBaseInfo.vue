<template> 
  <div class="base_info" v-if="Object.keys(goods).length !==0">
      <!-- <span>【{{goods.name}}】</span> -->
      <div class="info_title">{{goods.title}}</div>
      <div class="info_price">
          <span class="new_price">{{goods.newPrice}}</span>
          <span class="old_price">{{goods.oldPrice}}</span>
          <span class="discount" v-if="goods.discount" :style="{background:goods.bgc}">{{goods.discount}}</span>
      </div>
      <div class="info_other">
          <span>{{goods.columns[0]}}</span>
          <span>{{goods.columns[1]}}</span>
          <span>{{goods.service[0].name}}</span>
      </div>
      <div class="info_service">
          <span v-for="index in goods.service.length-1" class="" class="info_service_item">
              <img :src="goods.service[index].icon" alt="">
              <span>{{goods.service[index].name}}</span>
          </span>
      </div>
  </div>
</template>

<script>
export default {
    name:"DetailBaseInfo",
    props:{
        goods:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style>
.base_info{
    padding: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    border-bottom: 4px solid rgba(100, 98, 98, 0.1);
    box-shadow: 0px 2px 5px rgba(100,100,100,.1);
}
.info_title{
    font-weight: 600;
    font-size: 16px;
}
.info_price{
    margin: 8px 0;
    display: flex;
    height: 25px;
    line-height: 25px;
}
.new_price{
    font-size: 22px;
    color: rgb(255, 83, 133);
    font-weight: 550;
}
.old_price{
    text-decoration:line-through;
    font-size: 14px;
    margin: 0 4px;
    color: #555;
}
.discount{
    height: 20px;
    line-height: 20px;
    font-size: 15px;
    padding: 0 8px;
    background-color: rgb(185, 185, 50);
    border-radius: 10px;
    color: #fff;
    margin-top: 2px;
}
.info_other{
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    height: 24px;
    border-bottom: 1px dashed #333;
}
.info_service{
    margin: 8px 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.info_service_item{
    height: 25px;
    display: flex;
    align-items: center;
}
.info_service_item img{
    width: 20px;
    height: 20px;
}
</style>