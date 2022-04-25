<template>
	<!-- 分数统计 -->
	<div>
		<p class="title">已有音频文件质检分数统计图</p>
		<div class="stats">
			<div id="stats-bar"></div>
			<div id="stats-pie"></div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import * as echarts from "echarts";
import { statsCount } from "./api";
const xAxis = reactive({ value: [] });
const yAxis = reactive({ value: [] });

async function getData() {
	const data = await statsCount({});
	console.log(data);
	if (data.code === 200) {
		console.log(data.data?.x);
		xAxis.value = data.data?.x;
		yAxis.value = data.data?.y;
	}
}

onMounted(async () => {
	// @ts-ignore
	const bar = echarts.init(document.getElementById("stats-bar"));
	// @ts-ignore
	const pie = echarts.init(document.getElementById("stats-pie"));
	await getData();
	console.log(xAxis.value, yAxis.value);
	bar.setOption({
		tooltip: {},
		xAxis: {
			data: xAxis.value,
		},
		yAxis: {},
		series: [
			{
				name: "文件个数",
				type: "bar",
				data: yAxis.value,
			},
		],
	});

	pie.setOption({
		tooltip: {
			trigger: "item",
		},
		series: [
			{
				type: "pie",
                name:'文件个数',
				roseType: "radius",
				stillShowZeroSum: false,
				data: yAxis.value.map((item, index) => {
					return {
						value: item,
						name: xAxis.value[index],
					};
				}),
			},
		],
	});
});
</script>
<style lang="less" scoped>
.title {
	text-align: center;
	font-size: 1.2rem;
	font-weight: 600;
	color: #666666;
}
.stats {
	display: flex;
}
#stats-bar {
	width: 80%;
	height: 300px;
	flex: 1;
}
#stats-pie {
	width: 80%;
	height: 300px;
	flex: 1;
}
</style>
