<template>
  <div class="check_button">
      <img src="~assets/images/common/对.png" alt="" v-show="isChecked">
  </div>
</template>

<script>
export default {
    name:"CheckButton",
    props:{
        isChecked:{
            type:Boolean,
            default:false,
        }
    },
}
</script>

<style>
.check_button {
    border-radius: 50%;
    border: 1px solid #ccc;
    display: flex;
    overflow: hidden;
}
.check_button img{
    width: 100% -2px;
    height: 100% -2px;
    transform: scale(1.2);
    vertical-align: middle;
}
</style>