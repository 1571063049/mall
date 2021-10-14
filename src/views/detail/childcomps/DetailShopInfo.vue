<template>
  <div class="detail_shop" v-if="Object.keys(shop).length !==0">
      <div class="shop_logo">
          <img :src="shop.logo" alt="" >
          <p class="shop_name">{{shop.name}}</p>
      </div>
      <div class="shop_content">
          <div class="content_sell">
              <div class="content_sell_left">
                  <span>{{shop.sells || sellCountFilter}}</span>
                  <p>总销售量</p>
              </div>
              <div class="content_sell_right">
                  <span>{{shop.goodsCount}}</span>
                  <p>全部宝贝</p>
              </div>
          </div>
          <div class="content_assess">
              <table  style = "border-collapse:separate; border-spacing:10px;">
                  <tr v-for="(item,index) in shop.score" :key="item.index">
                      <td>{{item.name}}</td>
                      <td :class="{'assess_color_red':item.isBetter}" class="assess_secound">{{item.score}}</td>
                      <td :class="{'assess_bgc_red':item.isBetter}" class="assess_third">{{item.isBetter ? '高': '低'}}</td>
                  </tr>
              </table>
          </div>
      </div>
      <div class="shop_going">
          <div class="going">进店逛逛</div>
      </div>
  </div>
</template>

<script>
export default {
    name:"DetailShopInfo",
    props:{
        shop:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    filters:{
        sellCountFilter(value){
            let result = value;
            if(value > 10000){
                //toFixed(1)保留一位小数
                result = (value/10000).toFixed(1) + '万'
            }
            return result
        }
    }
}
</script>

<style scoped>
.detail_shop{
    padding: 10px;
    border-bottom: 4px solid rgba(100, 98, 98, 0.1);
    box-shadow: 0px 2px 5px rgba(100,100,100,.1);
    margin: 2px 0;
}
.shop_logo{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 20px 0;
}
.shop_logo img{
    height: 40px;
    width: 40px;
    margin: 0 10px;
}
.shop_name{
    font-size: 16px;
}
.shop_content{
    display: flex;
    margin: 20px 0;
}
.content_sell{
    flex: 50%;
    display: flex;
    justify-content: space-around;
    border-right: 1px solid #CCC;
}
.content_sell_left,
.content_sell_right{
    display: flex;
    flex-direction: column;
    align-items: center;    
    justify-content: center;
    font-size: 14px;
    color: #222;
    font-weight: 540;
}
.content_sell_left span,
.content_sell_right span{
    font-size: 22px;
    margin-bottom: 8px;
}

.content_assess{
    flex: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
}
.content_assess tr:nth-child(2){
    padding: 10px;
}
.assess_secound{
    padding: 0 10px;
    color: rgb(151, 189, 113);
}
.assess_third{
    color: #fff;
    background-color: rgb(151, 189, 113);
}
.content_assess .assess_color_red{
    color: rgb(211, 45, 78);
}
.content_assess .assess_bgc_red{
    background-color: rgb(211, 45, 78);
}
.shop_going{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom:10px;
}
.going{
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: rgb(189, 199, 219);
    opacity: .6;
    border-radius: 10px;
    color: #000;
}
</style>