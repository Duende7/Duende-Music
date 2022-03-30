<template>
    <div class="playlistmain">
        <div class="playlist">
            <img v-lazy="playList.coverImgUrl">
            <div class="playlistinfo">
                <div class="info">
                    <span>歌单</span>
                    <span>{{playList.name}}</span>
                </div>
                <div class="create">
                    <img v-lazy="playList.creator.avatarUrl" v-if="playList.creator">
                    <span style="margin:0 10px;" v-if="playList.creator">{{playList.creator.nickname}}</span>
                    <span v-if="playList.createTime">{{dateFormat}}</span>
                    <span style="margin:0 10px;">创建 共{{playList.trackCount}}首</span>
                </div>
                <div class="btn">
                    <svg t="1648354720512" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1663" width="16" height="16"><path d="M426.666667 426.666667H85.546667A85.418667 85.418667 0 0 0 0 512c0 47.445333 38.314667 85.333333 85.546667 85.333333H426.666667v341.12c0 47.274667 38.186667 85.546667 85.333333 85.546667 47.445333 0 85.333333-38.314667 85.333333-85.546667V597.333333h341.12A85.418667 85.418667 0 0 0 1024 512c0-47.445333-38.314667-85.333333-85.546667-85.333333H597.333333V85.546667A85.418667 85.418667 0 0 0 512 0c-47.445333 0-85.333333 38.314667-85.333333 85.546667V426.666667z" p-id="1664" fill="#ffffff"></path></svg>
                    <span @click="playAll" style="margin-left:5px;">添加全部</span>  
                </div>
                <p>
                    标签：
                    <span v-for="(tag,index) in playList.tags" :key="index">
                        {{tag}}
                        <span v-if="index!=playList.tags.length-1"> / </span>
                    </span>
                </p>
                <p>
                    <div class="playListDescription">简介：<span style="font-size:14px;">{{playList.description}}</span></div>
                </p>
            </div>
        </div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="歌曲列表" name="list">
              <el-table stripe height="450" style="width: 100%" :data="playListSongs">
                <el-table-column type="index" width="80" align="center"></el-table-column>
                <el-table-column width="80">
                    <template slot-scope="{row,$index}">
                        <img v-lazy="row.al.picUrl" class="small-pic">
                        <svg @click="playSong(row)" t="1647745661966" class="icon pic-playbtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10847" width="37" height="37"><path d="M69.662 516.461a444.57 452.238 0 1 0 889.14 0 444.57 452.238 0 1 0-889.14 0Z" fill="#ffffff" p-id="10848" data-spm-anchor-id="a313x.7781069.0.i47" class="selected"></path><path d="M407.56 714.368V303.616l355.722 205.376z" fill="#d81e06" p-id="10849" data-spm-anchor-id="a313x.7781069.0.i48" class=""></path></svg>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="音乐标题" width="width"></el-table-column>
                <el-table-column label="歌手" width="width">
                    <template slot-scope="{row,$index}">
                        <span @click="toArtists(ar.id)" v-for="(ar,index) in row.ar" :key="ar.id" style="cursor: pointer;color:#2980B9;">
                            {{ar.name}}
                            <span style="color:black;cursor:auto;" v-if="index!=row.ar.length-1"> / </span>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="专辑" width="width">
                    <template slot-scope="{row,$index}">
                        <span @click="toAlbum(row.al.id)" class="albumName">{{row.al.name}}</span>
                        <svg @click="addSong(row)" t="1647851228729" class="icon waitplay" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4990" width="16" height="16"><path d="M128 554.666667h768a42.666667 42.666667 0 0 0 0-85.333334H128a42.666667 42.666667 0 0 0 0 85.333334z" p-id="4991" fill="#8a8a8a"></path><path d="M469.333333 128v768a42.666667 42.666667 0 0 0 85.333334 0V128a42.666667 42.666667 0 0 0-85.333334 0z" p-id="4992" fill="#8a8a8a"></path></svg>
                    </template>
                </el-table-column>
                <el-table-column prop="duration" label="时长" width="80"></el-table-column>
              </el-table>
          </el-tab-pane>
          <el-tab-pane :label="`评论(${commentCount||0})`" name="comment">
              <Comment :id='$route.query.id' :comments='comments' :hotComments='hotComments' :commentCount='commentCount'></Comment>
              <el-pagination
                v-if="commentCount"
                style="margin-top:20px;"
                Align="center"
                background
                layout="prev, pager, next"
                :total="commentCount"
                :page-size="pageSize"
                :current-page="page"
                @current-change="changePage">
              </el-pagination> 
          </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { dateFormat , duration} from '@/utils/dateformat.js';
import {cloneDeep} from 'lodash';
import 'animate.css';
export default {
    name:'PlayList',
    data() {
        return {
            activeName:'list',
            songIds:[],
            pageSize:10,
            page:1,
            cloneSongInfo:{},
        }
    },
    mounted() {
        this.$store.dispatch('playlist/getPlayList',this.$route.query.id);
        this.getComment();
        this.$store.commit('playlist/CLEARCOMMENTINFO'); 
    },
    computed:{
        ...mapState('playlist',['playList','playListSongs','comments','hotComments','commentCount']),
        dateFormat(){
            return dateFormat(this.playList.createTime);
        },
    },
    watch:{
        playList(newValue){
            let arr = [];
            newValue.trackIds.map(item=>{
                if (item.id) {
                   arr.push(item.id);
                }
            })
            this.songIds = arr;
            this.getSongList(); 
        },
        playListSongs(newValue){
            newValue.forEach(item => {
                this.$set(item,'duration',duration(item.dt));
            });
        },
    },
    methods: {
        getSongList(){
            this.$store.dispatch('playlist/getPlayListSongDetail',this.songIds);
        },
        changePage(page){
            this.page = page;
            this.getComment();
        },
        getComment(){
            this.$store.dispatch('playlist/getPlayListComment',{id:this.$route.query.id,limit:this.pageSize,offset:(this.page-1)*this.pageSize});  
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
        playAll(){
            this.playListSongs.map(item=>{
                let song = {
                    name : item.name,
                    id :item.id,
                    picUrl : item.al.picUrl,
                    artists : item.ar,
                    duration : item.dt
                }
                this.$bus.$emit('addSong',song);
            })
            this.cloneSongInfo = cloneDeep(this.$store.state.footer.songInfo);
            let id = this.cloneSongInfo.id;
            this.$bus.$emit('addAllSong',id);
        },
        toArtists(id){
            this.$router.push({name:'artists',query:{id}});
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
        toAlbum(id){
            this.$router.push({name:'album',query:{id}});
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
    >>>.el-table__row:hover .waitplay {
        display: block;
    }
    /* 修改表格的滚动条*/
    >>>.el-table__body-wrapper::-webkit-scrollbar {
        width: 5px;
        background-color: #ededed;
    }
    /* 表格滚动条的滑块*/
    >>>.el-table__body-wrapper::-webkit-scrollbar-thumb {
        background-color: #d8d8d8;
        border-radius: 3px;
        height: 30px;
    }
</style>
<style>
    .playlistmain{
        padding: 20px 100px;
        min-width: 1500px;
    }
    .playlist{
        display: flex;
        height: 200px;
        width: 100%;
        margin-bottom: 30px;
    }
    .playlistinfo{
        padding: 0 20px;
    }
    .info{
        width: 100%;
        height: 35px;
        margin: 5px 0;
    }
    .info span:nth-child(1){
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
    .info span:nth-child(2){
        font-size: 25px;
        font-weight: 700;
    }
    .create{
        display: flex;
        align-items: center;
        height: 54px;
        width: 100%;
    }
    .create img {
        height: 30px;
        width: 30px;
        border-radius: 50%;
    }
    .create span{
        font-size: 14px;
    }
    .btn{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 110px;
        height: 30px;
        background-color: #cd3837;
        color: #fff;
        border-radius: 20px;
        cursor: pointer;
    }
    .playlistinfo p{
        margin: 10px 0;
    }
    .playlistinfo p span{
        font-size: 14px;
    }
    .pic-playbtn{
        position: absolute;
        top: 23px;
        left: 21px;
        cursor: pointer;
    }
    .waitplay{
        float: right;
        margin-top: 3.5px;
        display: none;
        cursor: pointer;
    }
    .small-pic{
        width: 60px;
        height: 60px;
        border-radius: 5px;
    }
    .playListDescription{
        width: 700px;
        height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
</style>