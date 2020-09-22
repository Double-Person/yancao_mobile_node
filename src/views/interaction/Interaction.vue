<template>
  <div>
    <mob-head />
    <nav-bar />
    <!-- 互动交流 -->
    <div class="Interaction widths margin-bottom">
      <h2 class="nav-title">互动交流</h2>
      <div class="modules">
        <span
          class="item"
          v-for="(item, index) in modules"
          :class="{active:cuurent==index}"
          @click="handeChange(index,item.name,item)"
        >{{item.title}}</span>
      </div>
      <router-view />
    </div>
    <mob-footer />
  </div>
</template>

<script>
import MobHead from "@/components/control/mobHead/MobHead";
import NavBar from "@/components/control/navBar/NavBar";
import MobFooter from "@/components/control/mobFooter/MobFooter";
import { LOGLIST } from "@/assets/js/constant";
import { addLog } from "@/api/request";
export default {
  name: "Interaction",
  components: { MobFooter, NavBar, MobHead },
  data() {
    return {
      cuurent: -1,
      modules: [
        // {title:'咨询服务',name:'ConsultationService'},
        // {title:'举报投诉',name:'ReportComplaints'},
        // {title:'领导信箱',name:'LeadMsg'},
        { title: "我要留言", name: "LeaveMessage" },

        { title: "在线问答", name: "OnlineInTheSearch" },
        { title: "征集调查", name: "ForInvestigation" },
        { title: "烟草逸事", name: "TobaccoAnecdotes" }
        // {title:'川烟视窗',name:'SichuanSmokeView'},
      ]
    };
  },
  methods: {
    //点击切换选中模块（parms下标）
    handeChange(index, name, item) {
      if (item.title == "在线问答") {
        addLog({
        columnTypeCode: LOGLIST.HDJL,
        subColumnTypeCode: "hdjl_jingpinwenda",
      });
        window.location.href =
          "http://wpa.qq.com/msgrd?v=3&uin=1234567&site=qq&menu=yes";
      } else {
        this.cuurent = index;
        this.$router.push({ name: name });
      }

      // this.$router.push({
      //   path: '/article/list'
      // })
      // setTimeout(()=>{
      //   this.$router.push({path,path})
      // },500)
    }
  }
};
</script>

<style lang="less" scoped>
.Interaction {
  margin-top: 0.5rem;
  .modules {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &:after {
      content: "";
      width: 30%;
    }
    .item {
      width: 30%;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
      border: #999 solid 1px;
      border-radius: 4px;
      color: #323333;
      font-size: 0.43rem;
      margin-bottom: 0.5rem;
      /*-webkit-tap-highlight-color: #235399;*/
    }
  }
}

.active {
  background: #235399;
  color: #fff !important;
}
</style>
