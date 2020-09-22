<template>
  <div>
    <mob-head/>
    <nav-bar/>
    <div class="error">
      温馨提示，系统正在升级...
    </div>
    <mob-footer/>
  </div>
</template>

<script>
  import MobHead from "../mobHead/MobHead";
  import NavBar from "../navBar/NavBar";
  import MobFooter from "../mobFooter/MobFooter";
  import { addLog } from "@/api/request";
  export default {
    name: "WebSiteLookingFor",
    components: {MobFooter, NavBar, MobHead},
    created () {
      addLog({
        columnTypeCode: 'bsfw',
        subColumnTypeCode: "bsfw_chengzhichengshangwu"
      });
    },
    methods: {
      
    }
  }
</script>

<style scoped>
.error{
  height: 10rem;
  line-height: 10rem;
  text-align: center;
  font-size: .43rem;
}
</style>
