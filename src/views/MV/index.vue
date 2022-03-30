<template>
    <div class="MVMain">
        <div class="MVDetail">
            <div class="MVArtistInfo">
                <div class="MVLogo">MV</div>
                <div class="MVName" :title="MVDetail.name">{{MVDetail.name}}</div>
                <div class="artistName">
                    <span @click="toArtist(ar.id)" style="cursor: pointer;" v-for="ar in MVDetail.artists" :key="ar.id">{{ar.name}}&nbsp;</span>
                </div>
            </div>
            <video  width="700" height="400" :src="MVUrl" autoplay controls>您的浏览器不支持 video 标签。</video>
            <div class="comment">评论({{MVDetail.commentCount}})</div>
            <Comment :id='$route.query.id' :comments='comments' :hotComments='hotComments' :commentCount='commentCount'></Comment>
            <el-pagination
              v-if="MVDetail.commentCount"
              style="margin-top:20px;"
              Align="center"
              background
              layout="prev, pager, next"
              :total="commentCount"
              :page-size="pageSize"
              :current-page="page"
              @current-change="changePage">
            </el-pagination> 
        </div>
        <div class="MVrecommend">
            <h4 class="MVIntro">MV简介</h4>
            <p class="MVInfo">发布时间：{{MVDetail.publishTime}}</p>
            <p class="MVInfo">播放次数：{{MVDetail.playCount}}次</p>
            <p class="MVTxt" v-if="MVDetail.desc">{{MVDetail.desc}}</p>
            <h4 class="MVIntro">相关MV</h4>
            <ul class="ost">
                <li style="display:flex;margin-bottom:20px;" v-for="reMV in resembleMV" :key="reMV.id">
                    <div class="MVImg" @click="toMV(reMV.id)">
                        <img class="MVimg" v-lazy="reMV.cover">
                        <svg t="1647745661966" class="icon picPlayBtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10847" width="36" height="36"><path d="M69.662 516.461a444.57 452.238 0 1 0 889.14 0 444.57 452.238 0 1 0-889.14 0Z" fill="#ffffff" p-id="10848" data-spm-anchor-id="a313x.7781069.0.i47" class="selected"></path><path d="M407.56 714.368V303.616l355.722 205.376z" fill="#d81e06" p-id="10849" data-spm-anchor-id="a313x.7781069.0.i48" class=""></path></svg>
                        <div class="MVplayCount">
                            <svg t="1647766935268" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11909" width="16" height="16"><path d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z" fill="#ffffff" p-id="11910"></path></svg>
                            <span style="font-size:12px;color:#fff;">{{reMV.playCount}}</span>
                        </div>
                    </div>
                    <div>
                        <div class="ostMVName" :title="reMV.name">{{reMV.name}}</div>
                        <div class="ostMVAr">{{reMV.durations}}</div>
                        <div class="ostMVAr">
                            <span v-for="reAR in reMV.artists" :key="reAR.id">{{reAR.name}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { duration } from '@/utils/dateformat.js';
export default {
    name:'MV',
    data() {
        return {
            page:1,
            pageSize:10,
            id:0
        }
    },
    mounted() {
        window.addEventListener('popstate',this.getId);
        this.getData(this.$route.query.id);
        this.$store.commit('mv/CLEARCOMMENT');
    },
    computed:{
        ...mapState('mv',['MVUrl','MVDetail','resembleMV','comments','hotComments','commentCount']),
    },
    watch:{
        resembleMV(newValue){
            newValue.forEach(item => {
                this.$set(item,'durations',duration(item.duration));
            });
        }
    },
    methods: {
        getData(id){
            this.$store.dispatch('mv/getMVUrl',id);
            this.$store.dispatch('mv/getMVDetail',id);
            this.$store.dispatch('mv/getResembleMV',id);
            this.$store.dispatch('mv/getMVComment',{id,limit:this.pageSize,offset:(this.page-1)*this.pageSize});
        },
        changePage(page){
            this.page = page;
            this.$store.dispatch('mv/getMVComment',{id:this.$route.query.id,limit:this.pageSize,offset:(this.page-1)*this.pageSize});
        },
        toArtist(id){
            this.$router.push({name:'artists',query:{id}});
        },
        toMV(id){
           this.$router.push({name:'mv',query:{id}});
           this.getData(id);
        },
        getId(){
            this.id = this.$route.query.id;
            this.toMV(this.id);
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
    .MVMain{
        display: flex;
        padding: 20px 100px;
        min-width: 1500px;
    }
    .MVDetail{
        width: 700px;
        margin-right: 50px;
    }
    .MVLogo{
        width: 55px;
        height: 30px;
        font-size: 20px;
        border: 1px solid #cd3837;
        color: #cd3837;
        font-weight: 700;
        padding: 0 7px;
        border-radius: 5px;
        margin-right: 10px;
    }
    .MVArtistInfo{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    .MVName{
        max-width: 450px;
        font-size:25px;
        font-weight:700;
        margin-right: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .artistName{
        width: 150px;
        padding-top: 8px;
        color: #0C73C2;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .comment{
        margin: 50px 0 10px 0;
        font-size: 20px;
        border-bottom: 2px solid #e94543;
        padding-bottom: 5px;
    }
    .MVrecommend{
        width: 570px;
        padding: 10px 50px;
    }
    .MVIntro{
        border-bottom: 1px solid #ccc;
        padding-bottom: 5px;
        margin: 30px 0 20px 0;
    }
    .MVInfo{
        font-size: 14px;
        color: #808080;
        padding: 3px 0;
    }
    .MVTxt{
        font-size: 14px;
        margin-top: 10px;
        color: #333;
    }
    .ost{
        list-style: none;
    }
    .MVImg{
        position:relative;
    }
    .MVimg{
        width: 200px;
        height: 120px;
        border-radius: 5px;
        margin-right: 20px;
        cursor: pointer;
    }
    .MVImg:hover .picPlayBtn{
        display: block;
    }
    .ostMVName{
        width: 250px;
        margin: 5px 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .ostMVAr{
        font-size: 12px;
        color: #A5A1A1;
        margin: 5px 0;
    }
    .picPlayBtn{
        display: none;
        position: absolute;
        top: 42px;
        left: 82px;
        cursor: pointer;    
    }
    .MVplayCount{
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 5px;
        right: 25px;
    }
</style>