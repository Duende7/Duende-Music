import { reqGetHighqualityTags, reqGetHighqualityPlayList, reqGetTopPlayList, reqGetNewSongs } from '@/api';
export default {
    namespaced: true,
    actions: {
        async getHighqualityTags({ commit }) {
            let result = await reqGetHighqualityTags();
            if (result.data.code == 200) {
                commit('GETHIGHQUALITYTAGS', result.data.tags);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        },
        async getHighqualityPlayList({ commit }, { cat, limit }) {
            let result = await reqGetHighqualityPlayList({ cat, limit });
            if (result.data.code == 200) {
                commit('GETHIGHQUALITYPLAYLIST', result.data.playlists);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        },
        async getTopPlayList({ commit }, { cat, limit, offset }) {
            let result = await reqGetTopPlayList({ cat, limit, offset });
            if (result.data.code == 200) {
                commit('GETTOPPLAYLIST', result.data);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        },
        async getNewSongs({ commit }, type) {
            let result = await reqGetNewSongs(type);
            if (result.data.code == 200) {
                commit('GETNEWSONGS', result.data.data);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        }
    },
    mutations: {
        GETHIGHQUALITYTAGS(state, tags) {
            state.tags = tags;
        },
        GETHIGHQUALITYPLAYLIST(state, playlists) {
            state.highqualityPlayList = playlists;
        },
        GETTOPPLAYLIST(state, data) {
            state.topPlayList = data.playlists;
            state.totalPlayList = data.total;
        },
        GETNEWSONGS(state, data) {
            state.newSongs = data;
        }
    },
    state: {
        tags: [],
        highqualityPlayList: [],
        topPlayList: [],
        totalPlayList: 0,
        newSongs: []
    }
}