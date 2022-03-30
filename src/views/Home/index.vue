<template>
  <div class="homemain">
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="250px" arrow="never">
        <el-carousel-item v-for="(item,index) in bannerList" :key="index">
          <img v-lazy="item.imageUrl" style="width:100%;height:100%">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="recommendlist">
        <h3>
            <svg t="1647740818097" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2325" width="16" height="16"><path d="M510.396145 994.312225C244.834699 994.312225 28.787149 778.264675 28.787149 512.707341 28.787149 247.145896 244.834699 31.098345 510.396145 31.098345s481.613108 216.04755 481.613108 481.608996c0 28.388241-23.017382 51.405622-51.405622 51.405623s-51.405622-23.017382-51.405623-51.405623c0-208.871325-169.926426-378.797751-378.801863-378.797751-208.871325 0-378.797751 169.926426-378.797751 378.797751 0 208.867213 169.926426 378.793639 378.797751 378.793639 28.392353 0 51.405622 23.017382 51.405622 51.405622s-23.013269 51.405622-51.405622 51.405623z" fill="#be1612" p-id="2326" data-spm-anchor-id="a313x.7781069.0.i9" class=""></path><path d="M707.995245 946.385735a51.397398 51.397398 0 0 1-45.689317-27.779598c-13.057028-25.209317-3.203598-56.229526 22.009831-69.286555 74.55049-38.611791 134.978827-101.799582 170.15261-177.933365 11.909655-25.772723 42.444594-37.012048 68.229655-25.102394 25.772723 11.909655 37.012048 42.452819 25.102394 68.229655-44.702329 96.745382-121.48588 177.045076-216.207936 226.098377a51.113639 51.113639 0 0 1-23.597237 5.77388z" fill="#fc8183" p-id="2327" data-spm-anchor-id="a313x.7781069.0.i8" class=""></path><path d="M510.396145 673.668627c-88.754892 0-160.965398-72.210506-160.965398-160.965398S421.641253 351.737831 510.396145 351.737831c88.759004 0 160.965398 72.210506 160.965397 160.965398s-72.210506 160.965398-160.965397 160.965398z m0-219.115438c-32.064771 0-58.154153 26.085269-58.154153 58.154152 0 32.064771 26.085269 58.154153 58.154153 58.154153s58.154153-26.089382 58.154152-58.154153-26.089382-58.154153-58.154152-58.154152z" fill="#be1713" p-id="2328" data-spm-anchor-id="a313x.7781069.0.i6" class=""></path></svg>
            推荐歌单
        </h3>
        <ul>
            <li v-for="song in recommendSongs" :key="song.id">
                <p class="recommendhot">{{song.copywriter}}</p>
                <img v-lazy="song.picUrl" @click="toPlayList(song.id)">
                <p style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{song.name}}</p>
                <svg @click="toPlayList(song.id)" t="1647745661966" class="icon recommend-playbtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10847" width="37" height="37"><path d="M69.662 516.461a444.57 452.238 0 1 0 889.14 0 444.57 452.238 0 1 0-889.14 0Z" fill="#ffffff" p-id="10848" data-spm-anchor-id="a313x.7781069.0.i47" class="selected"></path><path d="M407.56 714.368V303.616l355.722 205.376z" fill="#d81e06" p-id="10849" data-spm-anchor-id="a313x.7781069.0.i48" class=""></path></svg>
            </li>
        </ul>
    </div>
    <div class="newlist">
        <h3>
            <svg t="1647740818097" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2325" width="16" height="16"><path d="M510.396145 994.312225C244.834699 994.312225 28.787149 778.264675 28.787149 512.707341 28.787149 247.145896 244.834699 31.098345 510.396145 31.098345s481.613108 216.04755 481.613108 481.608996c0 28.388241-23.017382 51.405622-51.405622 51.405623s-51.405622-23.017382-51.405623-51.405623c0-208.871325-169.926426-378.797751-378.801863-378.797751-208.871325 0-378.797751 169.926426-378.797751 378.797751 0 208.867213 169.926426 378.793639 378.797751 378.793639 28.392353 0 51.405622 23.017382 51.405622 51.405622s-23.013269 51.405622-51.405622 51.405623z" fill="#be1612" p-id="2326" data-spm-anchor-id="a313x.7781069.0.i9" class=""></path><path d="M707.995245 946.385735a51.397398 51.397398 0 0 1-45.689317-27.779598c-13.057028-25.209317-3.203598-56.229526 22.009831-69.286555 74.55049-38.611791 134.978827-101.799582 170.15261-177.933365 11.909655-25.772723 42.444594-37.012048 68.229655-25.102394 25.772723 11.909655 37.012048 42.452819 25.102394 68.229655-44.702329 96.745382-121.48588 177.045076-216.207936 226.098377a51.113639 51.113639 0 0 1-23.597237 5.77388z" fill="#fc8183" p-id="2327" data-spm-anchor-id="a313x.7781069.0.i8" class=""></path><path d="M510.396145 673.668627c-88.754892 0-160.965398-72.210506-160.965398-160.965398S421.641253 351.737831 510.396145 351.737831c88.759004 0 160.965398 72.210506 160.965397 160.965398s-72.210506 160.965398-160.965397 160.965398z m0-219.115438c-32.064771 0-58.154153 26.085269-58.154153 58.154152 0 32.064771 26.085269 58.154153 58.154153 58.154153s58.154153-26.089382 58.154152-58.154153-26.089382-58.154153-58.154152-58.154152z" fill="#be1713" p-id="2328" data-spm-anchor-id="a313x.7781069.0.i6" class=""></path></svg>
            最新音乐
        </h3>
        <ul>
            <li v-for="newSong in newSongs" :key="newSong.id">
                <img v-lazy="newSong.picUrl" @click="startPlay(newSong)">
                <div class="music-info">
                    <p>{{newSong.name}}</p>
                    <p><span v-for="artistName in newSong.song.artists" :key="artistName.id">{{artistName.name}} </span></p>
                </div>
                <svg @click="startPlay(newSong)" t="1647745661966" class="icon new-playbtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10847" width="37" height="37" ><path d="M69.662 516.461a444.57 452.238 0 1 0 889.14 0 444.57 452.238 0 1 0-889.14 0Z" fill="#ffffff" p-id="10848" data-spm-anchor-id="a313x.7781069.0.i47" class="selected"></path><path d="M407.56 714.368V303.616l355.722 205.376z" fill="#d81e06" p-id="10849" data-spm-anchor-id="a313x.7781069.0.i48" class=""></path></svg>
            </li>
        </ul>
    </div>
    <div class="mvlist">
        <h3>
            <svg t="1647740818097" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2325" width="16" height="16"><path d="M510.396145 994.312225C244.834699 994.312225 28.787149 778.264675 28.787149 512.707341 28.787149 247.145896 244.834699 31.098345 510.396145 31.098345s481.613108 216.04755 481.613108 481.608996c0 28.388241-23.017382 51.405622-51.405622 51.405623s-51.405622-23.017382-51.405623-51.405623c0-208.871325-169.926426-378.797751-378.801863-378.797751-208.871325 0-378.797751 169.926426-378.797751 378.797751 0 208.867213 169.926426 378.793639 378.797751 378.793639 28.392353 0 51.405622 23.017382 51.405622 51.405622s-23.013269 51.405622-51.405622 51.405623z" fill="#be1612" p-id="2326" data-spm-anchor-id="a313x.7781069.0.i9" class=""></path><path d="M707.995245 946.385735a51.397398 51.397398 0 0 1-45.689317-27.779598c-13.057028-25.209317-3.203598-56.229526 22.009831-69.286555 74.55049-38.611791 134.978827-101.799582 170.15261-177.933365 11.909655-25.772723 42.444594-37.012048 68.229655-25.102394 25.772723 11.909655 37.012048 42.452819 25.102394 68.229655-44.702329 96.745382-121.48588 177.045076-216.207936 226.098377a51.113639 51.113639 0 0 1-23.597237 5.77388z" fill="#fc8183" p-id="2327" data-spm-anchor-id="a313x.7781069.0.i8" class=""></path><path d="M510.396145 673.668627c-88.754892 0-160.965398-72.210506-160.965398-160.965398S421.641253 351.737831 510.396145 351.737831c88.759004 0 160.965398 72.210506 160.965397 160.965398s-72.210506 160.965398-160.965397 160.965398z m0-219.115438c-32.064771 0-58.154153 26.085269-58.154153 58.154152 0 32.064771 26.085269 58.154153 58.154153 58.154153s58.154153-26.089382 58.154152-58.154153-26.089382-58.154153-58.154152-58.154152z" fill="#be1713" p-id="2328" data-spm-anchor-id="a313x.7781069.0.i6" class=""></path></svg>
            推荐MV
        </h3>
        <ul>
            <li v-for="mv in newMV" :key="mv.id">
                <img @click="toMV(mv.id)" v-lazy="mv.picUrl">
                <p style="">{{mv.name}}</p>
                <p>{{mv.artistName}}</p>
                <div class="playcount">
                    <svg t="1647766935268" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11909" width="16" height="16"><path d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z" fill="#ffffff" p-id="11910"></path></svg>
                    <span style="font-size:12px;color:#fff;">{{mv.playCount}}</span>
                </div>
                <svg @click="toMV(mv.id)" t="1647745661966" class="icon mv-playbtn" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10847" width="37" height="37"><path d="M69.662 516.461a444.57 452.238 0 1 0 889.14 0 444.57 452.238 0 1 0-889.14 0Z" fill="#ffffff" p-id="10848" data-spm-anchor-id="a313x.7781069.0.i47" class="selected"></path><path d="M407.56 714.368V303.616l355.722 205.376z" fill="#d81e06" p-id="10849" data-spm-anchor-id="a313x.7781069.0.i48" class=""></path></svg>
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  name: "Home",
  mounted() {
      this.$store.dispatch('home/getBannerList');
      this.$store.dispatch('home/getRecommendSongs');
      this.$store.dispatch('home/getNewSongs');
      this.$store.dispatch('home/getNewMV');
  },
  computed:{
      ...mapState('home',['bannerList','recommendSongs','newSongs','newMV']),
  },
  methods: {
      startPlay(songInfo){
          let id = songInfo.id;
          this.$store.dispatch('footer/getSongUrl',id);
          this.$store.commit('footer/GETSONGINFO',songInfo);
          let Info = {
              name : songInfo.name,
              id :songInfo.id,
              picUrl : songInfo.picUrl,
              artists : songInfo.song.artists,
              duration : songInfo.song.duration
          }
          this.$bus.$emit('addSong',Info);
      },
      toPlayList(id){
          this.$store.commit('playlist/CLEARPLAYLIST');
          this.$router.push({name:'playlist',query:{id}});
      },
      toMV(id){
          this.$router.push({name:'mv',query:{id}});
      },
  },
};
</script>
<style>
.homemain{
    padding: 20px 100px;
    min-width: 1500px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item{
  border-radius: 20px;
  background-color: #99a9bf;
}

.el-carousel__button{
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.el-carousel__indicator.is-active button{
    background-color: #e94543;
}
.recommendlist h3,
.newlist h3,
.mvlist h3{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100px;
    margin-bottom: 20px;
    padding: 5px 0;
    border-bottom: 2px solid #be1612;
}
.recommendlist ul,
.newlist ul,
.mvlist ul{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    list-style: none;
}
.recommendlist ul li{
    position: relative;
    width: 234px;
    margin-bottom: 30px;
}
.recommendlist ul li img{
    width: 100%;
    height: 234px;
    border-radius: 5px;
    cursor: pointer;
}
.recommendlist ul li:hover .recommendhot,
.recommendlist ul li:hover .recommend-playbtn,
.newlist li:hover .new-playbtn,
.mvlist li:hover .mv-playbtn{
    display: block;
}
.recommendhot{
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
.newlist ul li{
    display: flex;
    position: relative;
    width: 650px;
    margin-bottom: 30px;
    padding: 10px;
}
.newlist ul li p{
    width: 450px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.newlist img{
    width: 100px;
    height: 100px;
    border-radius: 5px;
    cursor: pointer;
}
.recommend-playbtn{
    display: none;
    position: absolute;
    cursor: pointer;
    bottom: 30px;
    right: 5px;
}
.new-playbtn{
    display: none;
    position: absolute;
    cursor: pointer;
    left: 40px;
    top: 40px;
}
.newlist li:hover{
    background-color: #ddd;
}
.music-info{
    flex: 1;
    padding: 0 10px;
}
.music-info p:nth-child(1){
    font-size: 14px;
}
.music-info p:nth-child(2){
    font-size: 12px;
    color: #bab7b7;
    margin: 30px 0 0 5px;
}
.mvlist ul li{
    position: relative;
    width: 300px;
}
.mvlist img{
    width: 100%;
    height: 165px;
    cursor: pointer;
}
.mv-playbtn{
    display: none;
    position: absolute;
    cursor: pointer;
    left: 130px;
    top: 65px;
}
.mvlist li p{
    margin: 10px 0;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.mvlist li p:nth-child(3){
    font-size: 12px;
    color: #a5a1a1;
}
.playcount{
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 5px;
    right: 5px;
}
</style>