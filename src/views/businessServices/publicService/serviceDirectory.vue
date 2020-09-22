<template>
  <div>
    <mob-head/>
    <nav-bar/>
    <crumbs/>
    <div>
      <h1>服务指南</h1>
      <ul>
        <li>
          <p class="overflow-ellipsis">成都烟草物流公司喜获TnPM企业联盟大会</p>
          <div class="time">2019-01-21</div>
        </li>
        <li>
          <p class="overflow-ellipsis">四川阿坝州局编译藏汉双语手册让专卖普法执…</p>
          <div class="time">2019-01-21</div>
        </li>
        <li>
          <p class="overflow-ellipsis">关于做好做好台风天气安全行车的紧急通知</p>
          <div class="time">2019-01-21</div>
        </li>
      </ul>
    </div>

    <mob-footer/>
  </div>
</template>

<script>
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";
  export default {
    name: "serviceDirectory",//服务指南
    components: {MobFooter, Crumbs, NavBar, MobHead}
  }
</script>

<style lang="less" scoped>
  li {
    border-bottom: #F2F3F5 solid 1px;

  .overflow-ellipsis {
    font-size: .43rem;
    margin: .5rem 0 .3rem 0;
  }
  .time {
    margin-bottom: .4rem;
  }
  }
  li:last-child {
    border-bottom: none;
    margin-bottom: 1.5rem;
  }
</style>