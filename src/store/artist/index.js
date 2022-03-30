import { reqGetArtistAlbumInfo, reqGetArtistMVInfo, reqGetArtistIntroduce, reqGetResembleArtist, reqGetSongNum } from '@/api';
export default {
    namespaced: true,
    actions: {
        async getArtistAlbumInfo({ commit }, id) {
            let result = await reqGetArtistAlbumInfo(id);
            if (result.data.code == 200) {
                commit('GETARTISTALBUMINFO', result.data);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        },
        async getArtistMVInfo({ commit }, id) {
            let result = await reqGetArtistMVInfo(id);
            if (result.data.code == 200) {
                commit('GETARTISTMVINFO', result.data.mvs);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        },
        async getArtistIntroduce({ commit }, id) {
            let result = await reqGetArtistIntroduce(id);
            if (result.data.code == 200) {
                commit('GETARTISTINTRODUCE', result.data);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        },
        async getResembleArtist({ commit }, id) {
            let result = await reqGetResembleArtist(id);
            if (result.data.code == 200) {
                commit('GETRESEMBLEARTIST', result.data.artists);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        },
        async getSongNum({ commit }, id) {
            let result = await reqGetSongNum(id);
            if (result.data.code == 200) {
                commit('GETSongAndMVNum', result.data.artist);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        }
    },
    mutations: {
        GETARTISTALBUMINFO(state, data) {
            state.artistInfo = data.artist;
            state.Albums = data.hotAlbums;
        },
        GETARTISTMVINFO(state, mvs) {
            state.MVs = mvs;
        },
        GETARTISTINTRODUCE(state, data) {
            state.artistIntroduce = {
                briefDesc: data.briefDesc,
                introduction: data.introduction
            }
        },
        GETRESEMBLEARTIST(state, artists) {
            state.resembleArtists = artists;
        },
        GETSongAndMVNum(state, data) {
            state.musicSize = data.musicSize;
            state.mvSize = data.mvSize;
        }
    },
    state: {
        artistInfo: {},
        Albums: [],
        MVs: [],
        artistIntroduce: {},
        resembleArtists: [],
        mvSize: 0,
        musicSize: 0
    },
    getters: {}
}