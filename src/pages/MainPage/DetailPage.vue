<!-- 语音详情页 -->
<template>
	<div style="font-size: 0.85rem">
		<div class="back-box">
			<img :src="back" alt="" srcset="" @click="goback" />
			<span class="back" @click="goback">返回</span>
		</div>
		<!-- <p>{{ `语音详情 id=${voiceId}` }}</p> -->
		<p>
			语音名称：<span>{{ file.voiceName }}</span>
		</p>
		<voice-player
			:voice-url="file.voiceUrl"
			:voice-time-long="voiceTimeLong"
		></voice-player>
		<p class="grade">
			最终得分：<span>{{ file.voiceScore || "暂无" }}</span>
		</p>
		<hr SIZE="1" class="cut-off" />
		<div class="keys-tags">
			<p>关键字标签：</p>
			<div class="keys-tags-all" v-if="file.voiceTags.length!==0">
				<div
					class="keys-tags-item"
					v-for="(item, index) in file.voiceTags"
					:key="index"
				>
					<span>{{ item }}</span>
				</div>
			</div>
			<div v-else>
				暂无标签
			</div>
		</div>
		<hr SIZE="1" class="cut-off" />
		<el-link type="info" @click="showTextArea">{{
			`${showText ? "关闭" : "展开"}文本`
		}}</el-link>
		<div v-show="showText">
			<!-- 具体文本显示 -->
			<new-textarea :content="content"></new-textarea>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

// @ts-ignore
import VoicePlayer from "../../components/VoicePlayer.vue";
// @ts-ignore
import NewTextarea from "../../components/NewTextarea.vue";

// @ts-ignore
import back from "../../assets/back.png";
import { getFilesDetail, readTextFile } from "./api";

const voiceId = useRoute().query.id;
const router = useRouter();
const playerWidth = 200;

const showText = ref(false);

const file = reactive({
	voiceName: "",
	voiceUrl: "",
	voiceDuration: 0,
	voiceTextUrl: "",
	voiceScore: 0,
	voiceId: 0,
	voiceTags: "",
});

// 播放的时长
const playedTime = ref(0);

// 音频总时长
const voiceTimeLong = 16;

const voiceTagsList = ["银行客服", "公安"];

const content = ref("");

getFilesDetail({
	fileId: voiceId,
}).then((res) => {
	console.log(res);
	if (res.code == 200) {
		file.voiceName = res.data?.fileData.voiceName;
		file.voiceScore = res.data?.fileData.voiceScore;
		file.voiceTags = res.data?.fileData.voiceTags===''?[]:res.data?.fileData.voiceTags.split(',');
		file.voiceTextUrl = res.data?.fileData.voiceTextUrl;
		file.voiceUrl = res.data?.fileData.voiceUrl;
	}
});

function goback() {
	router.go(-1);
}

async function showTextArea() {
	if (content.value === "" && !showText.value) {
		const data = await readTextFile({
			voiceTextUrl: file.voiceTextUrl,
			voiceName: file.voiceName,
		});
		if (data.code === 200) {
			content.value = data.data?.content;
		}
	}

	showText.value = !showText.value;
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
		@color: #006699;
		padding: 4px 6px;
		// background-color: #0099CC;
		border-radius: 10px;
		box-shadow: 1px 1px 4px 1px #0099cca6;
		margin-right: 12px;
		border: @color solid 1px;
		color: @color;
	}
}
.cut-off {
	width: 100%;
	color: var(--el-color-info-light-3);
	margin-top: 15px;
}
</style>
