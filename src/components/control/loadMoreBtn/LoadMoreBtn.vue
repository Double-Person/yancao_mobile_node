<template>
  <div class="loadMoreBtn">
    <button class="btn" :disable=disabled :class="{activeClass:activeClassNum==0}">{{btnValue}}</button>
  </div>
</template>

<script>
  import PubSub from 'pubsub-js'
  export default {
    name: "LoadMoreBtn",
    data(){
      return {
        btnValue:'更多',
        disabled:false,
        activeClassNum:-1
      }
    },
    mounted(){
      PubSub.subscribe('noData',(msg, data)=>{
        if(data){
          this.btnValue = '已加载所有数据'
          this.activeClassNum = 0
          this.disabled = true
        }
      })

    }

  }
</script>

<style scoped>
.loadMoreBtn{
  padding: 0rem 0 0.6666rem 0;
  text-align: center;
}
  .btn{
    display: inline-block;
    background: transparent;
    color: #323333;
    text-align: center;
    width: 2.3rem;
    height: .8rem;
    line-height: .8rem;
    font-size: .37rem;
    font-family: PingFangSC;
    font-weight: 400;
    border: none;
    /* margin-top: -1.2rem; */
  }
  .activeClass{
    display: inline-block;
    background: #fff;
    color: #323333;
    text-align: center;
    width: 3rem;
    height: .8rem;
    line-height: .8rem;
    font-size: .32rem;
    font-family: PingFangSC;
    font-weight: 400;
    border: none;
  }

</style>
