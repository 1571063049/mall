<template>
  <div class="commentInfo" v-if="Object.keys(commentInfo).length !==0">
      <div class="info_header">
          <div class="header_title">用户评价</div>
          <div class="header_more" @click="moreClick">
              <span>更多</span>
              <i class="arrow_right"></i>
          </div>
      </div>
      <div class="info_use">
          <img :src="commentInfo.user.avatar" alt="">
          <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="info_detail">
          <p>{{commentInfo.content}}</p>
          <div class="info_detail_other">
              <span class="detail_other_data">{{commentInfo.created | formatDate}}</span>
              <span>{{commentInfo.style}}</span>
          </div>
          <div class="detail_other_img">
              <img :src="item" alt="" v-for="(item,index) in commentInfo.images" :key="item.index">
          </div>
      </div>
  </div>
</template>

<script>
import {formatDate} from 'common/utils.js'
export default {
    name:"DetailCommentInfo",
    props:{
        commentInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    filters:{
        formatDate(value){
            let date = new Date(value * 1000);
            return formatDate(date,'yyyy-MM-dd')
        }
    },
    methods:{
        moreClick(){
            // console.log(1);
        }
    }
}
</script>

<style scoped>
.commentInfo{
    padding: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    border-bottom: 4px solid rgba(100, 98, 98, 0.1);
    box-shadow: 0px 2px 5px rgba(100,100,100,.1);
}
.info_header{
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    font-size: 18px;
}
.header_more{
    width: 60px;
    color:#d4237a;
    font-weight: 500;
    display: flex;
}
.arrow_right{
    display: block;
    width: 20px;
    height: 20px;
    background: url(~assets/images/common/更多.png) no-repeat;
    background-size: 20px 20px;
}
.info_use{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    font-weight: 550;
}
.info_use img{
    width: 50px;
    height: 50px;
    margin-right: 10px;
}
.info_detail{
    padding: 10px;
}
.info_detail_other{
    display: flex;
    align-items: center;
    color: rgb(155, 152, 152);
    margin: 5px 0;
}
.detail_other_data{
    margin-right: 5px;
}
.detail_other_img{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.detail_other_img img{
    width: 80px;
    height: 80px;
    margin-right: 10px;
}
</style>