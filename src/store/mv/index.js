import { reqGetMVUrl, reqGetResembleMV, reqGetMVDetail, reqMVComment, reqGetNewMvs } from '@/api';
export default {
    namespaced: true,
    actions: {
        async getMVUrl({ commit }, id) {
            let result = await reqGetMVUrl(id);
            if (result.data.code == 200) {
                commit('GETMVURL', result.data.data.url);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        },
        async getMVDetail({ commit }, id) {
            let result = await reqGetMVDetail(id);
            if (result.data.code == 200) {
                commit('GETMVDETAIL', result.data.data);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        },
        async getResembleMV({ commit }, id) {
            let result = await reqGetResembleMV(id);
            if (result.data.code == 200) {
                commit('GETRESEMBLEMV', result.data.mvs);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        },
        async getMVComment({ commit }, { id, limit, offset }) {
            let result = await reqMVComment({ id, limit, offset });
            if (result.data.code == 200) {
                commit('GETMVCOMMENT', result.data);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        },
        async getNewMvs({ commit }, { area, type, order, limit, offset }) {
            let result = await reqGetNewMvs({ area, type, order, limit, offset });
            if (result.data.code == 200) {
                commit('GETNEWMVS', result.data);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        }
    },
    mutations: {
        GETMVURL(state, url) {
            state.MVUrl = url;
        },
        GETMVDETAIL(state, data) {
            state.MVDetail = data;
        },
        GETRESEMBLEMV(state, mvs) {
            state.resembleMV = mvs;
        },
        GETMVCOMMENT(state, data) {
            state.comments = data.comments;
            state.hotComments = data.hotComments;
            state.commentCount = data.total;
        },
        CLEARCOMMENT(state) {
            state.comments = [];
            state.hotComments = [];
            state.commentCount = 0;
        },
        GETNEWMVS(state, data) {
            state.mvCount = data.count;
            state.mvList = data.data;
        }
    },
    state: {
        MVUrl: '',
        MVDetail: {},
        resembleMV: [],
        comments: [],
        hotComments: [],
        commentCount: 0,
        mvCount: 0,
        mvList: []
    },
    getters: {}
}