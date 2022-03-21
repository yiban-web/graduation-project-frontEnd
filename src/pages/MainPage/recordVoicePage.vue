<template>
	<div>
		<el-upload
			ref="uploadRef"
			class="upload-demo"
			action="https://jsonplaceholder.typicode.com/posts/"
			:auto-upload="false"
			:on-error="uploadFail"
			:on-success="uploadSuccess"
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
import { UploadFilled } from "@element-plus/icons-vue";
// @ts-ignore
import { UploadRawFile, ElMessage, ElUpload, ElMessageBox } from "element-plus";
import { UploadFile } from "element-plus/es/components/upload/src/upload.type";
import { useRouter } from "vue-router";
const uploadRef = ref<InstanceType<typeof ElUpload>>();
const router = useRouter()
const beforeAvatarUpload = (file: UploadRawFile) => {
	console.log(file.type);
	const isJPG = file.type === "audio/mpeg";
	const isLt2M = file.size / 1024 / 1024 < 2;

	if (!isJPG) {
		ElMessage.error("请上传音频文件");
	}
	// if (!isLt2M) {
	// 	ElMessage.error("Avatar picture size can not exceed 2MB!");
	// }
	return isJPG && isLt2M;
};
const submitUpload = () => {
	// uploadRef.value!.submit();
    open()
};

function uploadFail(error: any, file: UploadFile, fileList: UploadFile[]) {
	// console.log(arguments)
	ElMessage.error("文件上传失败");
}

function uploadSuccess(
	response: any,
	file: UploadFile,
	fileList: UploadFile[]
) {
	ElMessage.error("文件上传成功");
}

function open() {
	ElMessageBox.confirm("上传成功，是否进行质检?", "", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "success",
	})
		.then(() => {
			ElMessage({
				type: "success",
				message: "Delete completed",
			});
            router.push({
                path:'/main/detail',
                query:{id:12}
            })
		})
		.catch(() => {
			ElMessage({
				type: "info",
				message: "Delete canceled",
			});
		});
}
</script>
<style lang="less" scoped>
.ml-3 {
	margin-left: 10px;
}
</style>
