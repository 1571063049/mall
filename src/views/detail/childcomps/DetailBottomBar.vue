<template>
  <div class="bottom_bar">
      <div class="bar_left">
          <div class="bar_left_item">
              <i>
                  <img src="~assets/images/bombar/kefu.png" alt="">
              </i>
              <span>客服</span>
          </div>
          <div class="bar_left_item">
              <i>
                  <img src="~assets/images/bombar1/dianpu.png" alt="">
              </i>
              <span>店铺</span>
          </div>
          <div class="bar_left_item">
              <i>
                  <img src="~assets/images/bombar1/shoucang.png" alt="">
              </i>
              <span>收藏</span>
          </div>
      </div>
      <!-- <div class="bar_center"></div> -->
      <div class="bar_right">
          <div class="cart" @click="addToCart">加入购物车</div>
          <div class="buy">购买</div>
      </div>
  </div>
</template>

<script>
export default {
name:"DetailBottomBar",
    methods:{
        addToCart(){
            // console.log('addToCart');
            this.$emit('addCart');

        }
    }
}
</script>

<style>
.bottom_bar{
    display: flex;
    height: 49px;
    background-color: #fff;
}

.bar_left,
.bar_right{
    flex: 1;
    display: flex;
    height: 49px;
}
.bar_left_item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
}
.bar_left_item img{
    width: 25px;
    height: 25px;
}
.cart,
.buy{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 19px;
}
.cart{
    color: #111;
    background-color: rgb(233, 233, 22);
}
.buy{
    color: #fff;
    background-color: rgb(255, 102, 154);
}
</style>