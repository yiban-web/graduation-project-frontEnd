<template>
  <div>
    <div class="main">
      <p class="title">大规模语音数据智能质检系统-注册</p>
      <div class="body">
        <div>
          <new-input
            v-for="(item, index) in inputList"
            :key="index"
            :placeholder="item.placeholder"
            @getValue="item.getValue"
            :regular="item.regular"
            :errText="item.errText"
            class="input-item"
            :label="item.label"
            :inputType="item.password"
            :showPassword="item.showPassword"
            :clearable="item.clearable"
          ></new-input>
        </div>

        <div class="btn">
          <el-button type="primary" :disabled="canSubmit">注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from "vue";
const userName = reactive({
  value: "",
  state: false,
});
const passwordFir = reactive({
  value: "",
  state: false,
});
const passwordSec = reactive({
  value: "",
  state: false,
});
const inputList = [
  {
    label: "用户名",
    placeholder: "输入用户名(工号)",
    getValue: getUserName,
    regular: "^([0-9]|[a-z]|[A-Z]){0,4}$",
    errText: "用户名格式不正确",
    showPassword: false,
    clearable: true,
  },
  {
    label: "密码",
    placeholder: "输入密码",
    getValue: getPasswordFir,
    regular: "^([0-9]|[a-z]|[A-Z]){6,8}$",
    errText: "6-8位数字+字母组合",
    inputType: "password",
    showPassword: true,
    clearable: false,
  },
  {
    label: "确认密码",
    placeholder: "输入密码",
    getValue: getPasswordSec,
    regular: "^([0-9]|[a-z]|[A-Z]){6,8}$",
    errText: "两次密码不一致",
    inputType: "password",
    showPassword: true,
    clearable: false,
  },
];

const canSubmit = computed(()=>{
    return !(userName.state&&passwordFir.state&&passwordSec.state)
})
function getUserName(params: string, state: boolean) {
  userName.value = params;
  userName.state = state;
}
// 获得第一次密码
function getPasswordFir(params: string, state: boolean) {
  passwordFir.value = params;
  passwordFir.state = state;
}
// 获得第二次密码
function getPasswordSec(params: string, state: boolean) {
  passwordSec.value = params;
  passwordSec.state = state&&params===passwordFir.value;
}

</script>
<style lang="less" scoped>
@import url('./index.less');
.btn{
    width: 50%;
    margin: auto;
}
  .el-button {
    width: 100%;;
  }
</style>
