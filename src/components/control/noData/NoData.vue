<template>
  <div class="noData">
    <img src="./images/pic_search_nothing.svg"/>
    <p>暂无数据</p>
  </div>
</template>

<script>
  export default {
    name: "NoData"
  }
</script>

<style lang="less" scoped>
  .noData{
    text-align: center;
    font-size: .43rem;
    color: #656566;
    margin: 1.5rem auto;
  p{
    margin-top: .8rem;
  }
  }
</style>