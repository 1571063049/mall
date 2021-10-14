<template>
  <div class="toast" v-show="isShow">
      {{message}}
  </div>
</template>

<script>
export default {
    name:"Toast",
    props:{
        // message:{
        //     type:String,
        //     default:''
        // },
        // isShow:{
        //     type:Boolean,
        //     default:false
        // }
    },
    data(){
        return{
            message:'',
            isShow:false,
            settime:null,
            Flag:true,
        }
    },
    methods:{
        show(message = '默认文字',duration = 1200){
            if(this.Flag){
                // duration =  duration || 2000
                this.isShow = true
                this.message = message;

                setTimeout(()=>{
                    this.isShow = false
                    this.message = '';
                },duration)
                this.Flag = false;
            }
            this.Flag = true;
        }
    }
}
</script>

<style>
.toast{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,.75);
    font-size: 18px;
    color: #fff;
    padding: 10px;
    border-radius: 10px;
    z-index: 999;
}
</style>