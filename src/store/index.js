import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import home from './home';
import playlist from './playlist';
import footer from './footer';
import artist from './artist';
import album from './album';
import mv from './mv';
import recommend from './recommend';
import search from './search';

export default new Vuex.Store({
    modules: {
        home,
        playlist,
        footer,
        artist,
        album,
        mv,
        recommend,
        search
    }
})