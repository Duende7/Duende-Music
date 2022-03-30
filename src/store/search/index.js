import { reqGetSearchResult } from '@/api';
export default {
    namespaced: true,
    actions: {
        async getSearchResult({ commit }, { keywords, limit, type, offset }) {
            let result = await reqGetSearchResult({ keywords, limit, type, offset });
            if (result.data.code == 200) {
                commit('GETSEARCHRESULT', result.data.result);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        }
    },
    mutations: {
        GETSEARCHRESULT(state, data) {
            if (data.songCount) {
                state.songs = data.songs;
                state.songCount = data.songCount;
            } else if (data.playlistCount) {
                state.playLists = data.playlists;
                state.playListCount = data.playlistCount;
            } else {
                state.mvs = data.mvs;
                state.mvCount = data.mvCount;
            }

        }
    },
    state: {
        songs: [],
        songCount: 0,
        playLists: [],
        playListCount: 0,
        mvs: [],
        mvCount: 0

    }
}