<template>
	<div>
		<el-upload
			ref="uploadRef"
			class="upload-demo"
			action="/test/upload"
			:auto-upload="false"
			:on-error="uploadFail"
			:on-success="open"
			:before-upload="beforeAvatarUpload"
			:on-change="changeFile"
			name="voiceFile"
			:data="{
				fileName: fileData.name,
				fileSize: fileData.size,
			}"
		>
			<template #trigger>
				<el-button type="primary">点击选择文件</el-button>
			</template>
			<el-button class="ml-3" type="success" plain @click="submitUpload"
				>开始上传</el-button
			>
			<template #tip>
				<div class="el-upload__tip">请上传音频文件</div>
			</template>
		</el-upload>
	</div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
// @ts-ignore
import { UploadRawFile, ElUpload, ElMessageBox } from "element-plus";
import { UploadFile } from "element-plus/es/components/upload/src/upload.type";
import { useRouter } from "vue-router";
import { errorTip } from "../../tools";
import { uploadApi,countGrade } from "./api";
const uploadRef = ref<InstanceType<typeof ElUpload>>();
const router = useRouter();

const fileData = reactive({
	name: "",
	size: "",
});

const fileUpload = ref();
const beforeAvatarUpload = (file: UploadRawFile) => {
	console.log(file);
	const isJPG = file.type === "audio/mpeg";
	const isLt2M = file.size / 1024 / 1024 < 2;

	if (!isJPG) {
		errorTip("请上传音频文件");
	}
	// if (!isLt2M) {
	// 	ElMessage.error("Avatar picture size can not exceed 2MB!");
	// }
	return isJPG && isLt2M;
};

function changeFile(file: UploadRawFile) {
	fileData.name = file.name;
	fileData.size = file.size;
	fileUpload.value = file;
	console.log(file);
}
const submitUpload = () => {
	uploadRef.value!.submit();
};

function uploadFail(error: any, file: UploadFile, fileList: UploadFile[]) {
	errorTip("上传失败");
}

function open(res: any) {
	// console.log(res);
	if (res.code === 200) {
		ElMessageBox.confirm("上传成功，是否进行质检?", "", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "success",
		})
			.then(async () => {
				const data = await countGrade({
					id:res.data.fileId
				})
				// router.push({
				// 	path: "/main/detail",
				// 	query: { id: res.data.fileId },
				// });
			})
			.catch(() => {});
	}
}

async function uploadFile() {
	console.log("123");
	const data = await uploadApi({
		voiceFile: fileUpload.value,
		fileName: fileData.name,
		fileSize: fileData.size,
	});
}
</script>
<style lang="less" scoped>
.ml-3 {
	margin-left: 10px;
}
</style>
