<template>
    <div>
        <div class="footer">
            <transition name="animate__animated animate__bounce"  enter-active-class="animate__fadeInLeft" leave-active-class="animate__fadeOutLeft">
                <div v-show="isOpen" class="drawer">
                    <div class="left">
                        <div class="record" :class="{active:playOrPause==true}">
                            <img class="album" :src="songInfo.picUrl">
                        </div>
                    </div>
                    <div class="right">
                        <el-scrollbar ref="scroll" style="height:70%">
                            <div ref="lyricF" class="lyric">
                                <p ref="lyricS" class="lyricStyle" :class="{activeL:currentIndex===index}" v-for="(gc,index) in lyrics" :key="index">{{gc.txt}}</p>
                            </div>
                        </el-scrollbar> 
                    </div>
                </div>
            </transition>
            <div class="box">
                <div class="img">
                    <img src="../../assets/images/music.png" v-if="!songInfo.name">
                    <img :src="songInfo.picUrl" v-else>
                    <div @click="songUrl&&changeIsOpen()" class="cover">
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </div>
                <div class="none" v-if="!songInfo.name">快去听歌！</div>
                <div class="block" v-else>
                    <div class="nowrap">{{songInfo.name}}</div>
                    <div><span class="nowrap" v-for="artist in songInfo.artists" :key="artist.id">{{artist.name}} </span></div>
                </div>
            </div>
            <div class="tap">
                <div class="audio">
                    <audio ref="audio" :loop="isLoop" style="display:none" :src="songUrl" autoplay :paused="playOrPause" @timeupdate="!isClick&&timeupdate()">您的浏览器不支持audio标签</audio>
                    <div class="btns">
                        <svg @click="prev" t="1648213134522" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2547" width="19" height="19"><path d="M206 865h-38c-30.928 0-56-25.072-56-56V216c0-30.928 25.072-56 56-56h38c30.928 0 56 25.072 56 56v593c0 30.928-25.072 56-56 56z m168.686-386.191l422.304-303.4c32.294-23.201 77.282-15.83 100.484 16.464A72 72 0 0 1 911 233.883v559.053c0 39.764-32.235 72-72 72a72 72 0 0 1-39.95-12.1L376.288 570.877c-25.73-17.16-32.677-51.93-15.517-77.66a56 56 0 0 1 13.915-14.408z" p-id="2548" fill="#ffffff"></path></svg>
                        <svg v-if="playOrPause" @click="play" t="1647608072926" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="40062" width="21" height="21"><path d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z" fill="#ffffff" p-id="40063"></path></svg>
                        <svg v-else @click="pause" t="1647922262062" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2607" width="21" height="21"><path d="M259.774512 0h-63.761861c-21.849302 0-39.566884 26.457302-39.566884 59.082419v905.823255c0 32.625116 17.717581 59.082419 39.566884 59.082419h63.761861c21.849302 0 39.566884-26.457302 39.566883-59.082419V59.082419C299.341395 26.457302 281.623814 0 259.774512 0z m568.20093 0h-63.761861c-21.849302 0-39.566884 26.457302-39.566883 59.082419v905.823255c0 32.625116 17.717581 59.082419 39.566883 59.082419h63.761861c21.849302 0 39.566884-26.457302 39.566884-59.082419V59.082419C867.542326 26.457302 849.824744 0 827.975442 0z m15.741023 0" p-id="2608" fill="#ffffff"></path></svg>
                        <svg @click="next" t="1648213082158" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1866" width="19" height="19"><path d="M817 160h38c30.928 0 56 25.072 56 56v593c0 30.928-25.072 56-56 56h-38c-30.928 0-56-25.072-56-56V216c0-30.928 25.072-56 56-56zM648.314 546.191l-422.304 303.4c-32.294 23.201-77.282 15.83-100.484-16.464A72 72 0 0 1 112 791.117V232.064c0-39.764 32.235-72 72-72a72 72 0 0 1 39.95 12.1l422.762 281.959c25.73 17.16 32.677 51.93 15.517 77.66a56 56 0 0 1-13.915 14.408z" p-id="1867" fill="#ffffff"></path></svg>
                    </div>
                    <div class="progress">
                        <span>{{currentTime}}</span>
                        <el-slider input-size="mini" :show-tooltip="false" v-model="progress" :disabled="!this.songUrl" @change="changeCurrentTime" @input="changeprogress" @mousedown.native="isClick=true" @mouseup.native="isClick=false" class="slider"></el-slider>
                        <span>{{duration}}</span>
                    </div>
                </div>
                <div class="consoleList">
                    <el-slider input-size="mini" :show-tooltip="false" v-model="volume" @input="changeVolume" vertical height="80px" class="voiceSlider" v-if="isBlock"></el-slider>
                    <div class="voice">
                        <svg v-if="isSilence" t="1648132958062" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5636" width="21" height="21"><path d="M469.333333 106.666667v810.666666a21.333333 21.333333 0 0 1-36.42 15.086667L225.833333 725.333333H53.333333a53.393333 53.393333 0 0 1-53.333333-53.333333V352a53.393333 53.393333 0 0 1 53.333333-53.333333h172.5l207.08-207.086667A21.333333 21.333333 0 0 1 469.333333 106.666667z m548.42 612.42a21.333333 21.333333 0 0 0 0-30.173334L840.833333 512l176.92-176.913333a21.333333 21.333333 0 1 0-30.173333-30.173334L810.666667 481.833333 633.753333 304.913333a21.333333 21.333333 0 0 0-30.173333 30.173334L780.5 512l-176.92 176.913333a21.333333 21.333333 0 0 0 30.173333 30.173334L810.666667 542.166667l176.913333 176.92a21.333333 21.333333 0 0 0 30.173333 0z" fill="#ffffff" p-id="5637"></path></svg>
                        <svg v-else @click="volumeBlock" t="1648133012684" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6528" width="21" height="21"><path d="M469.333333 106.666667v810.666666a21.333333 21.333333 0 0 1-36.42 15.086667L225.833333 725.333333H53.333333a53.393333 53.393333 0 0 1-53.333333-53.333333V352a53.393333 53.393333 0 0 1 53.333333-53.333333h172.5l207.08-207.086667A21.333333 21.333333 0 0 1 469.333333 106.666667z m146.793334 296.2a21.333333 21.333333 0 0 0-3.526667 29.96 127.366667 127.366667 0 0 1 0 158.346666 21.333333 21.333333 0 0 0 33.493333 26.433334 170.733333 170.733333 0 0 0 0-211.213334 21.333333 21.333333 0 0 0-29.966666-3.526666z m212.213333-19.3A339.393333 339.393333 0 0 0 753.333333 270.666667a346.585333 346.585333 0 0 0-22.046666-20.213334 21.333333 21.333333 0 1 0-27.446667 32.666667c6.666667 5.586667 13.146667 11.553333 19.333333 17.726667C779.6 357.22 810.666667 432.22 810.666667 512s-31.066667 154.78-87.48 211.186667c-6.173333 6.173333-12.666667 12.14-19.333334 17.726666a21.333333 21.333333 0 1 0 27.446667 32.666667 346.585333 346.585333 0 0 0 22.046667-20.213333 341.706667 341.706667 0 0 0 74.98-369.793334z" fill="#ffffff" p-id="6529"></path></svg>
                    </div>
                </div>
            </div>
            <div class="list" @click="openDrawer">
                <svg t="1647607761202" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="38969" width="25" height="25"><path d="M1.024 225.32608l532.48 0 0 40.957952-532.48 0 0-40.957952ZM1.024 409.63584l532.48 0 0 40.957952-532.48 0 0-40.957952ZM1.024 593.944576l532.48 0 0 40.957952-532.48 0 0-40.957952ZM738.305024 249.8048 1025.024 286.763008C1025.024 81.975296 861.185024 41.017344 697.345024 0l0 30.138368 0 214.387712 0 533.72928c-24.51968 0-63.519744 0-126.200832 0-120.379392 0-160.519168 63.695872-160.519168 121.872384 0 49.3568 36.938752 123.87328 163.84 123.87328 181.440512 0 163.84-145.672192 163.84-245.74464L738.305024 249.8048z" p-id="38970" fill="#ffffff"></path></svg>
                <span class="songNum">{{count}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { duration , currentTime } from '@/utils/dateformat.js';
import 'animate.css';
export default {
    name:'Footer',
    data() {
        return {
            volume:70,
            duration:'00:00',
            playOrPause:true,
            progress:0,
            currentTime:'00:00',
            isClick:false,
            toTime:'00:00',
            isSilence:false,
            isBlock:false,
            count:0,
            isLoop:false,
            isOpen:false,
            lyrics:[],
            lyricDt:[],
            dt:0,
            currentIndex:0
        }
    },
    mounted() {
        this.duration = this.songInfo.name ? duration(this.songInfo.duration) : '00:00';
        this.$bus.$on('getSongCount',(count)=>this.count=count);
        this.$bus.$on('changePlayOrPause',()=>this.playOrPause=true);
        this.$store.commit('footer/GETSONGINFO2',JSON.parse(localStorage.getItem('songInfo')));
        this.$store.commit('footer/GETSONGURL',localStorage.getItem('songUrl'));
    },
    beforeDestroy() {
        this.$bus.$off('getSongCount');
        this.$bus.$off('changePlayOrPause');
    },
    computed:{
        ...mapState('footer',['songInfo','songUrl','lyric']),
    },
    watch:{
       songUrl(newValue){
           this.duration = this.songInfo.name ? duration(this.songInfo.duration) : '00:00';
           this.play();
           newValue == '' ? this.progress = 0 : '';
           localStorage.setItem('songUrl',newValue);
       },
       songInfo(newValue){
           this.$store.dispatch('footer/getLyric',newValue.id);
           this.lyrics = [];
           localStorage.setItem('songInfo',JSON.stringify(newValue));
       },
       lyric(newValue){
           let arr = newValue.split('\n');
           arr.forEach(item => {
               const obj = {};
               let s = item.substring(1,6);
               obj.time = parseInt(s.substring(0,2)) * 60 + parseInt(s.substring(3,));
               let arr1 = item.split(']');
               obj.txt = arr1[1]
               obj.txt==''?'':this.lyrics.push(obj);
           });
       },
    },
    methods: {
        play(){
            if (!this.songUrl) {
                return this.$message.error('还没有添加音乐哦，快去听歌吧！');
            }
            this.playOrPause = false;
            this.$refs.audio.play();   
        },
        pause(){
            this.playOrPause = true;
            this.$refs.audio.pause();
        },
        timeupdate(){
            this.dt = parseInt(this.$refs.audio.currentTime);
            //遍历所有歌词
            for (let i = 0; i < this.lyrics.length; i++) {
                //判断歌曲当前时间与歌词对应时间是否相等
                if (this.dt == this.lyrics[i].time) {
                    //将对应时间的歌词index存下来
                    this.currentIndex = i;
                    //以下语句会有bug，手动滚动滚动条不会自动跳到歌词高亮处
                    //this.$refs.lyricF.style.transform = `translateY(${-80*i+270}px)`;
                    //获取到高亮的歌词元素，要使高亮歌词始终保持垂直居中
                    //使得滚动出去的距离始终等于高亮歌词到父顶部的距离减去某一高度即可
                    let H = document.querySelector('.activeL').offsetTop;
                    this.$refs.scroll.wrap.scrollTop = H - document.querySelector('.activeL').offsetHeight*3;
                }  
            }
            this.currentTime = currentTime(this.$refs.audio.currentTime);
            this.progress = (this.$refs.audio.currentTime / this.$refs.audio.duration)*100;
            if (this.progress == 100) {
                this.next();
            }
        },
        changeprogress(e){
            if (this.isClick == true) {
                this.toTime = Math.floor(e / 100 * this.$refs.audio.duration);
                this.currentTime = currentTime(this.toTime);
            }
        },
        changeCurrentTime(){
            this.$refs.audio.currentTime = this.toTime;
            if (this.progress == 100) {
                this.next();
                this.isClick = false;
            }
        },
        volumeBlock(){
            this.isBlock = this.isBlock ? false : true;
        },
        changeVolume(e){
            this.$refs.audio.volume = e/100;
            this.isSilence = this.$refs.audio.volume == 0 ? true : false;
        },
        openDrawer(){
            this.$bus.$emit('openDrawer');
        },
        prev(){
            if (this.count == 1) {
                this.$refs.audio.currentTime = 0;
            }
            this.$bus.$emit('prevSong');
        },
        next(){
            if (this.count == 1) {
                this.$refs.audio.currentTime = 0;
            }
            this.$bus.$emit('nextSong');
            this.progress = 0;
            this.currentTime = '00:00';
        },
        changeIsOpen(){
            this.isOpen = this.isOpen ? false : true;
        }
    },
}
</script>
<style scoped>
    >>>.el-slider__button{
        border: 2px solid #c41613;
    }
    >>>.el-slider__bar{
        background-color: #c41613;
    }
    >>>.el-slider.is-vertical .el-slider__runway{
       margin: 20px 16px;
    }
    >>>.el-slider.is-vertical{
        position: absolute;
    }
    .drawer{
        display: flex;
        position: absolute;
        bottom: 60px;
        left: 0;
        width: 100%;
        height: 860px;
        background-color: #333;
    }
    .left,
    .right{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .album{
        width: 400px;
        height: 400px;
        border-radius: 50%;
    }
    .lyric{
        position: relative;
        width: 700px;
    }
    .lyricStyle{
        font-size: 30px;
        padding: 20px;
        color: #fff;
        opacity: .5;
        cursor: pointer;
    }
    .lyric .activeL{
        opacity: 1;
        font-weight: 700;
    }
    @keyframes rotate{
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
    .record{
        animation: rotate 20s linear infinite forwards;
    }
    .left .active{
        animation-play-state: paused;
    }
    .nowrap{
        width: 175px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
<style>
    .footer{
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        align-items: center;
        width: 100%;
        height: 60px;
        background-color: #242424;
    }
    .box{
        display: flex;
        align-items: center;
        width: 250px;
        height: 100%;
        min-width: 230px;
    }
    .img{
        position: relative;
        width: 40px;
        height: 40px;
        margin: 0 10px 0 30px;
    }
    .cover{
        position: absolute;
        display: none;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #666;
        opacity: .7;
        text-align: center;
        cursor: pointer;
    }
    .cover i {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-top: 10px;
        color: #fff;
    }
    .img:hover .cover{
        display: block;
    }
    .img img{
        width: 100%;
        height: 100%;
    }
    .none{
        color: #fff;
        font-size: 14px;
    }
    .block{
        color: #fff;
    }
    .block div:nth-child(1){
        font-size: 14px;
        margin-bottom: 5px;
    }
    .block div:nth-child(2){
        font-size: 12px;
    }
    .list{
        margin-right: 120px;
        min-width: 33px;
        cursor: pointer;
    }
    .tap{
        display: flex;
        align-items: center;
        flex: 1;
        height: 60px;
    }
    .audio{
        width: 400px;
        height: 60px;
        margin: 0 50px 0 auto;
    }
    .btns{
        display: flex;
        justify-content: space-between;
        width: 150px;
        margin: 5px auto 0 auto;
    }
    .btns .icon{
        cursor: pointer;
    }
    .slider{
        display: inline-block;
        width: 300px;
    }
    .progress{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .progress span{
        color: #767676;
        font-size: 14px;
    }
    .consoleList{
        position: relative;
        height: 60px;
        margin-right: 420px;
    }
    .voice{
        height: 60px;
        cursor: pointer;
    }
    .voice .icon{
        margin: 19px 9px;
    }
    .voiceSlider{
        top: -120px;
        background-color: #292929;
    }
    .songNum{
        display: inline-block;
        color:#fff;
        font-size: 12px;
        width: 20px;
    }
</style>