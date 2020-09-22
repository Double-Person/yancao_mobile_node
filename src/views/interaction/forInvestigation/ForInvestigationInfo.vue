<template>
<div :key="$route.fullPath">
  <mob-head />
  <nav-bar />
  <crumbs :crumbs="crumbs" />
  <div class="forInvestigation">
    <div class="widths">
      <h1 class="nav-title">问卷详情</h1>
      <div class="question-title">{{ questionBank.title }}</div>
      <div class="small-title">
        调查时间段：{{ questionBank.startTime }}至{{
            questionBank.endTime
            }}
      </div>
      <div class="small-title" v-if="questionBank.source">
        '来源：'{{ questionBank.source }}
      </div>
    </div>
    <div v-for="(item ,index) in questionBank.children" :key="index">
      <div class="topic">
        {{index+1}}、{{ item.title }}{{item.type =='1' ? '（单选）' : '（多选）'}}
      </div>
      <div class="widths">
        <van-radio-group v-model="item.radio" class="list" v-if="item.type =='1'">
          <van-radio class="item" :name="i.id" v-for="(i ,idx) in item.questionnaireOptions" :key="idx" @click="handleChangeRadio(i.id, index)">
            {{i.optionName}} {{i.name}}
          </van-radio>
        </van-radio-group>

        <van-checkbox-group v-model="item.checkbox" class="checkBox" v-if="item.type =='2'" @change="handleChangeCheckbox($event, index)">
          <van-checkbox ref="checkboxItem" class="checkBox-item" :name="i.id" v-for="(i ,idx) in item.questionnaireOptions" :key="idx" @click="handleClickCheckbox(idx)">
            {{i.optionName}} {{i.name}}
          </van-checkbox>
        </van-checkbox-group>
        <!---->
        <!-- echars柱形图 -->
        <div>
          <div :id="`wjdcMap-${item.id}`" :style="{width: '100%', height: '6.799rem'}"></div>
        </div>

        <!-- echars柱形图 -->

      </div>
    </div>
    <div class="submitBtn" @click="submitBtn">
      提交
    </div>

    <div class="halvingLine"></div>

    <div class="widths">
      <div class="nextLink" v-if="questionBank.preQuestionnaire" @click="otherPages(questionBank.preQuestionnaire.id)">
        <div class="time">上一篇</div>
        <div class="flex">
          <div class="overflow-ellipsis">{{questionBank.preQuestionnaire.title}}</div>
          <div><span>投票</span></div>
        </div>
        <div class="time">{{questionBank.preQuestionnaire.updateTime | myData}}</div>
      </div>
      <div class="nextLink" v-if="questionBank.nextQuestionnaire" @click="otherPages(questionBank.nextQuestionnaire.id)">
        <div class="time">下一篇</div>
        <div class="flex">
          <div class="overflow-ellipsis">{{questionBank.nextQuestionnaire.title}}</div>
          <div><span>投票</span></div>
        </div>
        <div class="time">{{questionBank.nextQuestionnaire.updateTime | myData}}</div>
      </div>

    </div>

  </div>
  <mob-footer />
</div>
</template>

<script>
import {
  Dialog
} from 'vant';
import {
  myData
} from "@/assets/js/globalFilter";
import MobHead from "@/components/control/mobHead/MobHead";
import NavBar from "@/components/control/navBar/NavBar";
import Crumbs from "@/components/control/crumbs/Crumbs";
import MobFooter from "@/components/control/mobFooter/MobFooter";
import {
  questionnaire,
  questionnaireSubmit
} from "@/api/request";

export default {
  name: "ForInvestigationInfo",
  components: {
    MobFooter,
    Crumbs,
    NavBar,
    MobHead
  },
  inject: ['reload'],
  data() {
    return {
      type: 0, //单选（1）||多选（2）
      crumbs: [{
          name: '互动交流',
          path: '/interaction'
        },
        {
          name: '征集调查',
          path: '/interaction/forinvestigation'
        },
        {
          name: '调查详情',
          path: ''
        }
      ],
      options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      radio: '', //当前选择的选项
      result: [], //当前选择的复选框
      questionBank: {},
      abscissa: [],
      verticalCoordinate: []
    }
  },
  mounted() {
    this.firstLoad()
  },
  methods: {
    handleChangeRadio (label, index) {
      const questionBank = Object.assign({}, this.questionBank);
      questionBank.children[index].radio = label;
      this.questionBank = questionBank;
    },
    handleClickCheckbox (index) {
      this.$forceUpdate();
    },
    handleChangeCheckbox (status, index) {
      const questionBank = Object.assign({}, this.questionBank);
      questionBank.children[index].checkbox = status;
      this.questionBank = questionBank;
    },
    submitBtn() {
      let optionId = []
      this.questionBank.children.forEach(i => {
        if (i.type == '2') {
          if (i.checkbox && i.checkbox.length < 2) {
            Dialog({
              message: '多选至少需要选中两项'
            });
            return
          } else {
            i.checkbox.length && (optionId = optionId.concat(i.checkbox))
          }
        } else {
          i.radio && optionId.push(i.radio)
        }
      })
      questionnaireSubmit({
        optionId: optionId.join(",")
      }).then(res => {
        if (res.code == 200 || res.code == 0) {
          Dialog({
            message: '提交成功'
          });
          this.$router.push({
            name: 'home'
          })
        }
      })
    },
    // 获取图表
    getWjdcMap(id, abscissa, verticalCoordinate) {
      let _this = this;
      let colors = [
        "#006565",
        "#65004B",
        "#003C65",
        "#f77281",
        "#995424",
        "#993024",
        "#223042",
        "#103e66",
        "#34689b",
        "#4d93d3",
        "#9dc3e6",
        "#bdd7ee",
        "#8faadc",
        "#4472c4"
      ];
      let wjdcMap = this.$echarts.init(document.getElementById("wjdcMap-" + id));
      wjdcMap.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{c}%' //点击柱形图显示对应的数据
        },
        color: ["#FFF", "#000"],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "5%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: abscissa,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#E5E5E5"
            }
          },
          axisLabel: {
            color: "#333333"
          }
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: "#333333",
            formatter: "{value}%"
          },
          max: 100,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#E5E5E5"
            }
          }
        },
        series: {
          data: verticalCoordinate,
          type: "bar",
          barWidth: "60%",
          name: "柱状图",
          itemStyle: {
            normal: {
              color: function (params) {
                return colors[params.dataIndex];
              }
            },
            label: {
              show: true,
              position: 'top',
              formatter: '{c}%' //这是关键，在需要的地方加上就行了
            }
          }
        }
      });
    },
    // 获取问卷题库
    firstLoad(id) {
      questionnaire(id || this.$route.query.id).then(res => {
        if (res.code == 200 || res.code == 0) {
          this.questionBank = res.result
          this.questionBank.children = this.questionBank.children.map(i => {
            i.radio = ''
            i.checkbox = []
            return i
          });
          this.$nextTick(() => {
            this.questionBank.children.forEach(i => {
              const verticalCoordinate = [],
                abscissa = []
              for (let j of i.questionnaireOptions) {
                verticalCoordinate.push(j.selectedNum);
                abscissa.push(j.optionName);
              }
              this.getWjdcMap(i.id, abscissa, verticalCoordinate);
            });
          })
        }
      })
    },
    otherPages(id) {
      this.firstLoad(id)
      document.body.scrollTop = 0
      // firefox
      document.documentElement.scrollTop = 0
      // safari
      window.pageYOffset = 0
    }
  }
}
</script>

<style lang="less" scoped>
/*复选框*/
/deep/ .checkBox {
  & /deep/ .checkBox-item {
    font-size: .37rem;
    padding: .43rem 0;
    border-bottom: #F2F3F5 solid .02666rem;
  }
}

/deep/ .van-checkbox__icon .van-icon {
  width: 1em;
  height: 1em;
  margin-top: .05rem;
}

.forInvestigation {
  .small-title {
    height: 0.32rem;
    font-size: 0.32rem;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #979899;
    line-height: 0.32rem;
    margin-bottom: 0.34rem;
  }

  .question-title {
    height: 0.58rem;
    font-size: 0.42rem;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: #323333;
    line-height: 0.58rem;
    margin-bottom: 0.32rem;
  }

  .topic {
    background: #F2F3F5;
    padding: .37rem 4%;
    font-size: .43rem;
    color: #323333;
    font-weight: 500;

    /* 单选 */
    .list {

      /*margin-top: .5rem !important;*/
      /deep/ .item {
        font-size: .37rem;
      }
    }
  }

  & /deep/ .van-radio-group {
    .van-radio__label {
      font-size: .32rem;

    }
  }

  /deep/ .van-radio {
    padding: .43rem 0rem;
  }

  .submitBtn {
    background: #245399;
    color: #fff;
    margin: .853rem 0.42rem 0rem 0.42rem;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    font-size: .43rem;
    border-radius: .6rem;
  }

  .halvingLine {
    background: #F2F3F5;
    height: .266rem;
    margin-top: .8rem;
  }

  .nextLink {
    margin-top: .43rem;
    border-bottom: 0.02667rem solid #ebedf0;
    padding-bottom: .666rem;
  }

  .nextLink:last-child {
    margin-bottom: .9rem;
    border-bottom: none;
  }

  .flex {
    display: flex;
    justify-content: space-between;
    height: .586rem;
    line-height: .586rem;
    margin: .21rem 0;

    .overflow-ellipsis {
      font-size: .43rem;
    }

    span {
      color: #235399;
      font-size: .32rem;
      padding: .1rem .2rem;
      background: #F2F3F5;
      border-radius: .6rem;
    }
  }
}
</style>
