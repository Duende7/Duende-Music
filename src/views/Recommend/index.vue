<template>
    <div class="recommendSongs">
        <div class="exIntro">
            <img width="1306" height="250" v-lazy="highQualityPlayList.coverImgUrl" class="z2">
            <div class="z3">
                <img @click="toPlayList(highQualityPlayList.id)" class="exImg" v-lazy="highQualityPlayList.coverImgUrl">
                <div style="margin:25px 25px 25px 0;">
                    <div class="exLogo">精品歌单</div>
                    <div class="exTitle">{{highQualityPlayList.name}}</div>
                    <div class="exParagraph">{{highQualityPlayList.description}}</div>
                </div>
            </div>
        </div>
        <ul class="tabs">
            <li @click="changetag(tag.name)" class="tabItem" :style="tag.active" v-for="tag in tag" :key="tag.id">{{tag.name}}</li>
        </ul>
        <ul class="recommendList">
            <li class="recommendListItem" v-for="pl in topPlayList" :key="pl.id">
                <p class="recommendPlayCount">播放量：{{pl.playCount}}</p>
                <img @click="toPlayList(pl.id)" class="itemImg" v-lazy="pl.coverImgUrl">
                <p class="itemTxt">{{pl.name}}</p>
                <svg @click="toPlayList(pl.id)" t="1647745661966" class="icon recommendPlayBtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10847" width="37" height="37"><path d="M69.662 516.461a444.57 452.238 0 1 0 889.14 0 444.57 452.238 0 1 0-889.14 0Z" fill="#ffffff" p-id="10848" data-spm-anchor-id="a313x.7781069.0.i47" class="selected"></path><path d="M407.56 714.368V303.616l355.722 205.376z" fill="#d81e06" p-id="10849" data-spm-anchor-id="a313x.7781069.0.i48" class=""></path></svg>
            </li>
        </ul>
        <el-pagination
          style="margin-top:20px;"
          Align="center"
          background
          layout="prev, pager, next"
          :total="totalPlayList"
          :page-size="pageSize"
          :current-page="page"
          @current-change="changePage">
        </el-pagination>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name:'Recommend',
    data() {
        return {
            page:1,
            pageSize:45,
            tag:[],
            limit:1,
            cat:'全部',
            highQualityPlayList:{},
        }
    },
    mounted() {
        this.getData(this.cat);
        this.$store.dispatch('recommend/getHighqualityTags');
    },
    computed:{
        ...mapState('recommend',['tags','highqualityPlayList','topPlayList','totalPlayList']),
    },
    watch:{
        tags(newValue){
            this.tag = newValue.filter(item=>{
                return item.type == 0;
            }).reverse()
            this.tag.forEach(item => {
                this.$set(item,'active',{});
            });
            this.tag.push({
                id:7777777,
                name:'全部',
                active:{color:'#ed706f'}
            });  
        },
        highqualityPlayList(newValue){
            this.highQualityPlayList = newValue[0];
        }
    },
    methods: {
        getData(cat){
            this.$store.dispatch('recommend/getHighqualityPlayList',{cat,limit:this.limit});
            this.$store.dispatch('recommend/getTopPlayList',{cat,limit:this.pageSize,offset:(this.page-1)*this.pageSize});
        },
        changePage(page){
            this.page = page;
            this.$store.dispatch('recommend/getTopPlayList',{cat:this.cat,limit:this.pageSize,offset:(this.page-1)*this.pageSize});
        },
        changetag(tag){
            this.cat = tag;
            this.getData(this.cat);
            this.tag.forEach(item=>{
                item.active = item.name == tag ? {color:'#ed706f'} : {};
            })
        },
        toPlayList(id){
            this.$router.push({name:'playlist',query:{id}});
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
    .recommendSongs{
        padding: 20px 100px;
        min-width: 1500px;
    }
    .exIntro{
        position: relative;
        display: flex;
        height: 250px;
        border-radius: 10px;
        overflow: hidden;
    }
    .z2{
        position:absolute;
        top: 0;
        left: 0;
        z-index:2;
        border-radius: 10px;
        filter: blur(20px);
    }
    .z3{
        display:flex;
        position:absolute;
        z-index:3;
        width: 1300px;
    }
    .exImg{
        width: 200px;
        height: 200px;
        margin: 25px;
        cursor: pointer;
    }
    .exLogo{
        width: 100px;
        height: 30px;
        font-size: 16px;
        border: 1px solid #dfac67;
        color: #dfac67;
        font-weight: 700;
        border-radius: 10px;
        text-align: center;
        padding: 3.5px 0;
    }
    .exTitle{
        font-size: 16px;
        color: #fff;
        margin: 10px 0;
    }
    .exParagraph{
        height: 130px;
        font-size: 12px;
        color: #e3e3e3;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp:8;
        -webkit-box-orient: vertical;
    }
    .tabs{
        list-style: none;
        display: flex;
        flex-direction: row-reverse;
        margin: 30px 0;
    }
    .tabItem{
        color: #808080;
        margin-left: 20px;
        cursor: pointer;
    }
    .recommendList{
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        width: 100%;        
    }
    .recommendListItem{
        position: relative;
        width: 234px;
        margin: 0 34px 30px 0;

    }
    .recommendList .recommendListItem:nth-child(5n){
        margin-right: 0;
    }
    .itemImg{
        width: 100%;
        height: 234px;
        border-radius: 5px;
        cursor: pointer;
    }
    .itemTxt{
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .recommendPlayCount{
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        font-size: 12px;
        background-color: rgba(0,0,0,.5);
        color: #fff;
        padding: 5px;
    }
    .recommendPlayBtn{
        display: none;
        position: absolute;
        bottom: 30px;
        right: 5px;
        cursor: pointer;
    }
    .recommendListItem:hover .recommendPlayCount,
    .recommendListItem:hover .recommendPlayBtn{
        display: block;
    }
</style>