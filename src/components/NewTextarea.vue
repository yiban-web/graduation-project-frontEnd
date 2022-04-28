<template>
	<div class="textarea">
		<!-- {{ content }} -->
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
// 文本框组件
import { reactive, ref } from "vue";
// @ts-ignore
import { testText } from "./const.ts";

const prop = defineProps({
	content:{
		type:String,
		default:""
	}
})

const datas = `<p class='text'>1231231<span>123</span></p>`
</script>
<style lang="less" scoped>
.textarea {
	margin-top: 10px;
	white-space: pre-line;
	padding: 10px 20px;
	background-color: hsla(0, 0%, 80%, 0.459);
	border-radius: 10px;
	// line-height: 0.7rem;
	font-size: 0.7rem;
	margin-bottom: 15px;
	color: #464444;
	// text-align: center;
}
.text{
	color:red;
}
</style>
