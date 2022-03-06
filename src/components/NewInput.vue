<template>
  <div class="input-box">
    <label for="" class="input-box-label">{{ label }}</label>
    <div class="input">
      <el-input
        v-model="inputValue"
        :placeholder="props.placeholder"
        @input="change"
        :clearable="props.clearable"
        :type="props.inputType"
        :show-password="props.showPassword"
      />
    </div>
    <p v-show="!state" class="err-text">{{ `*${errText}` }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  label: {
    type: String,
    default: "test",
  },
  regular: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  errText: {
    type: String,
    default: "",
  },
  inputType: {
    type: String,
    default: "text",
  },
  showPassword: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["getValue"]);
const inputValue = ref("");
const state = ref(true);
function change(params: any) {
  const re = new RegExp(props.regular);
  // console.log(params,re.test(params))
  state.value = re.test(params);
  emit("getValue", params, re.test(params));
}
</script>

<style lang="less" scoped>
.input-box {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 30px;
  &-label {
    color: var(--el-color-primary);
    flex: 1;
    width: 80px;
    text-align: right;
    margin-right: 10px;
  }
}
.input {
  flex: 4;
}
.err-text {
  padding: 0;
  margin: 0;
  position: absolute;
  top: 40px;
  font-size: 0.6rem;
  text-align: center;
  right: 0;
  color: var(--el-color-danger-dark-2);
}
</style>
