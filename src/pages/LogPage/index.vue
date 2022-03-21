<template>
  <div class="main">
    <p class="title">大规模语音数据智能质检系统</p>
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
          :inputType="item.inputType"
          :showPassword="item.showPassword"
          :clearable="item.clearable"
        ></new-input>
      </div>

      <div class="btns">
        <el-button type="primary" @click="submit" :disabled="!(userName.state && password.state)">登录</el-button>
        <el-button @click="goRegister">注册</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
import NewInput from "../../components/NewInput.vue";
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref } from "vue";

const userName = reactive({
  value: "",
  state: false,
});
const password = reactive({
  value: "",
  state: false,
});
const router = useRouter()

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
    getValue: getPassword,
    regular: "^([0-9]|[a-z]|[A-Z]){6,8}$",
    errText: "密码格式不正确",
    inputType: "password",
    showPassword: true,
    clearable: false,
  },
];
function getUserName(params: string, state: boolean) {
  userName.value = params;
  userName.state = state;
}
function getPassword(params: string, state: boolean) {
  password.value = params;
  password.state = state;
}

function submit() {
  console.log(userName.value, password.value);
      ElMessage({
      message: "接口还没写，就当成功了吧",
      type: "warning",
    });
    router.push({
      path:'/main/had'
    })
}

function goRegister() {
    router.push({
        name:'register'
    })
}

</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.body {
  width: 30vw;
  height: 19vw;
  //border: 1px solid black;
  padding: 20px 50px;
  box-shadow: 2px 4px 13px 5px #b4b3b375;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.title {
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 0;
  color: var(--el-color-primary);
}

.el-button + .el-button {
  margin-left: 10px;
}

.btns {
  display: flex;
  width: 100%;
}
.el-button {
  flex: 1;
}
</style>
