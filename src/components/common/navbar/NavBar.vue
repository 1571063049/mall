<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
name:"NavBar"
}
</script>

<style scoped>
.nav-bar{
    line-height: 44px;
    height: 44px;
    display: flex;
    font-weight: 500;
    font-size: 18px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);
}
.left,
.right{
    width: 60px;
}
.center{
    flex: 1;
    height: 44px;
}
</style>