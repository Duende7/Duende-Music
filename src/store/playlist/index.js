import { reqPlayList, reqPlayListSongDetail, reqPlayListComment } from '@/api';

export default {
    namespaced: true,
    actions: {
        async getPlayList({ commit }, id) {
            let result = await reqPlayList(id);
            if (result.data.code == 200) {
                commit('GETPLAYLIST', result.data.playlist);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        },
        async getPlayListSongDetail({ commit }, ids) {
            let result = await reqPlayListSongDetail(ids);
            if (result.data.code == 200) {
                commit('GETPLAYLISTSONGDETAIL', result.data.songs);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        },
        async getPlayListComment({ commit }, { id, limit, offset }) {
            let result = await reqPlayListComment({ id, limit, offset });
            if (result.data.code == 200) {
                commit('GETPLAYLISTCOMMENT', result.data);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        }
    },
    mutations: {
        GETPLAYLIST(state, playList) {
            state.playList = playList;
        },
        GETPLAYLISTSONGDETAIL(state, playListSongs) {
            state.playListSongs = playListSongs;
        },
        GETPLAYLISTCOMMENT(state, data) {
            state.comments = data.comments;
            state.hotComments = data.hotComments;
            state.commentCount = data.total;
        },
        CLEARPLAYLIST(state) {
            state.playList = {};
            state.playListSongs = [];
        },
        CLEARCOMMENTINFO(state) {
            state.comments = [];
            state.hotComments = [];
        }
    },
    state: {
        playList: {},
        playListSongs: [],
        comments: [],
        hotComments: [],
        commentCount: 0
    },
    getters: {}
}