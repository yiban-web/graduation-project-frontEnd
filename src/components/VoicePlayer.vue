<!-- 音频播放器组件 -->
<template>
	<div class="player" >
		<!-- <img :src="playState ? pause : play" alt="" @click="changePlayState" />
		<span>{{ `${dayjs(timeDayJs).format("mm:ss")}` }}</span>
		<div class="lines" id="player-lines"></div> -->
		<audio controls :src="voiceUrl" style="height:40px;">
			Your browser does not support the
			<code>audio</code> element.
		</audio>
	</div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import dayjs from "dayjs";
// @ts-ignore
import back from "../assets/back.png";
// @ts-ignore
import pause from "../assets/pause.png";
// @ts-ignore
import play from "../assets/play.png";

const props = defineProps({
	voiceUrl: {
		type: String,
		default: "",
	},
	voiceTimeLong: {
		type: Number,
		default: 0,
	},
});

console.log(props.voiceUrl);

const router = useRouter();
const playerWidth = 200;

// 播放状态，0暂停 1播放
const playState = ref(0);

const linesNode = ref();

// 播放的时长
const playedTime = ref(0);

let timeDayJs = ref(
	dayjs()
		.minute(props.voiceTimeLong / 60)
		.second(props.voiceTimeLong % 60)
);

let timer: number | null | undefined = null;

function changePlayState() {
	playState.value === 1 ? clearTimeout(timer || undefined) : count();
	playState.value = (playState.value + 1) % 2;
}
function goback() {
	router.go(-1);
}

// 创建音频波形
function creatLineItem() {
	playedTime.value++;
	timeDayJs.value = dayjs(timeDayJs.value).subtract(1, "second");
	const newLine = document.createElement("div");
	newLine.className = "lines-item";
	newLine.style.height = `${Math.floor(Math.random() * (25 - 5 + 1)) + 1}px`;
	newLine.style.width = "2px";
	newLine.style.backgroundColor = "white";
	newLine.style.marginRight = "5px";
	linesNode.value?.appendChild(newLine);
}
function count() {
	timer = setTimeout(() => {
		creatLineItem();
		count();
	}, 1000);
}

watch(playedTime, (value, old) => {
	if (value >= props.voiceTimeLong) {
		playState.value = 0;
		playedTime.value = 0;
		linesNode.value.innerHTML = "";
		timeDayJs.value = dayjs()
			.minute(props.voiceTimeLong / 60)
			.second(props.voiceTimeLong % 60);
		clearTimeout(timer || undefined);
	}
});
// onMounted(() => {
// 	linesNode.value = document.querySelector("#player-lines");
// 	//console.log(linesNode.value)
// });
</script>

<style lang="less" scoped>
.player {
	// background-color: var(--el-color-info-dark-2);
	height: 32px;
	border-radius: 20px;
	display: flex;
	align-items: center;
	span {
		color: white;
		margin: 0 5px;
	}
	img {
		cursor: pointer;
	}
	.lines {
		// margin-left: 10px;
		height: 100%;
		display: flex;
		align-items: center;
		&-item {
			width: 2px;
			height: 15px;
			background-color: white;
			margin-right: 5px;
		}
	}
}
</style>
