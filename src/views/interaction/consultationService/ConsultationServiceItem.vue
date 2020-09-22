<template>
  <div>
    <mob-head/>
    <nav-bar/>
    <crumbs :crumbs="crumbs"/>
    <div class="widths">
      <h1 class="nav-title">咨询服务</h1>
    </div>
    <div class="hint">提示：带<span class="symbol">*</span>内容为必选项</div>
    <div class="inputs widths ">
      <div class="title">
        <div class="left-test">
          姓名 <span class="symbol">*</span>
        </div>
        <div class="right-test">
          <div class="warp">
            <van-field v-model="name" placeholder="请输入姓名"/>
          </div>
        </div>
      </div>
      <!-- 手机 -->
      <div class="title">
        <div class="left-test">
          手机 <span class="symbol">*</span>
        </div>
        <div class="right-test">
          <div class="warp">
            <van-field v-model="mobile" type="tel" placeholder="请输入手机号" maxlength="11" :formatter="formatter"/>
          </div>
        </div>
      </div>
      <!--联系方式-->
      <div class="title">
        <div class="left-test">
          联系方式
        </div>
        <div class="right-test">
          <div class="warp">
            <van-field v-model="otherMobile" placeholder="请输入联系方式"/>
          </div>
        </div>
      </div>

      <div class="line-line">
        <div class="left"></div>
        <div class="right"></div>
      </div>
      <!--投诉对象-->
      <div class="title">
        <div class="left-test">
          投诉对象 <span class="symbol">*</span>
        </div>
        <div class="right-test">
          <div class="warp">
            <div class="select">
              <!-- onmouseover="size=10;" onmouseout="size=1;" onchange="size=1;" -->
              <van-action-sheet v-model="show" :actions="actions" @select="onSelect"/>
              <div class="changeObject" v-if="!object.length" @click="changeObjectFn">请选择</div>
              <div class="changeObj" v-if="object.length" @click="changeObjectFn">{{object}}</div>
              <!--<select v-else id="orderTimeDataSel1" class="text"  v-model="object" placeholder="请选择">-->
              <!--&lt;!&ndash;<option value="" selected class="maskOption">请选择</option>&ndash;&gt;-->
              <!--<option :value="item.value" v-for="item in options">{{item.label}}</option>-->
              <!--</select>-->
            </div>
          </div>
        </div>
      </div>
      <!--主题-->
      <div class="title">
        <div class="left-test">
          主题
        </div>
        <div class="right-test">
          <div class="warp">
            <van-field v-model="title" placeholder="请输入标题"/>
          </div>
        </div>
      </div>
      <!--内容-->
      <div class="title-area" style="height: 4rem;">
        <div class="left-test">
          内容 <span class="symbol">*</span>
        </div>
        <div class="right-test">
          <div class="warp">
            <!--<textarea class="area" cols="15" rows="4" v-model="content" style="border: none" placeholder="请输入"></textarea>-->
            <van-field v-model="content" rows="6" type="textarea" placeholder="请输入留言"/>
          </div>
        </div>
      </div>

      <div class="line-line">
        <div class="left"></div>
        <div class="right"></div>
      </div>
      <!-- 上传附件 -->
      <div class="title">
        <div class="left-test">
          上传附件
        </div>
        <div class="right-test">
          <div class="warp upload-file">
            <van-uploader :after-read="afterRead" accept="*">
              <span class="upload-file-name overflow-ellipsis" v-if="uploadFileName.length">{{uploadFileName}}</span>
              <van-field v-else center clearable label="" placeholder="请选择文件" @focus="upFile"/>

            </van-uploader>
          </div>
        </div>
      </div>
      <!--验证码-->
      <div class="title">
        <div class="left-test">
          验证码 <span class="symbol">*</span>
        </div>
        <div class="code-wrap">
          <div class="code">
            <van-field v-model="sms" placeholder="验证码" maxlength="4"/>
            <!--<input placeholder="验证码"/>-->
          </div>
          <div class="createdCode">
            <CreateCode slot="button" :contentWidth="100" :height="50" :fontSizeMax="30"/>
          </div>
        </div>
      </div>

      <div class="note">备注：注意 :为准确了解您的诉求，方便进一步沟通，并及时告知您办理结果，请您填写真实姓名和联系方式</div>

      <button class="submit" @click="submitMsg">提交</button>
    </div>

    <mob-footer/>

  </div>
</template>

<script>

  import PubSub from 'pubsub-js'

  import CreateCode from "@/components/common/createCode";
  import MobHead from "@/components/control/mobHead/MobHead";
  import NavBar from "@/components/control/navBar/NavBar";
  import Crumbs from "@/components/control/crumbs/Crumbs";
  import MobFooter from "@/components/control/mobFooter/MobFooter";

  import {uploadFile, consultAdd} from "@/api/request";
  import {options} from "@/assets/js/complaintObject";


  export default {
    name: "ConsultationServiceItem",//咨询服务
    components: {MobFooter, Crumbs, NavBar, MobHead, CreateCode},
    data() {
      return {
        show: false,
        actions: [
          // { name: '选项3', subname: '描述信息' }
        ],

        crumbs: [
          {name: '互动交流', path: '/interaction'},
          {name: '咨询服务', path: '/interaction/consultationservice'},
          {name: '咨询服务', path: '/interaction/consultationservice/consultationserviceitem'},
        ],
        options: [],//投诉对象列表
        name: '',//姓名
        mobile: '',//电话
        otherMobile: '',//其他联系方式
        object: '',//咨询投诉对象
        title: '',//
        content: '',//回复内容
        message: '',
        createCode: '',
        sms: '',
        fileList: [],
        uploadFileName: '',//上传文件名
        changeObject: true,//选择对象
      }
    },
    mounted() {
      this.options = options;
      this.actions = [];
      //  遍历添加下拉框
      for (let i of this.options) {
        // console.log(i.value);
        let obj = {};
        obj.name = i.value;
        obj.subname = i.name;
        this.actions.push(obj)
      }
    },
    created() {
      PubSub.subscribe('codeMsg', (msg, data) => {
        console.log('接受', msg, data)
        this.createCode = data
      });
    },
    methods: {
      onSelect(item) {
        // 默认情况下点击选项时不会自动收起
        // 可以通过 close-on-click-action 属性开启自动收起
        this.show = false;
        this.object = item.name;
      },
      formatter(value) {
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))) {
          this.$toast('手机号码有误，请重填');
          return value.replace(/\d/g, '');
        }
        // return value.replace(/\d/g, '');
      },
      changeObjectFn() {
        this.changeObject = false
        this.show = true
      },
      checkSms() {
        // console.log('checkSms');
        if (this.sms.toLowerCase() != this.createCode.toLowerCase()) {
          this.$toast('验证码不正确');
          this.sms = '';
          return false;
        }
      },
      //上传附件
      upFile() {
      },
      afterRead(file) {
        // 此时可以自行将文件上传至服务器
        const formData = new FormData()
        formData.append('file', file.file)
        formData.append('token', "token")
        uploadFile(formData).then(res => {
          console.log(res);
          this.uploadFileName = res.result.original;
          if (res.code == 200) {
            this.$toast('上传成功');
          } else {
            this.$toast(res.message);
          }
        })
        // console.log(file);
      },
      submitMsg() {
        const {name, mobile, otherMobile, object, title, content, message} = this;
        console.log('输入', this.sms.toLocaleUpperCase());
        console.log('系统', this.createCode.toLocaleUpperCase());

        if (!name.trim()) {
          this.$toast('姓名不能为空')
          return false
        }
        if (!mobile.trim()) {
          this.$toast('手机不能为空')
          return false
        }
        if (mobile.length<10) {
          this.$toast('手机格式不正确')
          return false
        }
        if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(mobile))) {
          this.$toast('手机号码有误，请重填');
          return false;
        }
        if (!object) {
          this.$toast('投诉对象不能为空')
          return false
        }
        if (!content.trim()) {
          this.$toast('内容不能为空')
          return false
        }
        if (!this.sms) {
          this.$toast('验证码不能为空')
          return false
        }
        console.log(this.sms.toLocaleUpperCase().trim().toString() == this.createCode.toLocaleUpperCase().trim().toString());
        if (this.sms.toLocaleUpperCase().trim().toString() != this.createCode.toLocaleUpperCase().trim().toString()) {
          this.$toast('验证码不正确')
          PubSub.publish('upData');
          return false;
        }
        // console.log(name, mobile, otherMobile, object, title, content, message)
        consultAdd({name, mobile, otherMobile, object, title, content, message, type: 2}).then(res => {
          // console.log(res);
          if (res.code == 200) {
            this.$toast(res.message)
            this.$router.push({
              name: 'SubmitOk',
              query: {id: res.result.id, code: res.result.code, cxCode: res.result.cxCode},
              params: {crumbs: JSON.stringify(this.crumbs)}
            })
          } else {
            this.$toast(res.message)
          }
        })
        // this.$router.push({name:'WriteMsgSubmitOk'})

      }
    }
  }
</script>

<style lang="less" scoped>
  .title-area {
    /deep/ .van-cell {
      height: 3.5rem;
    }
  }

  .changeObject {
    color: #969799;
    font-size: .37rem;
    line-height: 1.2rem;
    padding-left: 0.42667rem;
  }
  .changeObj{
    color: #323233;
    font-size: .37rem;
    line-height: 1.2rem;
    padding-left: 0.42667rem;
  }

  /* 0.42667rem */
  .code {
    /deep/ .van-cell__value {
      position: relative;
      left: 11%;
    }
  }

  .upload-file-name {
    font-size: 0.37rem;
    display: block;
    line-height: 1.2rem;
    margin-top: .2rem;
    padding-left: 0.42667rem;
  }

  /deep/ .van-cell:not(:last-child)::after {
    border-bottom: none;
  }

  .upload-file {
    /deep/ .van-cell__value {
      position: relative;
      left: -50%;
    }
  }

  /deep/ .van-cell {
    height: 1.1rem;
  }

  /deep/ .van-uploader {
    position: relative;
    z-index: 5;
    top: -0.2666rem;
  }

  .inputs {

    .title {
      margin-top: .32rem;
      width: 100%;
      height: 1.2rem;
      line-height: 1.2rem;
      display: flex;
      justify-content: space-between;
      .left-test {
        width: 30%;
        font-size: .37rem;
      }
      .right-test {
        width: 70%;
        border: .0266rem solid #D8DCE6;
        border-radius: .2rem;
        .warp {
          width: 90%;
          margin: 0 auto;
          overflow: hidden;
          position: relative;
        }
      }
    }

    /*横线*/
    .line-line {
      width: 100%;
      height: .64rem;
      padding-bottom: .32rem;
      display: flex;
      justify-content: space-between;
      .left {
        width: 30%;
      }
      .right {
        width: 70%;
        border-bottom: .0266rem solid #D8DCE6;
      }
    }

    /* 下拉框 */
    .select {
      margin-top: 0px;
      outline: none;
      /*border: 1px solid #BBBBBB;*/
      /*border-radius: .2rem;*/
      position: relative;
      .text {
        height: 1.1rem;
        -webkit-appearance: none;
        appearance: none;
        border: none;
        font-size: .37rem;
        padding: 0px 0.42667rem;

        display: block;
        width: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #FFFFFF;
        color: #333333;
        border-radius: .2rem;
        .maskOption {
          /*color: red;*/
        }
      }
    }

    /* 文本域 */
    .title-area {
      margin-top: .32rem;
      width: 100%;
      /*height: 1.2rem;*/
      line-height: 1.2rem;
      display: flex;
      justify-content: space-between;
      .left-test {
        width: 30%;
        font-size: .37rem;
      }
      .right-test {
        width: 70%;
        border: .0266rem solid #D8DCE6;
        border-radius: .2rem;
        .warp {
          width: 90%;
          margin: 0 auto;
          overflow: hidden;
          .area {
            width: 90%;
            margin-left: 6.5%;
            margin-top: 0.026rem;
            font-size: .37rem;
          }
        }
      }
    }

    /* 验证码 */
    .code-wrap {
      width: 70%;
      /*border: .0266rem solid #D8DCE6;*/
      /*background: skyblue;*/
      border-radius: .2rem;
      display: flex;
      justify-content: space-between;
      line-height: 1.2rem;
      .code {
        font-size: .37rem;
        border: .0266rem solid #D8DCE6;
        border-radius: .2rem;
        width: 55%;
        overflow: hidden;
      }
      .createdCode {
        width: 40%;
        overflow: hidden;
        vertical-align: center;

        /*background: skyblue;*/
      }
    }

    .note {
      margin-top: .5rem;
      height: 32px;
      font-size: .32rem;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #979899;
      line-height: 16px;
    }

  }

  .symbol {
    color: #FF1616;
  }

  .hint {
    background: #FFF4F4;
    height: .8rem;
    line-height: .8rem;
    font-size: .32rem;
    color: #656566;
    padding-left: 4%;
    margin-bottom: .106665rem;

  }

  .submit {
    background: #245399;
    width: 100%;
    color: #fff;
    border-radius: 1rem;
    height: 1.2rem;
    line-height: 1.2rem;
    font-size: .43rem;
    border: none;
    margin: .64rem auto 1rem auto;
  }

  .createdCode {
    /*width: 2.5rem;*/
    width: 104%;
  }


</style>
