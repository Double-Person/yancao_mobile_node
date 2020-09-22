<template>
  <div class="paging">
    <!-- 分页器  -->
    <div class="page">
      {{paging.page}}
    </div>
    <div class="title">
      {{paging.title}}
    </div>
    <div class="time">
      {{paging.time}}
    </div>
  </div>
</template>

<script>
  export default {
    props:['paging'],
    name: "Paging",

  }
</script>

<style scoped>
  .paging {
    padding: .5rem 0;
    border-bottom: #F2F3F5 solid 1px;
  }

  .page {
    color: #979899;
    font-size: .32rem;
  }
  .title{
    font-size: .43rem;
    white-space:nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: .3rem 0;
  }
  .time{
    color: #979899;
    font-size: .32rem;
  }
</style>