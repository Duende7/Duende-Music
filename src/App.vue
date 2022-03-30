<template>
  <div id="app">
    <TopNav></TopNav>
    <SideBar>
      <router-view></router-view>
    </SideBar>
    <Drawer></Drawer>
    <Footer></Footer>
  </div>
</template>

<script>
import TopNav from './components/TopNav';
import SideBar from './components/SideBar';
import Footer from './components/Footer';
import Drawer from './components/Drawer';
export default {
  name: 'App',
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    });
  },
  components:{
    TopNav,
    SideBar,
    Footer,
    Drawer
  }
}
</script>

<style>
</style>
