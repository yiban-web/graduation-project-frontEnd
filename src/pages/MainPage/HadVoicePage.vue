<template>
	<div>
		<div class="tag">
			<p>现已有音频数据</p>
		</div>
		<div>
			<el-table :data="voiceList" stripe style="width: 100%" border>
				<el-table-column type="index" width="50" />
				<!-- <el-table-column prop="voiceName" label="文件名" width="300" /> -->
				<el-table-column label="文件名" width="300">
					<template #default="scope">
						<p>{{ scope.row.voiceName || "暂无" }}</p>
					</template>
				</el-table-column>
				<el-table-column label="音频时长" width="180">
					<template #default="scope">
						<p>{{ scope.row.voiceDuration || "暂无" }}</p>
					</template>
				</el-table-column>
				<el-table-column label="分数" width="300">
					<template #default="scope">
						<p>{{ scope.row.voiceScore || "暂无" }}</p>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template #default="scope">
						<el-button size="small" @click="lookDetail(scope.row.voiceId)"
							>查看详情</el-button
						>
						<el-popconfirm
							title="确定删除此文件吗？"
							@confirm="handleDelete(scope.row.voiceId)"
							confirm-button-text="确定"
							cancel-button-text="取消"
						>
							<template #reference>
								<el-button size="small" type="danger">删除文件</el-button>
							</template>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
			<div class="pageination">
				<el-pagination
					:page-size="10"
					:pager-count="pageCount"
					layout="prev, pager, next"
					background
					:total="fileCount"
					@current-change="changePage"
				/>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onBeforeMount, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { successTip } from "../../tools";
import { haveFilesNum, getFilesList, deleteFile } from "./api";
const router = useRouter();

// 文件总数
const fileCount = ref(0);
// 页码
const pageCount = ref(0);
// 一页展示数据量
const pageSize = 10;

// 文件数据项类型
type File = {
	voiceDuration: number | null;
	voiceId: number;
	voiceName: string;
	voiceScore: number;
};

const voiceList = ref<File[]>([]);

const pageNow = ref(0)

// @ts-ignore
onBeforeMount(() => {
	haveFilesNum()
		.then((res) => {
			console.log(res);
			if (res.code === 200) {
				fileCount.value = res.data?.fileCount;
				pageCount.value = Math.ceil(res.data?.fileCount / pageSize);
				changePage(1);
			}
		})
		.catch((err) => {
			console.log(err);
		});
});
function lookDetail(id: number) {
	console.log(id);
	router.push({
		path: "/main/detail",
		query: { id },
	});
}
async function handleDelete(id: number) {
	console.log(id);
	const data = await deleteFile({
		fileId:id
	})
	if(data.code===200){
		successTip('删除成功')
		changePage(pageNow.value)
	}
}
async function changePage(page: number) {
	console.log(page);
	pageNow.value = page
	const data = await getFilesList({
		page,
		pageSize,
	});
	if (data.code === 200) {
		voiceList.value = data.data?.filesList;
	}
}
</script>
<style lang="less" scoped>
.tag {
	background-color: #f19f4d;
	width: 10%;
	margin-bottom: 10px;
	padding: 10px;
	border-radius: 20px;
	color: white;
	cursor: none;
	p {
		margin: 0;
		text-align: center;
	}
}
.pageination {
	display: flex;
	justify-content: center;
	margin: 10px 0;
}
</style>
