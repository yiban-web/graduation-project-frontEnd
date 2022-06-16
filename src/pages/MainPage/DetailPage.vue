<!-- 语音详情页 -->
<template>
	<div style="font-size: 0.85rem">
		<div class="back-box">
			<img :src="back" alt="" srcset="" @click="goback" />
			<span class="back" @click="goback">返回</span>
		</div>
		<!-- <p>{{ `语音详情 id=${voiceId}` }}</p> -->
		<p>
			<span class="title-sec">语音名称：</span><span>{{ file.voiceName }}</span>
			<span @click="dialogFormVisible = true" class="re-name">更改</span>
		</p>
		<voice-player
			:voice-url="file.voiceUrl"
			:voice-time-long="voiceTimeLong"
		></voice-player>
		<p class="grade">
			<span class="title">最终得分：</span
			><span class="grade">{{ file.voiceScore || "暂无" }}</span>
		</p>
		<hr SIZE="1" class="cut-off" />
		<div class="keys-tags">
			<p class="title-sec">关键字标签：</p>
			<div class="keys-tags-all" v-if="file.keyTags.length !== 0">
				<div
					class="keys-tags-item"
					v-for="(item, index) in file.keyTags"
					:key="index"
				>
					<span>{{ item }}</span>
				</div>
			</div>
			<div v-else class="no-tags">
				<p>暂无标签</p>
			</div>
		</div>
		<hr SIZE="1" class="cut-off" />
		<div class="keys-tags">
			<p class="title-sec">盲呼标签：</p>
			<div class="keys-tags-all" v-if="file.blindCall.length !== 0">
				<div
					class="keys-tags-item"
					v-for="(item, index) in file.blindCall"
					:key="index"
				>
					<span>{{ item }}</span>
				</div>
			</div>
			<div v-else class="no-tags">
				<p>暂无标签</p>
			</div>
		</div>
		<hr SIZE="1" class="cut-off" />
		<div class="show-text">
			<el-link type="info" @click="showTextArea">{{
				`${showText ? "关闭" : "展开"}文本`
			}}</el-link>
			<el-tooltip
				:content="tooltipText"
				raw-content
				effect="light"
			>
				<svg
					t="1655386708117"
					class="icon"
					viewBox="0 0 1024 1024"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
					p-id="2769"
					width="32"
					height="32"
				>
					<path
						d="M512 64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 64z m32 704h-64v-64h64v64z m11.2-203.2l-5.6 4.8c-3.2 2.4-5.6 8-5.6 12.8v58.4h-64v-58.4c0-24.8 11.2-48 29.6-63.2l5.6-4.8c56-44.8 83.2-68 83.2-108C598.4 358.4 560 320 512 320c-49.6 0-86.4 36.8-86.4 86.4h-64C361.6 322.4 428 256 512 256c83.2 0 150.4 67.2 150.4 150.4 0 72.8-49.6 112.8-107.2 158.4z"
						p-id="2770"
						fill="#707070"
					></path>
				</svg>
			</el-tooltip>
		</div>
		<div v-show="showText">
			<!-- 具体文本显示 -->
			<new-textarea :content="content">
				<!-- <p style="color:red;">1231231<span style="color:black;">123</span></p> -->
				<!-- {{doc}} -->
				<div slot="txt" v-html="doc"></div>
			</new-textarea>
		</div>

		<!-- 修改文件名模态框 -->
		<el-dialog v-model="dialogFormVisible" title="修改文件名">
			<div style="width: 80%">
				<new-input
					:label="inputOb.label"
					:regular="inputOb.regular"
					:placeholder="file.voiceName"
					@getValue="inputOb.getValue"
					:errText="inputOb.errText"
					:clearable="inputOb.clearable"
				>
				</new-input>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取消</el-button>
					<el-button type="primary" :disabled="!newName.state" @click="reName"
						>确定</el-button
					>
				</span>
			</template>
		</el-dialog>
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
import { getFilesDetail, readTextFile, reFileName } from "./api";
import { loading, successTip } from "../../tools";
import { fi } from "element-plus/lib/locale";

const voiceId = useRoute().query.id;
const router = useRouter();
const playerWidth = 200;

const showText = ref(false);

const dialogFormVisible = ref(false);

const file = reactive({
	voiceName: "",
	voiceUrl: "",
	voiceDuration: 0,
	voiceTextUrl: "",
	voiceScore: 0,
	voiceId: 0,
	voiceTags: [],
	blindCall: [],
	keyTags: [],
});

const inputOb = {
	label: "文件名",
	placeholder: file.voiceName,
	getValue: getNewName,
	regular: "^([^\s]){1,11}$",
	errText: "文件名不能包含空格",
	showPassword: false,
	clearable: true,
};

// 播放的时长
const playedTime = ref(0);

// 音频总时长
const voiceTimeLong = 16;

const voiceTagsList = ["银行客服", "公安"];

const content = ref("");

const newName = reactive({
	value: "",
	state: false,
});
const doc = ref("");
const orange = "#FF9900";
const red = "#EE2C2C";
const tooltipText = `<p style="color:#666666;margin:0;">注意：<span style="color:${red}">红色</span>为关键字标签，<span style="color:${orange}">橙色</span>为盲呼标签</p>`;
function getNewName(params: string, state: boolean) {
	newName.value = params.split(".mp3")[0] + ".mp3";
	newName.state = state;
}

getFilesDetail({
	fileId: voiceId,
}).then((res) => {
	console.log(res);
	if (res.code == 200) {
		file.voiceName = res.data?.fileData.voiceName;
		file.voiceScore = res.data?.fileData.voiceScore;
		file.voiceTags = res.data?.fileData.voiceTags;
		file.voiceTextUrl = res.data?.fileData.voiceTextUrl;
		file.voiceUrl = res.data?.fileData.voiceUrl;
		res.data?.fileData.voiceTags.map((item: any, index: any) => {
			if (item.type === "keyWord") {
				file.keyTags.push(item.value);
			} else {
				file.blindCall.push(item.value);
			}
		});
		console.log(file.keyTags);
	}
});

function goback() {
	router.go(-1);
}

async function showTextArea() {
	if (content.value === "" && !showText.value) {
		const load = loading("文本准备中");
		const data = await readTextFile({
			voiceTextUrl: file.voiceTextUrl,
			voiceName: file.voiceName,
		});

		// doc.innerHTML = `<p style="color:red;">1231231<span style="color:black;">123</span></p>`
		load.close();
		if (data.code === 200) {
			content.value = data.data?.content;
			buildTxt(data.data?.content);
		}
	}

	showText.value = !showText.value;
}

// 重新组装展示文本
function buildTxt(content: string) {
	// content += `<p style="color:#666666">注意：<span style="color:${red}">红色</span>为关键字标签，<span style="color:${orange}">橙色</span>为盲呼标签</p>`;
	let res = `<p>${content}</p>`;

	file.voiceTags.map((item: any, index) => {
		const slicing: string[] = res.split(item.value);
		res = slicing.join(
			`<span style="color:${
				item.type == "keyWord" ? red : orange
			};font-weight: 600;">${item.value}</span>`
		);
	});
	doc.value = res;
	return res;
}

async function reName() {
	const data = await reFileName({
		fileId: voiceId,
		newName: newName.value,
	});
	if (data.code == 200) {
		successTip("修改成功");
		file.voiceName = newName.value;
		dialogFormVisible.value = false;
	}
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

.title-sec {
	font-weight: 600;
}
.back {
	color: var(--el-color-info-light-3);
	font-size: 0.8rem;
	cursor: pointer;
	margin-left: 5px;
}

.re-name {
	margin-left: 20px;
	font-size: 0.7rem;
	color: #6699cc;
	cursor: pointer;
}
.re-name:hover {
	color: #006699;
}

.grade {
	span.title {
		font-weight: 600;
	}
	span.grade {
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
		@color: #336699;
		padding: 6px 10px;
		// background-color: #0099CC;
		border-radius: 10px;
		// box-shadow: 1px 1px 4px 1px #0099cca6;
		margin-right: 12px;
		// border: @color solid 1px;
		// color: @color;
		background-color: @color;
		color: white;
		font-size: 0.7rem;
	}
	.no-tags {
		padding: 6px 10px;
		display: inline-block;
		background-color: var(--el-color-info-light-5);
		border-radius: 10px;
		font-size: 0.7rem;
		color: #393a3c;
		p {
			margin: 0;
		}
	}
}

.cut-off {
	width: 100%;
	color: var(--el-color-info-light-3);
	margin-top: 15px;
}

.key-word {
	color: red;
}

.show-text {
	display: flex;
	svg {
		width: 16px;
		margin-left: 15px;
	}
}
</style>
