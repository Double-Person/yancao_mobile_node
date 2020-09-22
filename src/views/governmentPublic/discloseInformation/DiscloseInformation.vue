<template>
  <div>
    <mob-head />
    <nav-bar />
    <my-li-jump-page :nav-title="navTitle" :my-li="myLi" />
    <mob-footer />
  </div>
</template>

<script>
import PubSub from "pubsub-js";

import MobHead from "@/components/control/mobHead/MobHead";
import NavBar from "@/components/control/navBar/NavBar";
import MyLiJumpPage from "@/components/control/myLiJumpPage/MyLiJumpPage";
import MobFooter from "@/components/control/mobFooter/MobFooter";
import { addLog } from "@/api/request";
import { LOGLIST } from "@/assets/js/constant";

export default {
  name: "DiscloseInformation", //信息公开
  components: { MobFooter, MyLiJumpPage, NavBar, MobHead },
  beforeRouteLeave(to, from, next) {
    if (from.query.type == "openInfo") {
      PubSub.publish("getCrumbs", "openInfo");
    } else if (from.query.type == "rightList") {
      PubSub.publish("getCrumbs", "rightList");
    } else {
      console.log("信息公开", from.query);
    }
    next();
  },
  data() {
    return {
      navTitle: "",
      myLi: []
      //权力清单
    };
  },
  created() {
    if (this.$route.query.type == "openInfo") {
      // 信息公开
      this.navTitle = "信息公开";
      this.myLi = [
        //  采购结果公开
        {
          title: "信息公开制度",
          name: "OpenProcurementResults",
          id: "xinxigongkaizhidu"
        },
        {
          title: "信息公开指南",
          name: "OpenProcurementResults",
          id: "xinxigongkaizhinan"
        },
        {
          title: "信息公开目录",
          name: "OpenProcurementResults",
          id: "xinxigongkaimulu"
        },
        {
          title: "信息公开年报",
          name: "OpenProcurementResults",
          id: "xinxigongkainianbao"
        },
        {
          title: "依申请公开",
          name: "OpenProcurementResults",
          id: "yishenqinggongkai"
        }
      ];
      addLog({
      columnTypeCode: LOGLIST.ZWGK,
      subColumnTypeCode: `zwgk_xinxigongkai`
    });
    } else if (this.$route.query.type == "rightList") {
      // 权力清单
      this.navTitle = "权力清单";
      this.myLi = [
        // {title: '行政处罚', name: 'OpenProcurementResults', id: 'xingzhengchufa'},
        // {title: '其他行政权力', name: 'OpenProcurementResults', id: 'qitaxingzhengquanli'},
        // {title: '行政许可', name: 'OpenProcurementResults', id: 'xingzhengxuke'},
        { title: "行政许可", name: "xzxk" }
        // {title: '行政强制', name: 'OpenProcurementResults', id: 'xingzhengqiangzhi'},
        // {title: '行政复议', name: 'OpenProcurementResults', id: 'xingzhengfuyi'},
        // {title: '行政奖励', name: 'OpenProcurementResults', id: 'xingzhengjiangli'}
      ];
    }
  }
};
</script>

<style scoped>
</style>
