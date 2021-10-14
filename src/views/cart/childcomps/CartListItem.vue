<template>
  <div class="cart_item">
    <check-button class="item_option" :is-checked="product.checked" @click.native="checkClick"/>
    <img :src="product.image" alt="" class="item_img">
    <div class="item_title">
        <p class="title">{{product.title}}</p>
        <p class="desc">{{product.desc}}</p>
        <div class="item_content">
            <span class="item_price">{{product.price}}</span>
            <span class="item_count">x{{product.count}}</span>
        </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
export default {
    name:"CartListItem",
    components:{
        CheckButton
    },
    props:{
        product:{
            type:Object,
            default(){
                return {}
            }
        },
    },
    methods:{
        checkClick(){
            this.product.checked = ! this.product.checked; 
        }
    }
}
</script>

<style>
.cart_item{
    display: flex;
    align-items: center;
    height: 121px;
    border-bottom: 1px solid #999;
}
.item_option {
    width: 30px;
    height: 30px;
    margin-left: 5px;
}
.item_img{
    width: 95px;
    height: 110px;
    margin: 0 5px;
}
.item_title{
    width: 260px;
    height: 110px;
    padding: 5px;
    overflow: hidden;
}
.item_title p{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.title{
    font-size: 18px;
    font-weight: 500;
}
.desc{
    font-size: 14px;
    color: #666;
    margin: 10px 0;
}
.item_content{
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.item_price{
    font-size: 20px;
    color: #f00;
}
.item_count{
    font-size: 18px;
}
</style>