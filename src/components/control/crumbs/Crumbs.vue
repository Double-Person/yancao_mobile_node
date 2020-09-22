<template>
  <div>
    <!-- 面包屑组件 -->
    <div class="content">
      <div v-for="item in crumbs" class="item" ref="item">
        <span @click="jump(item.path)" class="firstCrumbs">{{item.name}}</span>
        <van-icon name="arrow" class="icon" ref="icon"/>
      </div>
      <span class="lastCrumbs">{{lastCrumbs.name}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Crumbs",
    props:['crumbs'],
    data() {
      return {
        lastCrumbs:{}
      }
    },
    created(){
      if(this.crumbs){
        let lengths = this.crumbs.length;
        this.lastCrumbs = this.crumbs[lengths-1];
        this.crumbs.pop();
      }
    },
    methods:{
      jump(path){
        // console.log(path);
        this.$router.push({path})
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    font-size: .35rem;
    display: flex;
    height: 1.066rem;
    line-height: 1.066rem;
    background: #F2F3F5;
    /*padding-left: .3rem;*/
    padding-left: 4%;
    .item {

    }
  }

  .icon {
    font-size: .37rem;
    margin-top: -.05rem;
    padding: 0 .1rem;
    color: #979899;
    vertical-align: middle;
  }
  .firstCrumbs{
    color: #656566;
  }
  .lastCrumbs{
    font-size: .35rem;
    height: 1.066rem;
    line-height: 1.066rem;
    color: #979899;
  }
</style>
