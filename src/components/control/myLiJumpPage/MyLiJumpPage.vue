<template>
  <div>
    <h1 class="nav-title">{{ navTitle }}</h1>
    <div class="myLiJumpPage widths margin-bottom">
      <div
        tag="a"
        v-for="(item, index) in myLi"
        class="item"
        :class="{ active: index == currenIndex }"
        @click="handelClick(index, item.name, item.id, item.title, item)"
      >{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
import { addLog } from "@/api/request";
import { LOGLIST } from "@/assets/js/constant";

export default {
  name: "MyLiJumpPage",
  props: ["myLi", "navTitle"],
  data() {
    return {
      currenIndex: -1
    };
  },
  methods: {
    handelClick(index, name, id = "", title, item) {
      let params = {
        columnTypeCode: LOGLIST.BSFW,
        subColumnTypeCode: ""
      };
      if (title == "在线办证") {
        params.subColumnTypeCode = "bsfw_zaixianbanzheng";
      } else if (title == "办件公示") {
        params.subColumnTypeCode = "bsfw_banjiangongshi";
      } else if (title == "办证查询") {
        params.subColumnTypeCode = "bsfw_banzhengchaxun";
      }else if (title == "零售户订货") {
        params.subColumnTypeCode = "bsfw_lingshouhuchaxun";
      }else if (title == "诚至诚商务") {
        params.subColumnTypeCode = "bsfw_chengzhichengshangwu";
      }else if (title == "权力清单") {
        params.subColumnTypeCode = "bsfw_quanliqingdan";
      }
      addLog(params);
      this.currenIndex = index;
      setTimeout(() => {
        if (name) {
          // this.$router.push({name: name,params:{id,getTitle:title}})
          this.$router.push({ name: name, query: { id, getTitle: title } });
          // console.log(index, name,id='',title)
        } else if (item.path) {
          this.$router.push({ path: item.path + "?type=" + id });
          // console.log(index, name,id='',title,item.path)
        } else if (item.outLine) {
          console.log(item.outLine);
          window.open(item.outLine, "_blank");
        } else if (item.onlyPath) {
          // console.log(item.onlyPath)
          this.$router.push({ path: item.onlyPath });
        }
        // console.log(index, name,id='',title)
      }, 10);
    }
  }
};
</script>

<style scoped>
h1 {
  margin-left: 4%;
}

.myLiJumpPage {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.myLiJumpPage:after {
  content: "";
  width: 31%;
}

.item {
  width: 31%;
  display: inline-block;
  height: 2.399rem;
  line-height: 2.399rem;
  text-align: center;
  border: #dbdbdb solid 0.0266rem;
  /*border-radius: 4px;*/
  border-radius: 0.10666rem;
  color: #323333;
  font-size: 0.43rem;
  margin-bottom: 0.43rem;
  font-weight: 400;
  /*-webkit-tap-highlight-color: #235399;*/
}

.active {
  background: #235399;
  color: #fff !important;
  border: none !important;
}
</style>
