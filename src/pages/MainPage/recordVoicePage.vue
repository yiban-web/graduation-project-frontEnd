<template>
	<div class="main">
		<div class="box left-box">
			<!-- <p class="box-title">单文件上传</p> -->
			<el-upload
				ref="uploadRef"
				class="upload-demo"
				action="/test/upload"
				:auto-upload="false"
				:on-error="uploadFail"
				:on-success="open"
				:before-upload="beforeAvatarUpload"
				:on-change="changeFile"
				:multiple="true"
				name="voiceFile"
				:on-exceed="onExceed"
				:limit="maxFileNum"
				:data="{
					fileName: fileData.name,
					fileSize: fileData.size,
				}"
			>
				<template #trigger>
					<!-- <el-button type="primary">点击选择文件</el-button> -->
					<div class="choose-files">
						<svg
							t="1651822392467"
							class="icon"
							viewBox="0 0 1024 1024"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							p-id="1983"
							width="48"
							height="48"
						>
							<path
								d="M747.52 1024c-5.12 0-10.24-5.12-15.36-10.24l-71.68-174.08-138.24 143.36c-5.12 5.12-5.12 5.12-10.24 5.12-10.24-5.12-15.36-10.24-15.36-15.36V312.32c0-5.12 5.12-10.24 10.24-15.36h5.12c5.12 0 5.12 0 10.24 5.12l496.64 424.96c5.12 5.12 5.12 10.24 5.12 20.48 0 5.12-10.24 10.24-15.36 10.24h-194.56l71.68 194.56c5.12 10.24 0 15.36-10.24 20.48l-128 51.2z m-71.68-276.48c5.12 0 5.12 5.12 10.24 5.12l81.92 225.28 71.68-30.72-87.04-225.28v-10.24c0-5.12 5.12-5.12 10.24-5.12H921.6l-373.76-312.32v486.4l117.76-128c5.12-5.12 5.12-5.12 10.24-5.12z"
								fill="#bfbfbf"
								p-id="1984"
							></path>
							<path
								d="M76.8 788.48c-40.96 0-76.8-35.84-76.8-76.8V76.8C0 35.84 35.84 0 76.8 0h788.48c40.96 0 76.8 35.84 76.8 76.8V409.6c0 10.24-20.48 20.48-30.72 20.48-10.24 0-25.6-10.24-25.6-20.48V92.16c0-20.48-15.36-35.84-35.84-35.84H92.16c-20.48 0-35.84 15.36-35.84 35.84v604.16c0 20.48 15.36 35.84 35.84 35.84h184.32c10.24 0 20.48 15.36 20.48 30.72 0 10.24-10.24 25.6-20.48 25.6H76.8z"
								fill="#bfbfbf"
								p-id="1985"
							></path>
						</svg>
						<p>点击选择文件</p>
					</div>
				</template>
				<el-button class="ml-3" type="success" plain @click="submitUpload"
					>开始上传</el-button
				>
				<!-- <template #tip>
				<div class="el-upload__tip">请上传音频文件</div>
			</template> -->
			</el-upload>
			<el-button
				type="primary"
				plain
				@click="submitUpload"
				class="submit-btn"
				:disabled="fileNum === 0"
				>开始上传</el-button
			>
		</div>
		<!-- <div class="box right-box">
			<p class="box-title">批量上传</p>
		</div> -->
	</div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
// @ts-ignore
import {
	UploadRawFile,
	ElUpload,
	ElMessageBox,
	UploadFiles,
} from "element-plus";
import { UploadFile } from "element-plus/es/components/upload/src/upload.type";
import { useRouter } from "vue-router";
import { errorTip, loading } from "../../tools";
import { uploadApi, countGrade } from "./api";
const uploadRef = ref<InstanceType<typeof ElUpload>>();
const router = useRouter();
import chooseFiles from "../../assets/chooseFiles.png";

const fileData = reactive({
	name: "",
	size: "",
});

const maxFileNum = 6
const fileNum = ref(0);

const fileUpload = ref();
const beforeAvatarUpload = (file: UploadRawFile) => {
	const isJPG = file.type === "audio/mpeg";
	const isLt2M = file.size / 1024 / 1024 < 2;

	if (!isJPG) {
		errorTip("请上传音频文件");
	}
	if (!isLt2M) {
		errorTip("文件过大");
	}
	return isJPG && isLt2M;
};
function onExceed(){
	errorTip(`最多上传${maxFileNum}个文件`);
}
function changeFile(file: UploadRawFile, uploadFiles: UploadFiles) {
	fileData.name = file.name;
	fileData.size = file.size;
	fileUpload.value = file;
	console.log(file, uploadFiles.length);
	fileNum.value = uploadFiles.length;
}
const submitUpload = async () => {
	const load = loading("上传中");
	await uploadRef.value!.submit();
	load.close();
};

function uploadFail(error: any, file: UploadFile, fileList: UploadFile[]) {
	errorTip("上传失败");
}

async function open(res: any) {
	// console.log(res);
	if (res.code === 200) {
		const load = loading("质量检测中");
		const data = await countGrade({
			id: res.data.fileId,
		});
		load.close();
		if (data.code == 200) {
			
			if (fileNum.value == 1) {
				router.push({
					path: "/main/detail",
					query: { id: res.data.fileId },
				});
			} else {
				router.push({
					path: "/main/had",
				});
			}
		}
		else{
			errorTip('检测失败')
		}
	}
	else{

	}
}

async function uploadFile() {
	const load = loading("上传中");
	const data = await uploadApi({
		voiceFile: fileUpload.value,
		fileName: fileData.name,
		fileSize: fileData.size,
	});
	load.close();
}
</script>
<style lang="less" scoped>
.main {
	display: flex;
	height: 100%;
	.box {
		flex: 1;
		padding: 0 5px;
		height: 100%;
		// display: flex;
		// align-items: center;
		// flex-direction: column;
		&-title {
			font-size: 0.8rem;
			margin-top: 0;
			color: #606266;
		}
	}
	.left-box {
		flex: 1;
	}
	.right-box {
		flex: 1;
		border-left: 1px dotted rgba(96, 98, 102, 0.537);
	}
}
.ml-3 {
	margin-left: 10px;
	display: none;
}

@wid: 40vw;
@hei: @wid*0.618;

.choose-files {
	width: @wid;
	height: @hei;
	border: 1.5px dashed #515151bd;
	border-radius: 20px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	img {
		width: 15%;
	}
	p {
		margin: 0;
		font-size: 0.7rem;
		margin-top: 1%;
		color: #bfbfbf;
	}
}

.submit-btn {
	margin-top: 10px;
	width: @wid;
}
</style>
