<template>
	<div>
		<p>12312</p>
		<p>{{ msg }}</p>
	</div>
</template>
<script lang="ts">
// mobile + vant
import { defineComponent, PropType } from "vue";
export default defineComponent({
	data: () => {
		return {
			msg: "123",
		};
	},
});
</script>
<style lang="less" scoped></style>
