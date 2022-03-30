import { reqGetAlbumDetail, reqAlbumComment } from '@/api';
export default {
    namespaced: true,
    actions: {
        async getAlbumDetail({ commit }, id) {
            let result = await reqGetAlbumDetail(id);
            if (result.data.code == 200) {
                commit('GETALBUMDETAIL', result.data);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        },
        async getAlbumComment({ commit }, { id, limit, offset }) {
            let result = await reqAlbumComment({ id, limit, offset });
            if (result.data.code == 200) {
                commit('GETALBUMCOMMENT', result.data);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        }
    },
    mutations: {
        GETALBUMDETAIL(state, data) {
            state.albumInfo = data.album;
            state.songList = data.songs;
        },
        CLEARSONGLISTANDALBUMINFO(state) {
            state.songList = [];
            state.albumInfo.description = '';
        },
        GETALBUMCOMMENT(state, data) {
            state.comments = data.comments;
            state.hotComments = data.hotComments;
            state.commentCount = data.total;
        }
    },
    state: {
        albumInfo: {},
        songList: [],
        comments: [],
        hotComments: [],
        commentCount: 0
    },
    getters: {}
}