<template>
  <div>
    <mob-head/>
    <nav-bar/>
    <crumbs :crumbs="crumbs"/>
    <div class="widths">
      <h1 class="nav-title">我要写信</h1>
    </div>
    <div class="hint">提示：带<span class="symbol">*</span>内容为必选项，手机固话必填</div>
    <div class="inputs widths ">
      <div class="title">
        <div class="left-test">
          姓名 <span class="symbol">*</span>
        </div>
        <div class="right-test">
          <div class="warp">
            <van-field v-model="name" placeholder="请输入姓名" />
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
            <van-field v-model="mobile" placeholder="请输入手机号"  maxlength="11" :formatter="formatter"/>
          </div>
        </div>
      </div>
      <!-- 邮箱 -->
      <div class="title">
        <div class="left-test">
          邮箱 <span class="symbol">*</span>
        </div>
        <div class="right-test">
          <div class="warp">
            <van-field v-model="email" placeholder="请输入邮箱" />
          </div>
        </div>
      </div>
      <!--固话-->
      <div class="title">
        <div class="left-test">
          固话
        </div>
        <div class="right-test">
          <div class="warp">
            <van-field v-model="tel" placeholder="请输入固话" />
          </div>
        </div>
      </div>

      <div class="line-line">
        <div class="left"></div>
        <div class="right"></div>
      </div>
      <!-- 地址 -->
      <div class="title">
        <div class="left-test">
          地址 <span class="symbol">*</span>
        </div>
        <div class="right-test">
          <div class="warp">
            <van-field v-model="address" placeholder="请输入地址" />
          </div>
        </div>
      </div>
      <!--邮编-->
      <div class="title">
        <div class="left-test">
          邮编
        </div>
        <div class="right-test">
          <div class="warp">
            <van-field v-model="postcode" placeholder="请输入邮编" />
          </div>
        </div>
      </div>

      <div class="line-line">
        <div class="left"></div>
        <div class="right"></div>
      </div>
      <!--主题-->
      <div class="title">
        <div class="left-test">
          主题
        </div>
        <div class="right-test">
          <div class="warp">
            <van-field v-model="topic" placeholder="请输入主题" />
          </div>
        </div>
      </div>


      <!--内容-->
      <div class="title-area">
        <div class="left-test">
          内容 <span class="symbol">*</span>
        </div>
        <div class="right-test">
          <div class="warp">
            <!--<textarea class="area" cols="15" rows="4" v-model="content" style="border: none"></textarea>-->
            <van-field v-model="content" rows="6" type="textarea" placeholder="请输入留言"/>
          </div>
        </div>
      </div>

      <div class="line-line">
        <div class="left"></div>
        <div class="right"></div>
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


      <div class="note">备注：来信内容简明扼要，说清事实，原则上反映一个问题</div>



      <button class="submit" @click="submitMsg">提交</button>
    </div>

    <div class="inputs widths " v-if="false">
      <div class="listInput">
        <div class="left">姓名</div>
        <div class="center"> *</div>
        <div class="right">
          <!--<input v-model="name" type="text" placeholder="请输入姓名"/>-->
          <van-field v-model="name" placeholder="请输入姓名" />
        </div>
      </div>

      <div class="listInput">
        <div class="left">邮箱</div>
        <div class="center"> *</div>
        <div class="right">
          <!--<input v-model="email" type="email" placeholder="请输入邮箱"/>-->
          <van-field v-model="email" placeholder="请输入邮箱" />
        </div>
      </div>

      <div class="listInput">
        <div class="left">手机</div>
        <div class="center"> *</div>
        <div class="right">
          <!--<input v-model="mobile" type="number" placeholder="请输入手机号"/>-->
          <van-field v-model="mobile" placeholder="请输入手机号" />
        </div>
      </div>

      <div class="listInput">
        <div class="left">固话</div>
        <div class="center"> </div>
        <div class="right">
          <!--<input v-model="tel" type="number" placeholder="请输入固话"/>-->
          <van-field v-model="tel" placeholder="请输入固话" />
        </div>
      </div>

      <div class="line"></div>

      <div class="listInput">
        <div class="left">地址</div>
        <div class="center"> *</div>
        <div class="right">
          <!--<input v-model="address" type="text" placeholder="请输入地址"/>-->
          <van-field v-model="address" placeholder="请输入地址" />
        </div>
      </div>

      <div class="listInput">
        <div class="left">邮编</div>
        <div class="center"></div>
        <div class="right">
          <!--<input v-model="postcode" type="number" placeholder="请输入邮编"/>-->
          <van-field v-model="postcode" placeholder="请输入邮编" />
        </div>
      </div>
      <!--<van-field required v-model="address" type="text" label="地址" placeholder="请输入地址"/>-->
      <!--<van-field v-model="postcode" type="number" label="邮编" placeholder="请输入邮编"/>-->

      <div class="line"></div>

      <div class="listInput">
        <div class="left">主题</div>
        <div class="center"></div>
        <div class="right">
          <!--<input v-model="topic" type="text" placeholder="请输入主题"/>-->
          <van-field v-model="topic" placeholder="请输入主题" />
        </div>
      </div>


      <!--<van-field v-model="topic" type="text" label="主题" placeholder="请输入主题"/>-->

      <div class="listInputContent">
        <div class="leftContent">内容</div>
        <div class="centerContent"> *</div>
        <div class="rightContent " placeholder="请输入内容" contenteditable="true">
          <textarea cols="31" rows="4"  v-model="content" style="border: none">
          </textarea>
        </div>
      </div>
      <!--<van-cell-group>-->
      <!--<van-field v-model="content" rows="5" autosize label="内容" class="area" type="textarea" maxlength="100"-->
      <!--placeholder="请输入内容" show-word-limit/>-->
      <!--</van-cell-group>-->

      <div class="codes">
        <div class="leftC">验证码</div>
        <div class="centerC"> *</div>
        <div class=" sms">
          <!--<input v-model="sms" type="text" placeholder="验证码"/>-->
          <van-field v-model="sms" placeholder="验证码" />
        </div>
        <div class="codes">
          <CreateCode slot="button" :contentWidth="120" :fontSizeMax="30"/>
        </div>
      </div>

      <!--<van-cell-group>-->
      <!--<van-field required v-model="sms" center clearable label="验证码" placeholder="验证码" @blur="checkSms">-->
      <!--<CreateCode slot="button" :contentWidth="100" :fontSizeMax="30"/>-->
      <!--</van-field>-->
      <!--</van-cell-group>-->

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

  import {letterAdd} from "@/api/request";

  // this.codes = tempCode
  export default {
    name: "WriteMsg",
    components: {MobFooter, Crumbs, NavBar, MobHead, CreateCode},
    data() {
      return {
        crumbs: [
          {name: '互动交流', path: '/interaction'},
          {name: '领导信箱', path: '/interaction/leadmsg'},
          {name: '我要写信', path: '/interaction/writemsg'},
        ],
        name: '',//姓名
        email: '',//邮箱
        mobile: '',//手机
        tel: '',//固话
        topic: '',//主题
        address: '',//地址
        postcode: '',//邮编
        content: '',//内容
        codes: '',
        sms: ''
      }
    },
    created() {
      PubSub.subscribe('codeMsg', (msg, data) => {
        console.log(data)
        this.codes = data
      });
    },
    methods: {
      formatter(value) {
        if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))){
          this.$toast('手机号码有误，请重填');
          return value.replace(/\d/g, '');
        }
        // return value.replace(/\d/g, '');
      },
      checkSms() {
        if (this.sms.toLowerCase() != this.codes.toLowerCase()) {
          this.$toast('验证码不正确')
          return false;
        }
      },
      submitMsg() {
        let that = this;
        const {name, email, mobile, tel, address, topic, content, postcode} = this;


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
        if (!email.trim()) {
          this.$toast('邮箱不能为空')
          return false
        }
        //
        let pattern = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (!(pattern.test(email))) {
          this.$toast('邮箱有误，请重填');
          return false;
        }
        if (!address.trim()) {
          this.$toast('地址不能为空')
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
        // console.log(this.sms.toLowerCase().trim().toString() == this.codes.toLowerCase().trim().toString());
        if (that.sms.trim().toLocaleUpperCase().toString() != that.codes.trim().toLocaleUpperCase().toString()) {
          that.$toast('验证码不正确')
          PubSub.publish('upData');
          this.sms = '';
          return false;
        }


        letterAdd({name, email, mobile, tel, address, topic, content, postcode}).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$router.push({
              name: 'WriteMsgSubmitOk',
              params: {id: res.result.id, code: res.result.code, cxCode: res.result.cxCode,title:'我要写信'}
            })
          }
        })
        // this.$router.push({name:'WriteMsgSubmitOk'})
      }
    }
  }
</script>

<style lang="less" scoped>
  .title-area{
    /deep/ .van-cell {
      height: 3.5rem;
    }
  }
  /deep/ .van-cell {
    height: 1.1rem;
  }
  /deep/ .van-uploader{
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
        .maskOption{
          color: red;
        }
      }
    }

    /* 文本域 */
    .title-area{
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
          .area{
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
      .code{
        font-size: .37rem;
        border: .0266rem solid #D8DCE6;
        border-radius: .2rem;
        width: 55%;
        overflow: hidden;
      }
      .createdCode{
        width: 40%;
        overflow: hidden;
        vertical-align: center;

        /*background: skyblue;*/
      }
    }

    .note{
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
