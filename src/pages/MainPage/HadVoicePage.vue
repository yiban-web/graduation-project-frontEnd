<template>
	<div>
		<div class="tag">
			<p>现已有音频数据</p>
		</div>
		<div>
			<el-table :data="voiceList" stripe style="width: 100%" border>
				<el-table-column type="index" width="50" />
				<el-table-column prop="name" label="文件名" width="300" />
				<el-table-column prop="timeLong" label="音频时长" width="180" />
				<el-table-column prop="score" label="分数" />
				<el-table-column label="操作">
					<template #default="scope">
						<el-button size="small" @click="lookDetail(scope.row.id)"
							>查看详情</el-button
						>
						<el-popconfirm
							title="确定删除此文件吗？"
							@confirm="handleDelete(scope.row.id)"
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
import { haveFilesNum } from "./api";
const router = useRouter();
const fileCount = ref(0);
const pageCount = ref(0);
const pageSize = 10;

// @ts-ignore
onBeforeMount(async () => {
	await haveFilesNum()
		.then((res) => {
			console.log(res);
			if (res.code === 200) {
				fileCount.value = res.data?.fileCount;
				pageCount.value = Math.ceil(res.data?.fileCount / pageSize);
			}
		})
		.catch((err) => {
			console.log(err);
		});
});
const voiceList = [
	{
		id: 1,
		name: "4161c2b213321650.mp3",
		timeLong: "31s",
		score: 95,
	},
	{
		id: 2,
		name: "4161c2b654235051.mp3",
		timeLong: "1min31s",
		score: 70,
	},
];
function lookDetail(id: number) {
	console.log(id);
	router.push({
		path: "/main/detail",
		query: { id },
	});
}
function handleDelete(id: number) {
	console.log(id);
}
function changePage(pageNow: number) {
	console.log(pageNow);
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
	margin-top: 10px;
}
</style>
