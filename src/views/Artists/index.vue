<template>
    <div class="artistsMain">
       <div class="artistsInfo">
           <img class="img" v-lazy="artistInfo.picUrl">
           <div class="detail">
               <div class="artistsName">{{artistInfo.name}}</div>
               <div class="worksNum">
                   <div>单曲数：{{musicSize}}</div>
                   <div style="margin:0 20px;">专辑数：{{artistInfo.albumSize}}</div>
                   <div>MV数：{{mvSize}}</div>
               </div>
           </div>
       </div>
       <el-tabs v-model="activeName" @tab-click="changeTabs">
         <el-tab-pane label="专辑" name="album">
             <p v-if="Albums.length==0">暂无专辑哦</p>
             <ul class="albums" v-else>
                 <li class="album" v-for="album in Albums" :key="album.id">
                     <div class="albumImg">
                        <img @click="toAlbum(album.id)" class="albumImg" v-lazy="album.picUrl">
                     </div>
                     <p class="name">{{album.name}}</p>
                     <p style="font-size:14px;color:#808080;">{{album.createTime}}</p>
                 </li>
             </ul>
         </el-tab-pane>
         <el-tab-pane label="MV" name="mv">
             <p v-if="MVs.length==0">暂无MV哦</p>
             <ul class="MVs" v-else>
                 <li class="MV" v-for="mv in MVs" :key="mv.id">
                     <div class="playcounts">
                        <svg t="1647766935268" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11909" width="16" height="16"><path d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z" fill="#ffffff" p-id="11910"></path></svg>
                        <span style="font-size:12px;color:#fff;">{{mv.playCount}}</span>
                     </div>
                     <div class="MVImg" @click="toMV(mv.id)">
                         <img class="MVImg" v-lazy="mv.imgurl">
                         <svg t="1647745661966" class="icon MV-playbtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10847" width="64" height="64"><path d="M69.662 516.461a444.57 452.238 0 1 0 889.14 0 444.57 452.238 0 1 0-889.14 0Z" fill="#ffffff" p-id="10848" data-spm-anchor-id="a313x.7781069.0.i47" class="selected"></path><path d="M407.56 714.368V303.616l355.722 205.376z" fill="#d81e06" p-id="10849" data-spm-anchor-id="a313x.7781069.0.i48" class=""></path></svg>
                     </div>
                     <p style="margin:5px 0;" class="name">{{mv.name}}</p>
                 </li>
             </ul>
         </el-tab-pane>
         <el-tab-pane label="歌手详情" name="intro">
             <div>
                <div class="introduce">个人简介</div>
                <p v-for="(p,index) in Introduce" :key="index" class="pFormat">{{p}}</p>
             </div>
             <div v-if="masterpiece">
                <div class="introduce">代表作品</div>
                <p class="pFormat">{{masterpiece}}</p>
             </div>
             <div v-if="performance">
                <div class="introduce">个人演唱会</div>
                <p v-for="(per,index) in performance" :key="index" class="pFormat">{{per}}</p>
             </div>
             <div v-if="achievement">
                <div class="introduce">主要成就</div>
                <p v-for="(ach,index) in achievement" :key="index" class="pFormat">{{ach}}</p>
             </div>
             <div v-if="honour">
                <div class="introduce">音乐荣誉</div>
                <p v-for="(h,index) in honour" :key="index" class="pFormat">{{h}}</p>
             </div>
         </el-tab-pane>
         <el-tab-pane label="相似歌手" name="resemble">
             <ul class="resembles">
                 <li class="resemble" v-for="rea in resembleArtists" :key="rea.id">
                     <img @click="toArtists(rea.id)" class="resembleImg" v-lazy="rea.picUrl">
                     <p style="margin:5px 0;text-align:center;">{{rea.name}}</p>
                 </li>
             </ul>
         </el-tab-pane>
       </el-tabs>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { dateFormat } from '@/utils/dateformat.js';
export default {
    name:'Artists',
    data() {
        return {
            activeName:'album',
            Introduce:[],
            masterpiece:'',
            performance:[],
            achievement:[],
            honour:[]
        }
    },
    mounted() {
        this.getData();
    },
    computed:{
        ...mapState('artist',['artistInfo','Albums','MVs','artistIntroduce','resembleArtists','musicSize','mvSize']),
    },
    watch:{
        Albums(newValue){
            newValue.forEach(item => {
                this.$set(item,'createTime',dateFormat(item.publishTime));
            });
        },
        artistIntroduce(newValue){
            this.Introduce = newValue.briefDesc.split('\n');
            this.masterpiece = newValue.introduction[0] ? newValue.introduction[0].txt : '';
            this.performance = newValue.introduction[1] ? newValue.introduction[1].txt.split('\n') : '';
            this.achievement = newValue.introduction[2] ? newValue.introduction[2].txt.split('\n') : '';
            this.honour = newValue.introduction[3] ? newValue.introduction[3].txt.split('\n') : '';
        }
    },
    methods: {
        getData(){
            this.$store.dispatch('artist/getArtistAlbumInfo',this.$route.query.id);
            this.$store.dispatch('artist/getArtistMVInfo',this.$route.query.id);
            this.$store.dispatch('artist/getSongNum',this.$route.query.id);
        },
        changeTabs(){
            if (this.activeName == 'intro') {
                this.Introduce = [];
                this.masterpiece = '';
                this.performance = [];
                this.achievement = [];
                this.honour = [];
                this.$store.dispatch('artist/getArtistIntroduce',this.$route.query.id);
            }else if (this.activeName == 'resemble') {
                this.$store.dispatch('artist/getResembleArtist',this.$route.query.id);
            }
        },
        toArtists(id){
            this.$router.push({name:'artists',query:{id}});
            this.getData();
            this.activeName = 'album';
        },
        toAlbum(id){
            this.$router.push({name:'album',query:{id}});
        },
        toMV(id){
            this.$router.push({name:'mv',query:{id}});
        }
    },
}
</script>
<style scoped>
    >>>.el-tabs__active-bar{
        background-color: #e94543;
    }
    >>>.el-tabs__item.is-active,
    >>>.el-tabs__item:hover{
        color: #e94543;
    }
    >>>.el-tabs__item{
        font-size: 14px;
    }
    .artistsMain{
        padding: 20px 100px;
        min-width: 1500px;
    }
    .artistsInfo{
        display: flex;
        height: 200px;
        margin-bottom: 30px;
    }
    .img{
        width: 200px;
        height: 200px;
        margin: 0 50px 0 0;
    }
    .artistsName{
        font-size: 22px;
        font-weight: 700;
    }
    .worksNum{
        display: flex;
        margin-top: 20px;
        font-size: 14px;
    }
    .name{
        width: 300px;
        font-size:14px;
        margin:5px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .albums,
    .MVs,
    .resembles{
        display: flex;
        flex-wrap: wrap;
        width: 1306px;
        list-style: none;
    }
    .album,
    .MV{
        position: relative;
        margin: 0 35px 20px 0;
    }
    .albums .album:nth-child(4n),
    .MVs .MV:nth-child(4n),
    .resembles .resemble:nth-child(5n){
        margin-right: 0;
    }
    .albumImg{
        width: 300px;
        height: 300px;
        border-radius: 10px;
        cursor: pointer;
    }
    .MVImg:hover .MV-playbtn{
        display: block;
    }
    .MVImg{
        width: 300px;
        height: 165px;
        border-radius: 10px;
        cursor: pointer;
    }
    .MV-playbtn{
        display: none;
        position: absolute;
        top: 50.5px;
        left: 118px;
        cursor: pointer;
    }
    .playcounts{
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .resemble{
        position: relative;
        margin: 0 76.5px 20px 0;
    }
    .resembleImg{
        width: 200px;
        height: 200px;
        border-radius: 10px;
        cursor: pointer;
    }
    .introduce{
        font-size: 20px;
        font-weight: 700;
        margin: 10px 0;
    }
    .pFormat{
        margin: 20px 0;
        text-indent: 2em;
    }
</style>