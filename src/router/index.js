import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const VueRouterPush = VueRouter.prototype.push;
const VueRouterReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(to, resolve, reject) {
    if (resolve && reject) {
        VueRouterPush.call(this, to, resolve, reject);
    } else {
        VueRouterPush.call(this, to, () => {}, () => {});
    }
}
VueRouter.prototype.replace = function(to, resolve, reject) {
    if (resolve && reject) {
        VueRouterReplace.call(this, to, resolve, reject);
    } else {
        VueRouterReplace.call(this, to, () => {}, () => {});
    }
}

const routes = [{
        name: 'home',
        path: '/home',
        component: () =>
            import ('@/views/Home')
    },
    {
        name: 'newsongs',
        path: '/newsongs',
        component: () =>
            import ('@/views/NewSongs')
    },
    {
        name: 'newmv',
        path: '/newmv',
        component: () =>
            import ('@/views/NewMV')
    },
    {
        name: 'recommend',
        path: '/recommend',
        component: () =>
            import ('@/views/Recommend')
    },
    {
        name: 'playlist',
        path: '/playlist',
        component: () =>
            import ('@/views/PlayList'),
    },
    {
        name: 'artists',
        path: '/artists',
        component: () =>
            import ('@/views/Artists'),
    },
    {
        name: 'album',
        path: '/album',
        component: () =>
            import ('@/views/Album'),
    },
    {
        name: 'mv',
        path: '/mv',
        component: () =>
            import ('@/views/MV'),
    },
    {
        name: 'search',
        path: '/search',
        component: () =>
            import ('@/views/Search'),
    },
    //重定向
    {
        path: '/',
        redirect: '/home'
    }
]

const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { x: 0, y: 0 }
    },
})

export default router;