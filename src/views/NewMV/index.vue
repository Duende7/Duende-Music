<template>
    <div class="mvMain">
        <div class="mvNav">
            <ul class="mvul">
                <span style="margin-right: 20px;font-size:14px;">地区：</span><li class="mvli" @click="changeArea(at)" :style="at.active" v-for="at in areaTags" :key="at.id">{{at.name}}</li>
            </ul>
            <ul class="mvul">
                <span style="margin-right: 20px;font-size:14px;">类型：</span><li class="mvli" @click="changeType(tt)" :style="tt.active" v-for="tt in typeTags" :key="tt.id">{{tt.name}}</li>
            </ul>
            <ul class="mvul">
                <span style="margin-right: 20px;font-size:14px;">排序：</span><li class="mvli" @click="changeOrder(ot)" :style="ot.active" v-for="ot in orderTags" :key="ot.id">{{ot.name}}</li>
            </ul>
            <ul class="mvs">
                 <li class="mv" v-for="mv in mvList" :key="mv.id">
                     <div class="playCounts">
                        <svg t="1647766935268" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11909" width="16" height="16"><path d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z" fill="#ffffff" p-id="11910"></path></svg>
                        <span style="font-size:12px;color:#fff;">{{mv.playCount}}</span>
                     </div>
                     <div class="mvImg">
                         <img @click="toMv(mv.id)" class="mvImg" v-lazy="mv.cover">
                         <svg @click="toMv(mv.id)" t="1647745661966" class="icon mvPlaybtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10847" width="64" height="64"><path d="M69.662 516.461a444.57 452.238 0 1 0 889.14 0 444.57 452.238 0 1 0-889.14 0Z" fill="#ffffff" p-id="10848" data-spm-anchor-id="a313x.7781069.0.i47" class="selected"></path><path d="M407.56 714.368V303.616l355.722 205.376z" fill="#d81e06" p-id="10849" data-spm-anchor-id="a313x.7781069.0.i48" class=""></path></svg>
                     </div>
                     <div class="mvName">{{mv.name}}</div>
                     <div class="arName"><span v-for="mvar in mv.artists" :key="mvar.id">{{mvar.name}} </span></div>
                 </li>
             </ul>
             <el-pagination
                style="margin-top:20px;"
                Align="center"
                background
                layout="prev, pager, next"
                :total="mvCount||5000"
                :page-size="pageSize"
                :current-page="page"
                @current-change="changePage">
              </el-pagination>
        </div>
    </div>
</template>
<script>
import {getId} from '@/utils/randomid7.js'
import { mapState } from 'vuex';
export default {
    name:'NewMV',
    data() {
        return {
           areaTags:[{name:'全部'},{name:'内地'},{name:'港台'},{name:'欧美'},{name:'日本'},{name:'韩国'}],
           typeTags:[{name:'全部'},{name:'官方版'},{name:'原声'},{name:'现场版'},{name:'网易出品'}],
           orderTags:[{name:'上升最快'},{name:'最热'},{name:'最新'}],
           area:'全部',
           type:'全部',
           order:'上升最快',
           page:1,
           pageSize:40
        }
    },
    mounted() {
        this.areaTags.forEach(item => {
            this.$set(item,'id',getId());
            item.name == '全部' ? this.$set(item,'active',{color: '#dd6d60',backgroundColor: '#fcf6f5',borderRadius: '20px'}) : this.$set(item,'active',{})
        });
        this.typeTags.forEach(item => {
            this.$set(item,'id',getId());
            item.name == '全部' ? this.$set(item,'active',{color: '#dd6d60',backgroundColor: '#fcf6f5',borderRadius: '20px'}) : this.$set(item,'active',{})
        });
        this.orderTags.forEach(item => {
            this.$set(item,'id',getId());
            item.name == '上升最快' ? this.$set(item,'active',{color: '#dd6d60',backgroundColor: '#fcf6f5',borderRadius: '20px'}) : this.$set(item,'active',{})
        });
        this.getData();
    },
    computed:{
        ...mapState('mv',['mvCount','mvList'])
    },
    methods: {
        getData(){
            this.$store.dispatch('mv/getNewMvs',{area:this.area,type:this.type,order:this.order,limit:this.pageSize,offset:(this.page-1)*this.pageSize});
        },
        changePage(page){
            this.page = page;
            this.getData();
        },
        toMv(id){
            this.$router.push({name:'mv',query:{id}});
        },
        changeArea(at){
            this.page = 1;
            this.area = at.name;
            this.areaTags.forEach(item=>{
                item.active = {}
            })
            at.active = {color: '#dd6d60',backgroundColor: '#fcf6f5',borderRadius: '20px'};
            this.getData();
        },
        changeType(tt){
            this.page = 1;
            this.type = tt.name;
            this.typeTags.forEach(item=>{
                item.active = {}
            })
            tt.active = {color: '#dd6d60',backgroundColor: '#fcf6f5',borderRadius: '20px'};
            this.getData();
        },
        changeOrder(ot){
            this.page = 1;
            this.order = ot.name;
            this.orderTags.forEach(item=>{
                item.active = {}
            })
            ot.active = {color: '#dd6d60',backgroundColor: '#fcf6f5',borderRadius: '20px'};
            this.getData();
        }
    },
}
</script>
<style scoped>
    >>>.el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #e94543;
        color: #fff;
    } 
    >>>.el-pagination.is-background .el-pager li:not(.disabled):hover{
        color: #e94543;
    } 
    >>>.el-pagination.is-background .el-pager li:not(.disabled).active:hover{
        color: #fff;
    } 
    >>>.el-pagination.is-background .el-pager li:not(.disabled),
    >>>.el-pagination.is-background .btn-next,
    >>>.el-pagination.is-background .btn-prev{
        background-color: #fff;
        border: 1px solid #f4f4f5;
    }
    >>>.el-pagination{
        padding: 20px 5px;
    }
    .mvMain{
        padding: 20px 100px;
        min-width: 1500px;
    }
    .mvNav{
        width: 100%;
        height: 120px;
    }
    .mvul{
        display: flex;  
        align-items: center;    
        list-style: none;
        height: 30px;
        margin-bottom: 30px;
    }
    .mvli{
        height: 30px;
        margin-right: 40px;
        font-size: 14px;
        text-align: center;
        padding: 5px 20px;
        cursor: pointer;
        /* color: #dd6d60;
        background-color: #fcf6f5;
        border-radius: 20px; */
    }
    .mvs{
        display: flex;
        flex-wrap: wrap;
        width: 1306px;
        list-style: none;
    }
    .mv{
        position: relative;
        margin: 0 35px 20px 0;
    }
    .mvs .mv:nth-child(4n){
        margin-right: 0;
    }
    .mvImg:hover .mvPlaybtn{
        display: block;
    }
    .mvImg{
        width: 300px;
        height: 165px;
        border-radius: 10px;
        cursor: pointer;
    }
    .mvPlaybtn{
        display: none;
        position: absolute;
        top: 50.5px;
        left: 118px;
        cursor: pointer;
    }
    .playCounts{
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .mvName{
        width: 250px;
        margin: 5px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .arName{
        width: 250px;
        font-size: 12px;
        color: #A5A1A1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>