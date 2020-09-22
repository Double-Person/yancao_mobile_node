<template>
  <div>
    <h1 class="nav-title">互动交流</h1>
    <ul>
      <li v-for="item in homeInteraction" @click="homeToOtherPage(item.path,item)">
        <div>
          <img :src="item.img" alt />
        </div>
        <div>{{item.name}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { LOGLIST } from "@/assets/js/constant";
import { addLog } from "@/api/request";
export default {
  name: "HomeInteraction",
  data() {
    return {
      homeInteraction: [
        // {img: require('../images/homeInteraction/icon_home_hudong_lingdaoxinxiang.svg'), name: '领导信箱',path:'/interaction/leadmsg'},
        {
          img: require("../images/homeInteraction/icon_home_hudong_zixunfuwu.svg"),
          name: "我要留言",
          path: "/interaction/leavemessage"
        },
        {
          img: require("../images/homeInteraction/icon_home_hudong_zaixianwenda.svg"),
          name: "在线问答",
          path: "/interaction/OnlineInTheSearch"
        },
        // {img: require('../images/homeInteraction/icon_home_hudong_jubaotousu.svg'), name: '举报投诉',path:'/interaction/reportcomplaints'},
        {
          img: require("../images/homeInteraction/icon_home_hudong_zhengjidiaocha@2x.png"),
          name: "征集调查",
          path: "/interaction/forinvestigation"
        },
        {
          img: require("../images/homeInteraction/icon_home_hudong_yancaoyishi.svg"),
          name: "烟草逸事",
          path: "/interaction/tobaccoanecdotes"
        }
      ]
    };
  },
  methods: {
    homeToOtherPage(path, item) {
      if (item.name == "在线问答") {
        addLog({
          columnTypeCode: LOGLIST.HDJL,
          subColumnTypeCode: "hdjl_jingpinwenda"
        });
        window.location.href =
          "http://wpa.qq.com/msgrd?v=3&uin=1234567&site=qq&menu=yes";
      } else {
        this.$router.push({ path });
      }
    }
  }
};
</script>

<style lang="less" scoped>
ul {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 0.6666rem;
  li {
    width: 47%;
    border: #dbdbdb solid 1px;
    margin-bottom: 0.28rem;
    font-size: 0.37rem;
    text-align: center;
    padding: 0.3999rem 0;
    img {
      width: 1.28rem;
    }
  }
}
</style>
