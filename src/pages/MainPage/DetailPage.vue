<!-- 语音详情页 -->
<template>	
    <div>	
        <p>{{`语音详情 id=${voiceId}`}}</p>
    </div>	
</template>	
<script setup lang="ts">	
    import { reactive, ref } from "vue";	
    import { useRouter, useRoute } from 'vue-router'
    const voiceId = useRoute().query.id
</script>	
<style lang="less" scoped>	
</style>	