<template>
  <div class="mobile-head">
    <div class="logoImg" @click="toHome">
      <!--<img src="./images/pic_home_banner1.svg" alt="中国烟草"/>-->
      <img src="./images/pic_home_banner2@3x.png" alt="中国烟草"/>
      <div class="prompt">
        <div></div>
        <div>新网站正处于试运行中诚挚欢迎您提出宝贵的意见建议</div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "MobHead",
    methods:{
      toHome(){
        let path = this.$route.path;
        if(path!='/home'){
          this.$router.push({path:'/home'})
        }
      }

    }
  }
</script>

<style lang="less" scoped>
  .logoImg {
    position: relative;
    width: 100%;
    /*height: 1.5999rem;*/
    img {
      width: 100%;
      /*height: 100%;*/
      border: none;
      display: block;
    }
    .prompt{
      display: inline-block;
      position: absolute;
      z-index: 2;
      font-size: .2rem;
      /*left: .5rem;*/
      bottom: .13rem;
      right: 0.2rem;
      text-align: center;
      color: #fff;
      font-family:"微软雅黑","Microsoft YaHei", "Arial",  "黑体", "宋体",  sans-serif;
    }

  }

</style>
