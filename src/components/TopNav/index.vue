<template>
    <div>
        <div class="top">
            <div class="left">
                <img style="border-radius: 50%;" height="48" width="48" src="../../assets/logo.png">
                <div class="title">Duende Music</div>
            </div>
            <div class="center">
                <!-- <svg t="1647585038979" class="icon back" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9892" width="16" height="16"><path d="M750.381737 221.002416 463.634967 511.525186l286.74677 290.511513c8.848529 8.875135 15.504112 19.020192 19.917632 30.41266 4.437056 11.366885 6.655584 22.933315 6.655584 34.649148 0 11.691273-2.218528 23.108301-6.655584 34.17638-4.41352 11.067057-11.06808 21.039175-19.917632 29.888727-17.749246 18.371416-38.937824 27.545356-63.641459 27.545356-24.653493 0-45.86663-9.17394-63.591317-27.545356L276.6012 581.77311c-8.875135-8.848529-15.829524-19.443841-20.889773-31.80845-5.060249-12.339026-7.927553-24.828478-8.525164-37.491892-0.648776-12.650111 0.921999-24.839735 4.735861-36.544311 3.789303-11.715833 10.121522-21.363564 18.995633-28.966729L623.148961 91.8755c17.699104-17.723663 38.937824-26.585495 63.591317-26.585495 24.704658 0 45.893236 8.861832 63.641459 26.585495 8.848529 8.861832 15.480576 18.98233 19.917632 30.374798s6.655584 22.946618 6.655584 34.662451c0 11.704576-2.218528 23.108301-6.655584 34.175357C765.885849 202.169489 759.230266 212.140585 750.381737 221.002416L750.381737 221.002416 750.381737 221.002416zM750.381737 221.002416" p-id="9893" fill="#ffffff"></path></svg>
                <svg t="1647584994929" class="icon fore" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9003" width="16" height="16"><path d="M273.61724 221.002416 273.61724 221.002416c-8.848529-8.861832-15.504112-18.832927-19.917632-29.913287-4.437056-11.067057-6.655584-22.471804-6.655584-34.175357 0-11.715833 2.218528-23.269983 6.655584-34.662451s11.06808-21.511943 19.917632-30.374798c17.749246-17.723663 38.937824-26.585495 63.641459-26.585495 24.653493 0 45.892213 8.861832 63.591317 26.585495l352.232227 355.086228c8.874111 7.603165 15.205307 17.249873 18.995633 28.966729 3.813862 11.704576 5.384637 23.8942 4.735861 36.544311-0.597611 12.663414-3.464915 25.152866-8.525164 37.491892-5.060249 12.364609-12.014638 22.959921-20.889773 31.80845L400.850016 931.163615c-17.723663 18.371416-38.937824 27.545356-63.591317 27.545356-24.704658 0-45.893236-9.17394-63.641459-27.545356-8.848529-8.849552-15.504112-18.821671-19.917632-29.888727-4.437056-11.06808-6.655584-22.48613-6.655584-34.17638 0-11.715833 2.218528-23.282263 6.655584-34.649148 4.41352-11.392468 11.06808-21.537526 19.917632-30.41266l286.74677-290.511513L273.61724 221.002416 273.61724 221.002416zM273.61724 221.002416" p-id="9004" fill="#ffffff"></path></svg> -->
            </div>
            <div class="right">
                <i class="el-icon-search searchIcon"></i>
                <div><input @keydown.enter="toSearch(keywords)" v-model="keywords" type="text" placeholder="音乐/MV/歌手/用户" class="search"></div> 
                <!-- <a href="#" class="login">登录</a>
                <a href="#" class="register">注册</a> -->
            </div>   
        </div>
    </div>
</template>
<script>
export default {
    name:'TopNav',
    data() {
        return {   
            keywords:''
        }
    },
    methods: {
        toSearch(keywords){
            this.keywords.trim()==''?this.$message.error('请输入要搜索的内容！'):this.$router.push({name:'search',query:{keywords}});
            this.$bus.$emit('getKeywords');
        }
    },
}
</script>
<style> 
    .top{
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        align-items: center;
        width: 100%;
        height: 70px;
        margin: 0 auto;
        background-color: #242424;
        padding: 0 30px;
    }
    .left{
        display: flex;
        align-items: center;
        min-width: 200px;
    }
    .center{
        flex: 1;
        margin: 0 auto 0 50px;
        min-width: 90px
    }
    .right{
        display: flex;
        align-items: center;
        min-width: 270px;
    }
    .title{
        color: #fff;
        font-weight: 700;
        font-size: 24px;
        margin-left: 5px;
        min-width: 175px;
    }
    /* .back{
        height: 30px;
        width: 30px;
        padding: 7px;
        margin-right:20px;
        border-radius: 50%;
    }
    .fore{
        height: 30px;
        width: 30px;
        padding: 7px;
        border-radius: 50%; 
        margin-right: 10px;
    }
    .back:hover,.fore:hover{
        background-color: #555;
    } */
    .search{
        height: 40px;
        width: 180px;
        border-radius: 30px;
        padding: 0 30px;
        margin: 0 20px 0 0;
    }
    .searchIcon{
        position: relative;
        z-index: 999;
        top: 0;
        left: 25px;      
    }
    /* .login,.register{
        font-size: 12px;
        color: #787878;
        margin-right: 10px;
    } */
</style>