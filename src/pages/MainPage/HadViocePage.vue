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
              @cancel="handleDelete(scope.row.id)"
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
      <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        background
        :total="1000"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
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
}
function handleDelete(id: number) {
  console.log(id);
}
</script>
<style lang="less" scoped>
.tag {
  background-color: #f19f4d;
  width: 10%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 20px;
  color: white;
  cursor: none;
  p {
    margin: 0;
    text-align: center;
  }
}
</style>
