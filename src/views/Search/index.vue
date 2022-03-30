<template>
    <div class="searchMain">
        <div class="searchResult">
            <div class="result">
                <h2>{{keywords}}</h2>
                <div class="count" v-if="flag==1">共找到{{songCount||0}}个结果</div>
                <div class="count" v-else-if="flag==2">共找到{{playListCount||0}}个结果</div>
                <div class="count" v-else>共找到{{mvCount||0}}个结果</div>
            </div>
            <el-tabs v-model="activeName" @tab-click="changeTabs">
              <el-tab-pane label="歌曲" name="song">
                  <el-table stripe style="width: 100%" :data="songs">
                    <el-table-column type="index" align="center" width="80"></el-table-column>
                    <el-table-column label="音乐标题" width="width">
                        <template slot-scope="{row,$index}">
                            <div style="display:flex;align-items: center;">
                                <div class="titleName">{{row.name}}</div>
                                <svg v-if="row.mv" @click="toMv(row.mv)" style="cursor: pointer;" t="1648479098223" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4833" width="16" height="16"><path d="M807.538 408.872l-99.22 231.336c-5.233 12.162-16.68 19.405-28.892 19.837a86.04 86.04 0 0 1-2.907 0c-12.311-0.416-23.858-7.66-29.108-19.837L561.499 441.17v185.847c0 18.359-14.87 33.228-33.228 33.228s-33.23-14.87-33.23-33.228V527.93l-66.755 115.618c-6.396 11.081-18.208 16.93-30.154 16.448-11.43 0.482-22.745-5.367-28.86-16.448l-73.601-133.28v116.749c0 18.359-14.87 33.228-33.229 33.228s-33.229-14.87-33.229-33.228V394.418c0-18.36 14.87-33.229 33.23-33.229 14.104 0 26.067 8.822 30.902 21.2 4.719 2.824 104.786 180.48 104.786 180.48l96.91-167.853s14.87-33.827 33.229-33.827c10.051 0 18.94 4.553 25.037 11.597 3.09-3.538 6.895-6.53 11.414-8.573 16.83-7.642 36.435-0.016 43.778 17.013l69.447 160.908 69.015-160.908c7.31-17.03 26.799-24.656 43.53-17.013 16.714 7.626 24.357 27.63 17.047 44.66z" fill="#D81E06" p-id="4834"></path><path d="M927.011 294.733c0-82.573-66.939-149.528-149.528-149.528H245.83c-82.59 0-149.528 66.955-149.528 149.528v431.969c0 82.589 66.939 149.527 149.528 149.527h531.653c82.59 0 149.528-66.938 149.528-149.527v-431.97zM794.097 942.686H229.214c-110.102 0-199.37-89.268-199.37-199.37V278.117c0-110.102 89.268-199.37 199.37-199.37h564.883c110.102 0 199.37 89.268 199.37 199.37v465.197c0 110.103-89.268 199.371-199.37 199.371z" fill="#D81E06" p-id="4835"></path></svg>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="歌手" width="width">
                        <template slot-scope="{row,$index}">
                            <span @click="toAr(ar.id)" v-for="(ar,index) in row.ar" :key="ar.id" style="cursor: pointer;color:#2980B9;">
                                {{ar.name}}
                                <span style="color:black;cursor:auto;" v-if="index!=row.ar.length-1"> / </span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="专辑" width="width">
                        <template slot-scope="{row,$index}">
                            <span @click="toAlbum(row.al.id)" class="albumName">{{row.al.name}}</span>
                            <svg @click="addSong(row)" t="1647851228729" class="icon waitPlay" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4990" width="16" height="16"><path d="M128 554.666667h768a42.666667 42.666667 0 0 0 0-85.333334H128a42.666667 42.666667 0 0 0 0 85.333334z" p-id="4991" fill="#8a8a8a"></path><path d="M469.333333 128v768a42.666667 42.666667 0 0 0 85.333334 0V128a42.666667 42.666667 0 0 0-85.333334 0z" p-id="4992" fill="#8a8a8a"></path></svg>
                            <svg @click="playSong(row)" t="1648473316618" class="icon waitPlay" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2391" width="18" height="18"><path d="M512 96C282.624 96 96 282.624 96 512s186.624 416 416 416 416-186.624 416-416S741.376 96 512 96z m0 768C317.92 864 160 706.08 160 512S317.92 160 512 160s352 157.92 352 352-157.92 352-352 352z" p-id="2392"></path><path d="M466.816 324.96a32 32 0 0 0-50.816 25.888v339.776a32 32 0 0 0 50.816 25.856l233.6-169.888a32 32 0 0 0 0-51.776l-233.6-169.856z" p-id="2393" fill="#8a8a8a"></path></svg>
                        </template>
                    </el-table-column>
                    <el-table-column prop="duration" label="时长" width="80"></el-table-column>
                  </el-table>
                  <el-pagination
                    style="margin-top:20px;"
                    Align="center"
                    background
                    layout="prev, pager, next"
                    :total="songCount"
                    :page-size="pageSize"
                    :current-page="page"
                    @current-change="changePage">
                  </el-pagination>
              </el-tab-pane>
              <el-tab-pane label="歌单" name="playlist">
                  <ul class="recommendList">
                      <li class="recommendListItem" v-for="pl in playLists" :key="pl.id">
                        <p class="recommendPlayCount">播放量：{{pl.playCount}}</p>
                        <img @click="toPlayList(pl.id)" class="itemImg" :src="pl.coverImgUrl">
                        <p class="itemTxt">{{pl.name}}</p>
                        <svg @click="toPlayList(pl.id)" t="1647745661966" class="icon recommendPlayBtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10847" width="37" height="37"><path d="M69.662 516.461a444.57 452.238 0 1 0 889.14 0 444.57 452.238 0 1 0-889.14 0Z" fill="#ffffff" p-id="10848" data-spm-anchor-id="a313x.7781069.0.i47" class="selected"></path><path d="M407.56 714.368V303.616l355.722 205.376z" fill="#d81e06" p-id="10849" data-spm-anchor-id="a313x.7781069.0.i48" class=""></path></svg>
                      </li>
                  </ul>
                  <el-pagination
                    style="margin-top:20px;"
                    Align="center"
                    background
                    layout="prev, pager, next"
                    :total="playListCount"
                    :page-size="pageSize"
                    :current-page="page"
                    @current-change="changePage">
                  </el-pagination>
              </el-tab-pane>
              <el-tab-pane label="MV" name="mv">
                  <ul class="mvs">
                      <li class="mv" v-for="mv in mvs" :key="mv.id">
                          <div class="playCounts">
                             <svg t="1647766935268" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11909" width="16" height="16"><path d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z" fill="#ffffff" p-id="11910"></path></svg>
                             <span style="font-size:12px;color:#fff;">{{mv.playCount}}</span>
                          </div>
                          <div class="duration">{{mv.durations}}</div>
                          <div @click="toMv(mv.id)" class="mvImg">
                              <img class="mvImg" :src="mv.cover">
                              <svg t="1647745661966" class="icon mvPlaybtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10847" width="64" height="64"><path d="M69.662 516.461a444.57 452.238 0 1 0 889.14 0 444.57 452.238 0 1 0-889.14 0Z" fill="#ffffff" p-id="10848" data-spm-anchor-id="a313x.7781069.0.i47" class="selected"></path><path d="M407.56 714.368V303.616l355.722 205.376z" fill="#d81e06" p-id="10849" data-spm-anchor-id="a313x.7781069.0.i48" class=""></path></svg>
                          </div>
                          <div class="mvName">{{mv.name}}</div>
                          <div class="arName"><span v-for="mvAr in mv.artists" :key="mvAr.id">{{mvAr.name}} </span></div>
                      </li>
                  </ul>
                  <el-pagination
                    style="margin-top:20px;"
                    Align="center"
                    background
                    layout="prev, pager, next"
                    :total="mvCount"
                    :page-size="pageSize"
                    :current-page="page"
                    @current-change="changePage">
                  </el-pagination>
              </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { duration } from '@/utils/dateformat.js';
export default {
    name:'Search',
    data() {
        return {
            activeName:'song',
            keywords:'',
            pageSize:30,
            page:1,
            type:1,
            flag:1
        }
    },
    mounted() {
        window.addEventListener('popstate',this.getKeywords);
        this.$bus.$on('getKeywords',this.getKeywords);
        this.getKeywords();
        this.getData();
    },
    beforeDestroy() {
        this.$bus.$off('getKeywords');
    },
    computed:{
        ...mapState('search',['songs','songCount','playLists','playListCount','mvs','mvCount'])
    },
    watch:{
        songs(newValue){
            newValue.forEach(item => {
                this.$set(item,'duration',duration(item.dt));
            });     
        },
        mvs(newValue){
            newValue.forEach(item => {
                this.$set(item,'durations',duration(item.duration));
            });
        },
    },
    methods: {
        getKeywords(){
            this.keywords = this.$route.query.keywords;
            this.getData();
        },
        getData(){
            this.$store.dispatch('search/getSearchResult',{keywords:this.keywords,limit:this.pageSize,type:this.type,offset:(this.page-1)*this.pageSize});
        },
        changeTabs(){
            if (this.activeName == 'song') {
                this.type = 1;
                this.flag = 1;
                this.pageSize = 30;
                this.page = 1;
            }else if (this.activeName == 'playlist') {
                this.type = 1000;
                this.flag = 2;
                this.pageSize = 50;
                this.page = 1;
            } else {
                this.type = 1004;
                this.flag = 3;
                this.pageSize = 40;
                this.page = 1;
            }
            this.getData();
        },
        changePage(page){
            this.page = page;
            this.getData();
        },
        toMv(id){
            this.$router.push({name:'mv',query:{id}});
        },
        toAr(id){
           this.$router.push({name:'artists',query:{id}}); 
        },
        toAlbum(id){
            this.$router.push({name:'album',query:{id}}); 
        },
        addSong(row){
            let Info = {
              name : row.name,
              id :row.id,
              picUrl : row.al.picUrl,
              artists : row.ar,
              duration : row.dt,
              from:'playlist'
            }
            this.$bus.$emit('addSong',Info);
        },
        playSong(row){
            let id = row.id;
            this.$store.dispatch('footer/getSongUrl',id);
            this.$store.commit('footer/GETSONGINFO1',row);
            let Info = {
              name : row.name,
              id :row.id,
              picUrl : row.al.picUrl,
              artists : row.ar,
              duration : row.dt
            }
            this.$bus.$emit('addSong',Info);
        },
        toPlayList(id){
            this.$router.push({name:'playlist',query:{id}});
        },
        toMv(id){
            this.$router.push({name:'mv',query:{id}});
        }
    },
}
</script>
<style scoped>
    /* 修改分页器选中背景和字体 */
    >>>.el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #e94543;
        color: #fff;
    } 
    /* 修改分页器未选中背景和字体 */
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
    >>>.el-tabs__active-bar{
        background-color: #e94543;
    }
    >>>.el-tabs__item.is-active,
    >>>.el-tabs__item:hover{
        color: #e94543;
    }
    >>>.el-tabs__item{
        font-size: 18px;
    }
    >>>.el-icon-d-arrow-right,
    >>>.el-icon-d-arrow-left{
        color: #e94543!important;
    }
    >>>.el-table .cell{
        white-space: nowrap;
    }
    >>>.el-table__row:hover .waitPlay {
        display: block;
    }
    .searchMain{
        padding: 20px 100px;
        min-width: 1500px;
    }
    .searchResult{
       width: 100%;
    }
    .result{
        display: flex;
        align-items: flex-end;
        margin-bottom: 30px;
    }
    .count{
        font-size: 12px;
        color: #808080;
        margin-left: 10px;
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
    .duration{
        position: absolute;
        right: 5px;
        bottom: 50px;
        font-size:12px;
        color:#fff;
    }
    .waitPlay{
        float: right;
        margin: 3.5px 0 0 10px;
        display: none;
        cursor: pointer;
    }
    .albumName{
        display:inline-block;
        width:300px;
        cursor: pointer;
        color:#2980B9;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .titleName{
        width:300px;
        margin-right:5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>