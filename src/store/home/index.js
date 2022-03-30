import { reqBanner, reqRecommendSongs, reqNewSongs, reqNewMV } from '@/api';
export default {
    namespaced: true,
    actions: {
        async getBannerList({ commit }) {
            let result = await reqBanner();
            if (result.data.code == 200) {
                commit('GETBANNERLIST', result.data.banners);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        },
        async getRecommendSongs({ commit }) {
            let result = await reqRecommendSongs();
            if (result.data.code == 200) {
                commit('GETRECOMMENDSONGS', result.data.result);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        },
        async getNewSongs({ commit }) {
            let result = await reqNewSongs();
            if (result.data.code == 200) {
                commit('GETNEWSONGS', result.data.result);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        },
        async getNewMV({ commit }) {
            let result = await reqNewMV();
            if (result.data.code == 200) {
                commit('GETNEWMV', result.data.result);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        },
    },
    mutations: {
        GETBANNERLIST(state, bannerList) {
            state.bannerList = bannerList;
        },
        GETRECOMMENDSONGS(state, recommendSongs) {
            state.recommendSongs = recommendSongs;
        },
        GETNEWSONGS(state, newSongs) {
            state.newSongs = newSongs;
        },
        GETNEWMV(state, newMV) {
            state.newMV = newMV;
        },
    },
    state: {
        bannerList: [],
        recommendSongs: [],
        newSongs: [],
        newMV: [],
    },
    getters: {}
}