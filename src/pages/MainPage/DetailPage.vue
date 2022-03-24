<!-- 语音详情页 -->
<template>
	<div style="font-size: 0.85rem;">
		<div class="back-box">
			<img :src="back" alt="" srcset="" @click="goback" />
			<span class="back" @click="goback">返回</span>
		</div>
		<p>{{ `语音详情 id=${voiceId}` }}</p>
		<p>语音名称：<span>aushduiasbk.mp3</span></p>
		<voice-player
			:voice-url="voiceUrl"
			:voice-time-long="voiceTimeLong"
		></voice-player>
		<p class="grade">最终得分：<span>90</span></p>
		<hr  SIZE=1 class="cut-off">
		<div class="keys-tags">
			<p>关键字标签：</p>
			<div class="keys-tags-all">
				<div class='keys-tags-item' v-for="(item,index) in voiceTagsList" :key="index">
					<span>{{item}}</span>
				</div>
			</div>
		</div>
		<hr  SIZE=1 class="cut-off">
		<el-link type="info" @click="showText = !showText">{{`${showText?'关闭':'展开'}文本`}}</el-link>
		<div v-show="showText">
			<!-- 具体文本显示 -->
			<new-textarea></new-textarea>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
// @ts-ignore
import VoicePlayer from "../../components/VoicePlayer.vue";
// @ts-ignore
import NewTextarea from "../../components/NewTextarea.vue"
import dayjs from "dayjs";
// @ts-ignore
import back from "../../assets/back.png";
// @ts-ignore
import pause from "../../assets/pause.png";
// @ts-ignore
import play from "../../assets/play.png";
const voiceId = useRoute().query.id;
const router = useRouter();
const playerWidth = 200;

const showText = ref(false)

// 播放状态，0暂停 1播放
const playState = ref(0);

// 音频地址
const voiceUrl = 'https://graduation-project-1257750000.cos.ap-chengdu.myqcloud.com/voice/4461c2ce0c64dd14.mp3';

// 播放的时长
const playedTime = ref(0)

// 音频总时长
const voiceTimeLong = 16;

const voiceTagsList = ['银行客服','公安']

function goback() {
	router.go(-1);
}
</script>
  
<style lang="less" scoped>
.back-box {
	align-items: center;
	display: flex;

	img {
		width: 20px;
		cursor: pointer;
		height: 20px;
	}
}
.back {
	color: var(--el-color-info-light-3);
	font-size: 0.8rem;
	cursor: pointer;
	margin-left: 5px;
}

.grade {
	span {
		font-size: 1.4rem;
		font-weight: 600;
		color: #ff9900;
	}
}

.keys-tags {
	text-align: 0.85rem;
	&-all {
		display: flex;
		flex-wrap: wrap;
	}
	&-item {
		@color:#006699;
		padding: 4px 6px;
		// background-color: #0099CC;
		border-radius: 10px;
		box-shadow: 1px 1px 4px 1px #0099cca6;
		margin-right: 12px;
		border: @color solid 1px;
		color:@color
	}
}
.cut-off{
	width: 100%;
	color: var(--el-color-info-light-3);
	margin-top: 15px;
}
</style>
