<template>
  <div id="app" v-if="true">
    <transition name="fade" mode="out-in">
      <!--<keep-alive :include="/^Mob|Nav/">-->
      <!--<router-view v-if="isRouterAlive"/>-->
      <!--</keep-alive>-->
      <router-view v-if="isRouterAlive" />
    </transition>
  </div>
</template>

<style lang="less">
@import "assets/css/common.css";
@import "assets/css/reset.css";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 1;
}
.tuijian {
  width: 28px;
  height: 18px;
  color: #fff;
  font-size: 12px;
  background: #04549e;
  transform: skewX(8deg);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 3px;
  // padding-right: 3px;
  box-sizing: border-box;
  margin-right: 5px;
  span {
    font-style: normal;
    color: #fff !important;
  }
}
</style>
<script>
export default {
  components: {},
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>
