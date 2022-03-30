import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store';
import InBody from '@/components/InBody';
import Comment from '@/components/Comment';
import Vuelazyload from 'vue-lazyload';

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Vuelazyload, {
    preLoad: 1,
    loading: require('./assets/images/loading.gif'),
    attempt: 2
})
Vue.component(InBody.name, InBody);
Vue.component(Comment.name, Comment);

new Vue({
    router,
    store,
    beforeCreate() {
        Vue.prototype.$bus = this;
    },
    render: h => h(App),
}).$mount('#app')