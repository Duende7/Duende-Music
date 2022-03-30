<template>
    <div class="albumMain">
        <div class="songList">
            <img class="albumImg" v-lazy="albumInfo.picUrl">
            <div class="albumInfo">
                <div>
                    <span class="albumName">专辑</span>
                    <span style="font-size:25px;font-weight:700;">{{albumInfo.name}}</span>
                </div>
                <div class="infoStyle">歌手：<span v-for="ar in albumInfo.artists" :key="ar.id">{{ar.name}}</span></div>
                <div class="infoStyle">创建时间：{{albumInfo.createTime}}</div>
                <div class="albumBtn">
                    <svg t="1648354720512" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1663" width="16" height="16"><path d="M426.666667 426.666667H85.546667A85.418667 85.418667 0 0 0 0 512c0 47.445333 38.314667 85.333333 85.546667 85.333333H426.666667v341.12c0 47.274667 38.186667 85.546667 85.333333 85.546667 47.445333 0 85.333333-38.314667 85.333333-85.546667V597.333333h341.12A85.418667 85.418667 0 0 0 1024 512c0-47.445333-38.314667-85.333333-85.546667-85.333333H597.333333V85.546667A85.418667 85.418667 0 0 0 512 0c-47.445333 0-85.333333 38.314667-85.333333 85.546667V426.666667z" p-id="1664" fill="#ffffff"></path></svg>
                    <span @click="playAll" style="margin-left:5px;">添加全部</span> 
                </div>
            </div>
        </div>
        <!-- @tab-click="handleClick" -->
        <el-tabs v-model="activeName">
            <el-tab-pane :label="`歌曲列表(${songList.length})`" name="list">
                <el-table style="width: 100%" :stripe="true" :data="songList">
                    <el-table-column type="index" align="center" width="80"></el-table-column>
                    <el-table-column prop="name" label="音乐标题" width="width"></el-table-column>
                    <el-table-column label="歌手" width="width">
                        <template slot-scope="{row,$index}">
                            <span @click="toArtist(ars.id)" style="color: #2980B9;cursor: pointer;" v-for="ars in row.ar" :key="ars.id">{{ars.name}}&nbsp;</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="专辑" width="width">
                        <template slot-scope="{row,$index}">
                            <span class="albumname">{{row.al.name}}&nbsp;</span>
                            <svg @click="addSong(row)" t="1647851228729" class="icon waitPlay" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4990" width="16" height="16"><path d="M128 554.666667h768a42.666667 42.666667 0 0 0 0-85.333334H128a42.666667 42.666667 0 0 0 0 85.333334z" p-id="4991" fill="#8a8a8a"></path><path d="M469.333333 128v768a42.666667 42.666667 0 0 0 85.333334 0V128a42.666667 42.666667 0 0 0-85.333334 0z" p-id="4992" fill="#8a8a8a"></path></svg>
                            <svg @click="playSong(row)" t="1648473316618" class="icon waitPlay" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2391" width="18" height="18"><path d="M512 96C282.624 96 96 282.624 96 512s186.624 416 416 416 416-186.624 416-416S741.376 96 512 96z m0 768C317.92 864 160 706.08 160 512S317.92 160 512 160s352 157.92 352 352-157.92 352-352 352z" p-id="2392"></path><path d="M466.816 324.96a32 32 0 0 0-50.816 25.888v339.776a32 32 0 0 0 50.816 25.856l233.6-169.888a32 32 0 0 0 0-51.776l-233.6-169.856z" p-id="2393" fill="#8a8a8a"></path></svg>
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
            <el-tab-pane label="专辑详情" name="detail">
                <div class="albumIntro">专辑介绍</div>
                <p class="pFormat" v-for="(p,index) in description" :key="index">{{p}}</p>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>
<script>
import { mapState } from 'vuex';
import { dateFormat, duration } from '@/utils/dateformat.js';
import {cloneDeep} from 'lodash';
export default {
    name:'Album',
    data() {
        return {
            activeName:'list',
            description:'',
            pageSize:10,
            page:1,
            cloneSongInfo:{}
        }
    },
    mounted() {
        this.getData();
        this.$store.commit('album/CLEARSONGLISTANDALBUMINFO');
    },
    computed:{
        ...mapState('album',['albumInfo','songList','comments','hotComments','commentCount']),
    },
    watch:{
        albumInfo(newValue){
            this.$set(newValue,'createTime',dateFormat(newValue.publishTime));
            this.description = newValue.description.split('\n');
        },
        songList(newValue){
            newValue.forEach(item => {
                this.$set(item,'duration',duration(item.dt));
            });
        }
    },
    methods: {
        getData(){
            this.$store.dispatch('album/getAlbumDetail',this.$route.query.id);
            this.$store.dispatch('album/getAlbumComment',{id:this.$route.query.id,limit:this.pageSize,offset:(this.page-1)*this.pageSize});
        },
        changePage(page){
            this.page = page;
            this.$store.dispatch('album/getAlbumComment',{id:this.$route.query.id,limit:this.pageSize,offset:(this.page-1)*this.pageSize});
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
        playSong(songInfo){
            let id = songInfo.id;
            this.$store.dispatch('footer/getSongUrl',id);
            this.$store.commit('footer/GETSONGINFO1',songInfo);
            let Info = {
              name : songInfo.name,
              id :songInfo.id,
              picUrl : songInfo.al.picUrl,
              artists : songInfo.ar,
              duration : songInfo.dt
          }
          this.$bus.$emit('addSong',Info);
        },
        playAll(){
            this.songList.map(item=>{
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
        toArtist(id){
            this.$router.push({name:'artists',query:{id}});
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
    >>>.el-table__row:hover .waitPlay {
        display: block;
    }
    .albumMain{
        padding: 20px 100px;
        min-width: 1500px;
    }
    .songList{
        display: flex;
        height: 200px;
        margin-bottom: 30px;
    }
    .albumImg{
        width: 200px;
        height: 200px;
        margin: 0 20px 0 0;
    }
    .albumName{
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
    .infoStyle{
        font-size: 14px;
        margin: 20px 10px;
    }
    .albumBtn{
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
    .albumIntro{
        font-size:20px;
        margin:10px 0;
        font-weight:700;
    }
    .pFormat{
        margin: 20px 0;
        text-indent: 2em;
    }
    .waitPlay{
        display: none;
        float: right;
        margin: 3.5px 0 0 10px;
        cursor: pointer;
    }
    .albumname{
        display:inline-block;
        width:300px;
        cursor: pointer;
        color:#2980B9;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>