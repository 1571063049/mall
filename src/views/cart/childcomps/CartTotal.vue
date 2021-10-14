<template>
  <div class="cart_total">
      <div class="check_total">
          <check-button class="check" 
          @click.native="TotalCheck"
          ref="check"
          :isChecked="isSelectAll"
          />
          <span>全选</span>
      </div>
      <div class="money_total">
          合计:<span>{{TotalPrice}}</span>
      </div>
      <div class="count_total" @click="TotalClick">
          去结算({{TotalMount}})
      </div>
  </div>
</template>

<script>    
import {mapGetters} from 'vuex'
import CheckButton from 'components/content/checkButton/CheckButton.vue'
export default {
    name:"CartTotal",
    components:{
        CheckButton
    },
    data(){
        return{
            istotalCheck:false,
        }
    },
    computed:{
        ...mapGetters(['carList']),
        //preValue 前面结果的值
        TotalPrice() {
            return '￥' + this.carList.filter(item => {
                return item.checked
            }).reduce((preValue,item)=>{
                return preValue + item.price * item.count
            },0).toFixed(2)
        },
        TotalMount(){
            return this.carList.filter(item=>{
                return item.checked
            }).reduce((preValue,item)=>{
                return preValue + item.count
            },0)
        },
        isSelectAll(){
            if(this.carList.length === 0) return false


            //法一
            //使用filter
            //返回 ！(未选中的组成的数组的长度)
            // return !(this.carList.filter(item => !item.checked).length)

            //法二
            //使用find,find是找到符合条件的对象,找到返回true,未找到返回 undefined
            //只要有一个没被选中，则返会  ！(true)
            // return !(this.carList.find(item => !item.checked))

            //法三
            //使用every
            //every只有全部满足条件(被选中)，才返回true，否则返回false
            return this.carList.every(item=> item.checked)

            //法四
            //普通遍历
            // for(let item of this.carList) {
            //     //如果有没被选中的就返回false
            //     if(!item.checked){
            //         return false
            //     }
            // }
            // return true
        }
    },
    methods:{
        TotalCheck(){
            if(this.isSelectAll){
                //全部选中
                this.carList.forEach(item=>item.checked = false)
            }else{
                //部分或全部不选中
                this.carList.forEach(item=>item.checked =true)
            }
           
        },
        TotalClick(){
            if(!this.isSelectAll){
                this.$toast.show('请选择购买的商品',1000)
            }
        }
    }
}
</script>

<style>
.cart_total{
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    display: flex;
    align-items: center;
    background-color: #eee;

}
.check_total{
    flex: 23%;
    display: flex;
    height: 40px;
    align-content: space-around;
    align-items: center;
    margin: 0 10px;
}
.check_total span{
    margin-left: 5px;
    font-size: 19px;
}
.check{
    width: 30px;
    height: 30px;
}
.money_total{
    flex: 48%;
    height: 40px;
    line-height: 40px;
    font-size: 19px;
}
.money_total span{
    color: crimson;
    font-weight: 550;
}
.count_total{
    flex: 30%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(255, 67, 3);
    color: #fff;
}
</style>