<template>	
    <div>	
        <div class="head">
            <p class="head-title">大规模语音数据智能质检系统</p>
            <div class="head-user">
                <p>您好，3180911065</p>
                <img :src="退出" alt="" srcset="" >

            </div>
            
        </div>
        <div class="body">
            <div class="navigation-bar">
                <div :class="{'navigation-bar-item':true,'navigation-bar-item-choosed':choosedBar===item.id}" v-for="(item) in barList" :key="item.id" @click="goto(item.path,item.id)">
                    <p>{{item.name}}</p>
                </div>
                

            </div>
            <div class="main-content">
                <router-view></router-view>
            </div>
        </div>
        
    </div>	
</template>	
<script setup lang="ts">	
    import { reactive, ref } from "vue";
    import { useRouter, useRoute } from 'vue-router'
    // @ts-ignore	
    import 退出 from '../../assets/logout.png';

    const router = useRouter()

    const barList = [{path:'had',name:'已有数据',id:1},{path:'record',name:'上传文件',id:2}]

    const choosedBar = ref(0)

    function goto(path:string,id:number){
        choosedBar.value = id
        router.push({
            path:`/main/${path}`
        })
    }
</script>	
<style lang="less" scoped>	
@bule:#4484ce;
@grey:#d9d9d9;
.head{
    display: flex;
    background-color: @bule;
    justify-content: space-between;
    align-items: center;
    padding: 0 8vw;
    &-title{
        font-size: 1.3rem;
        font-weight: 600;
        color: white;
    }
    &-user{
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        p{
            color: white;
        }
        img{
            width: 30px;
            height: 35px;
            margin-left:5px;
            cursor: pointer;
        }

    }
}
.body{
    display: flex;
    height: 90vh;
    overflow: scroll;
    overflow-x: hidden;
}
.navigation-bar{
    width: 10vw;
    background-color: @grey;
    padding: 5px 0;
    &-item{
        padding: 15px 0;
        cursor: pointer;
        margin-bottom: 5px;
        p{
            margin: 0;
            text-align: center;
            cursor: pointer;
        }
    }
    &-item:hover{
        background-color: @bule;
        color: white;
    }
    &-item-choosed{
         background-color: @bule;
        color: white;
    }
}
.main-content{
    flex: 1;
    padding: 5px 15px;

}
</style>