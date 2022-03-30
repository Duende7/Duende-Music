<template>
  <div>
    <el-drawer :visible.sync="visible" :stripe="true" :show-close="false" :withHeader="false">
        <!-- <inBody :visible="visible"> -->
            <div class="header">
                <div class="left">播放列表({{playList.length}})</div>
                <div class="right">
                    <svg t="1648177956692" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2840" width="16" height="16"><path d="M853.4 333.5H199.8c-3.9 0-7 3.4-6.6 7.3l60.1 630c0 29.3 23.8 53.1 53.1 53.1H747c29.3 0 53.1-23.8 53.1-53.1l60.1-630c0.2-3.9-2.8-7.3-6.8-7.3zM388.8 890.9h-19.5c-13 0-23.6-10.6-23.6-23.6l-24.3-376c0-13 10.6-23.6 23.6-23.6h19.5c13 0 23.6 10.6 23.6 23.6l24.3 376c0 13-10.6 23.6-23.6 23.6z m171.3-23.6c0 13-10.6 23.6-23.6 23.6H517c-13 0-23.6-10.6-23.6-23.6v-376c0-13 10.6-23.6 23.6-23.6h19.5c13 0 23.6 10.6 23.6 23.6v376z m148.3 0c0 13-10.6 23.6-23.6 23.6h-19.5c-13 0-23.6-10.6-23.6-23.6l24.3-376c0-13 10.6-23.6 23.6-23.6h19.5c13 0 23.6 10.6 23.6 23.6l-24.3 376zM869.3 153.2l-705 162c-4 0.9-7.9-1.6-8.8-5.5l-8.8-38.5c-6.8-29.5 11.8-59.2 41.3-66L800 64.5c29.5-6.8 59.2 11.8 66 41.3l8.8 38.5c0.9 4-1.5 8-5.5 8.9zM386.5 127.3c-6.5-27.9 11-56.1 39-62.6l98.2-22.8c27.9-6.5 56.1 11 62.6 39l3.8 16.2 44.3-10.3-3.1-13.3c-11.7-50.4-62.5-82-112.8-70.3L413.6 27.6c-50.4 11.7-82 62.5-70.3 112.8l3 13.1 43.9-10.2-3.7-16z" p-id="2841" fill="#757575"></path></svg>
                    <span @click="clearAll">清空列表</span>
                </div>
            </div>
        <!-- </inBody> -->
        <div class="main">
            <el-table :data="playList" height="750" :stripe="true" style="width: 100%" empty-text="什么都没有哈，快去听歌吧！">
              <el-table-column width="width">
                  <template slot-scope="{row,$index}">
                      <div class="songname" @click="playSong(row)" :style="row.active">
                          <div style="width:20px;height:20px;"><svg v-show="row.isPlay" t="1648196752713" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4211" width="14" height="14"><path d="M158.249961 614.402466c37.219322 0 67.372153 30.559802 67.372153 68.272422v273.065023c0 37.700288-30.152831 68.260089-67.372153 68.260089S90.865475 993.440198 90.865475 955.739911V682.674888a68.753387 68.753387 0 0 1 19.731914-48.269194 66.977515 66.977515 0 0 1 47.652572-20.003228zM394.083329 0.04933c37.20699 0 67.372153 30.572134 67.372153 68.272422v887.418159c0 37.700288-30.165163 68.260089-67.372153 68.260089s-67.322823-30.559802-67.322824-68.260089V68.272422c0-37.700288 30.103501-68.223092 67.322824-68.223092zM629.916696 273.077355c37.20699 0 67.384486 30.559802 67.384486 68.260089v614.402467c0 37.700288-30.177496 68.260089-67.384486 68.260089s-67.384486-30.559802-67.384486-68.260089v-614.402467c0-37.700288 30.165163-68.260089 67.384486-68.260089z m235.833368-136.544844a66.878855 66.878855 0 0 1 47.640239 20.003228 68.704057 68.704057 0 0 1 19.731914 48.269194v750.934978c0 37.700288-30.177496 68.260089-67.384486 68.260089s-67.384486-30.559802-67.384486-68.260089V204.767936a68.753387 68.753387 0 0 1 19.731914-48.269195 66.928185 66.928185 0 0 1 47.652572-20.003227z m0 0" p-id="4212" fill="#d81e06"></path></svg></div>
                          <span class="songName">{{row.name}}</span> 
                      </div>
                  </template>
              </el-table-column>
              <el-table-column width="width">
                  <template slot-scope="{row,$index}">
                      <div class="artistName"><span v-for="artist in row.artists" :key="artist.id" class="artistname" :style="row.active">{{artist.name}}&nbsp;</span></div> 
                  </template>
              </el-table-column>
              <el-table-column width="100">
                  <template slot-scope="{row,$index}">
                      <span :style="row.active">{{row.durations}}</span>
                      <svg @click="clearSong(row)" t="1648204297410" class="icon clearsong" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4689" width="16" height="16"><path d="M813.653333 802.986667a42.666667 42.666667 0 0 1-60.373333 0L512 561.706667 270.72 802.986667a42.666667 42.666667 0 1 1-60.373333-60.373334L451.626667 501.333333 210.346667 260.053333a42.666667 42.666667 0 0 1 30.293333-72.746666 42.666667 42.666667 0 0 1 30.08 12.373333L512 440.96 753.28 199.68a42.666667 42.666667 0 0 1 72.746667 30.293333 42.666667 42.666667 0 0 1-12.373334 30.08L572.373333 501.333333l241.28 241.28a42.666667 42.666667 0 0 1 0 60.373334z" p-id="4690" fill="#8a8a8a"></path></svg>
                  </template>
              </el-table-column>
            </el-table>
        </div>
    </el-drawer>
  </div>
</template>
<script>
import { duration } from '@/utils/dateformat.js';
export default {
  name: "Drawer",
  data() {
      return {
          visible:false,
          playList:[],
          playNowId:0
      }
  },
  mounted() {
      this.$bus.$on('openDrawer',()=>this.visible = this.visible ? false : true)
      this.$bus.$on('addSong',this.addSong);
      this.$bus.$on('prevSong',this.prevSong);
      this.$bus.$on('nextSong',this.nextSong);
      this.$bus.$on('addAllSong',this.addAllSong);
      this.playList = JSON.parse(localStorage.getItem('playList'));
  },
  beforeDestroy() {
      this.$bus.$off('openDrawer');
      this.$bus.$off('addSong');
      this.$bus.$off('prevSong');
      this.$bus.$off('nextSong');
      this.$bus.$off('addAllSong');
  },
  methods: {
      addSong(songInfo){
          this.playList.forEach(item => {
            if (item.id == songInfo.id) {
                if (songInfo.from) {
                   return 
                }
                item.isPlay = true;
                item.active = {color:'#ed706f'}; 
            }else{
                if (songInfo.from) {
                   return 
                }
                item.isPlay = false;
                item.active = {};
            }
          });
          let isadd =  this.playList.some(item=>{
              return item.id == songInfo.id;
          })
          if (!isadd) { 
            if (songInfo.from=='playlist') {
                this.$set(songInfo,'isPlay',false);
                this.$set(songInfo,'active',{}); 
            }else{
                this.$set(songInfo,'isPlay',true);
                this.$set(songInfo,'active',{color:'#ed706f'}); 
            }         
            this.playList.push(songInfo); 
          }
      },
      addAllSong(id){
         this.playList.forEach(item=>{
             if (item.id == id) {
                item.isPlay = true;
                item.active = {color:'#ed706f'}; 
            }else{
                item.isPlay = false;
                item.active = {};
            }
         })
      },
      changeSong(obj){
          obj.isPlay = true;
          obj.active = {color:'#ed706f'};
          this.$store.dispatch('footer/getSongUrl',obj.id);
          this.$store.commit('footer/GETSONGINFO2',obj);
      },
      playSong(row){
          this.playList.forEach(item => {
            item.isPlay = false;
            item.active = {};
          });
          this.changeSong(row);
      },
      clearSong(row){
          this.playList.length == 1 ? this.clearAll() : '';
          row.isPlay == true ? this.nextSong() : '';
          this.playList = this.playList.filter(item=>{
              return item.id != row.id;
          })
      },
      clearAll(){
          this.playList = [];
          this.$store.commit('footer/CLEARSONGINFO');
          this.$bus.$emit('changePlayOrPause');
      },
      prevSong(){
          let index = 0;
          this.playList.forEach(item=>{
              if (item.isPlay == true) {
                  index = this.playList.indexOf(item);
                  item.isPlay = false;
                  item.active = {};
              }
          })
          if (index == 0) {
              this.changeSong(this.playList[this.playList.length-1]);
          }else{
              this.changeSong(this.playList[index-1]);
          }
      },
      nextSong(){
         let index = 0;
         this.playList.forEach(item=>{
             if (item.isPlay == true) {
                 index = this.playList.indexOf(item);
                 item.isPlay = false;
                 item.active = {};
             }
         })
         if (index == this.playList.length-1) {
             this.changeSong(this.playList[0]);
         }else{
             this.changeSong(this.playList[index+1]);
         } 
      }
  },
  watch:{
     playList:{
         deep:true,
         handler(newvalue){
            this.$bus.$emit('getSongCount',newvalue.length);
            newvalue.forEach(item=>{
            if (!item.durations) {
               this.$set(item,'durations',duration(item.duration)); 
            }
         })
         localStorage.setItem('playList',JSON.stringify(newvalue));
         }
     } 
  }
};
</script>
<style scoped>
>>>.el-drawer.rtl{
    width: 25%!important;
    height: 86%;
    top: 70px;
    border-radius: 10px 0 0 10px;
}
>>>.el-table th.el-table__cell.is-leaf{
    border: none;
    padding: 0;
}
>>>.el-drawer__body{
    overflow: hidden;
}
>>>.el-table__body{
    width: 420px!important;
}
>>>.el-table .cell{
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    color: #787878;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
>>>.el-table__row:hover .clearsong{
    display: block;
}
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

.header{
    /* position: fixed;
    top: 70px;
    right: 0; */
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 427px;
    height: 40px;
    padding: 0 20px;
    border-bottom: 2px solid #e94543;
}
.left{
    color: #e94543;
}
.right{
    display: flex;
    align-items: center;
    padding-left: 105px;
    cursor: pointer;
    color: #757575;
}
.songname{
    display:flex;
    cursor: pointer;
    width: 160px;
}
.songName{
    width: 140px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.songname:hover {
    color: #EC4141;
}
.artistname{
    cursor: pointer;
}
.artistName{
    width: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.artistname:hover{
    color:#357eb8!important;
}
.clearsong{
    display: none;
    margin-left: 30px;
    cursor: pointer;
}
</style>