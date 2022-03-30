<template>
    <div class="newSongs">
        <el-table stripe style="width: 100%" :data="newSongs">
            <el-table-column type="index" align="center" width="80"></el-table-column>
            <el-table-column prop="date" width="100">
                <template slot-scope="{row,$index}">
                    <img style="border-radius: 10px;" height="60" width="60" v-lazy="row.album.picUrl">
                    <svg @click="playSong(row)" t="1647745661966" class="icon picPlayBtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10847" width="37" height="37"><path d="M69.662 516.461a444.57 452.238 0 1 0 889.14 0 444.57 452.238 0 1 0-889.14 0Z" fill="#ffffff" p-id="10848" data-spm-anchor-id="a313x.7781069.0.i47" class="selected"></path><path d="M407.56 714.368V303.616l355.722 205.376z" fill="#d81e06" p-id="10849" data-spm-anchor-id="a313x.7781069.0.i48" class=""></path></svg>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="音乐标题" width="width"></el-table-column>
            <el-table-column label="歌手" width="width">
                <template slot-scope="{row,$index}">
                    <span @click="toArtists(ar.id)" v-for="(ar,index) in row.artists" :key="ar.id" style="cursor: pointer;color:#2980B9;">
                        {{ar.name}}
                        <span style="color:black;cursor:auto;" v-if="index!=row.artists.length-1"> / </span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="专辑" width="width">
                <template slot-scope="{row,$index}">
                    <span @click="toAlbum(row.album.id)" class="albumName">{{row.album.name}}</span>
                    <svg @click="addSong(row)" t="1647851228729" class="icon waitPlay" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4990" width="16" height="16"><path d="M128 554.666667h768a42.666667 42.666667 0 0 0 0-85.333334H128a42.666667 42.666667 0 0 0 0 85.333334z" p-id="4991" fill="#8a8a8a"></path><path d="M469.333333 128v768a42.666667 42.666667 0 0 0 85.333334 0V128a42.666667 42.666667 0 0 0-85.333334 0z" p-id="4992" fill="#8a8a8a"></path></svg>
                </template>
            </el-table-column>
            <el-table-column prop="durations" label="时长" width="80"></el-table-column>
        </el-table>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { duration } from '@/utils/dateformat.js';
export default {
    name:'NewSongs',
    data() {
        return {
            type:0
        }
    },
    mounted() {
        this.$store.dispatch('recommend/getNewSongs',this.type);
    },
    computed:{
        ...mapState('recommend',['newSongs']),
    },
    watch:{
        newSongs(newValue){
            newValue.forEach(item => {
                this.$set(item,'durations',duration(item.duration));
            });
        },
    },
    methods:{
        playSong(row){
            let id = row.id;
            this.$store.dispatch('footer/getSongUrl',id);
            this.$store.commit('footer/GETSONGINFO3',row);
            let Info = {
              name : row.name,
              id :row.id,
              picUrl : row.album.picUrl,
              artists : row.artists,
              duration : row.duration
            }
            this.$bus.$emit('addSong',Info);
        },
        addSong(row){
            let Info = {
              name : row.name,
              id :row.id,
              picUrl : row.album.picUrl,
              artists : row.artists,
              duration : row.duration,
              from:'playlist'
            }
            this.$bus.$emit('addSong',Info);
        },
        toAlbum(id){
            this.$router.push({name:'album',query:{id}});
        },
        toArtists(id){
            this.$router.push({name:'artists',query:{id}});
        }
    }
}
</script>
<style scoped>
    >>>.el-table__row:hover .waitPlay {
        display: block;
    }
    >>>.el-table .cell{
        white-space: nowrap;
    }
    .newSongs{
        padding: 20px 100px;
        min-width: 1500px;
    }
    .picPlayBtn{
        position: absolute;
        top: 23px;
        left: 21px;
        cursor: pointer;
    }
    .waitPlay{
        float: right;
        margin-top: 3.5px;
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
</style>