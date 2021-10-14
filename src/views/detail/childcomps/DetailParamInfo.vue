<template>
  <div class="paraminfo" v-if="Object.keys(paramsInfo).length !==0">
      <div class="info_sizex" v-for="(itemx,index) in paramsInfo.sizes" :key="itemx.index">
          <div class="info_sizey" v-for="(itemy,indey) in itemx" :key="itemy.indey">
              <div class="info_sizez" v-for="(itemz,indez) in itemy" :key="itemz.indez">
                  {{itemz}}
              </div>
          </div>
      </div>
      <div class="info_param" v-for="(item,index) in paramsInfo.infos" :key="item.index">
              <div class="info_param_item">
                  <div class="info_param_key">{{item.key}}</div>
                  <div class="info_param_value">{{item.value}}</div>
              </div>
      </div>
      <div class="info_img" v-if="paramsInfo.image">
          <img :src="paramsInfo.image" alt="">
      </div>
  </div>
</template>

<script>
export default {
    name:"DetailParamInfo",
    props:{
        paramsInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style>
.paraminfo{
    padding: 10px;
    border-bottom: 4px solid rgba(100, 98, 98, 0.1);
    box-shadow: 0px 2px 5px rgba(100,100,100,.1);
}
.info_sizex{
    border-bottom: 1px solid rgba(100, 98, 98, 0.1);
    box-shadow: 0px 1px 1px rgba(100,100,100,.1);
}
.info_sizey{
    display: flex;
    justify-content: flex-start;
    border-bottom: 1px solid rgba(100, 98, 98, 0.1);
}

.info_sizez{
    padding: 12px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.info_sizez:nth-child(n+2){
    margin-right:30px;
}
.info_sizez:first-child{
    width: 70px;
    color: var(--color-tint);

}
.info_sizez:last-child{
    margin-right:0;
}
.info_param_item{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 12px 0;
    border-bottom: 1px solid rgba(100, 98, 98, 0.1);
}
.info_param_key{
    width: 70px;
}
.info_param_value{
    flex: 1;
    color: var(--color-tint);
}

.info_img{
    width: 100%;
    height: 600px;
}
.info_img img{
    width: 100%;
    height: 100%;
}
</style>