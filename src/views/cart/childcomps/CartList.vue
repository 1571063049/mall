<template>
  <div class="cart_list">
    <cart-list-item v-for="(item,index) in list" :key="item.index" :product="item"/>
  </div>
</template>

<script>
import CartListItem from './CartListItem.vue'
import { mapGetters } from 'vuex'

export default {
    name:"CartList",
    components:{
        CartListItem
    },
    computed:{
        ...mapGetters({
            list:'carList'
        })
    },
    methods:{
        
    }
}
</script>

<style>

</style>