import { reqSongUrl, reqGetLyric } from '@/api';
export default {
    namespaced: true,
    actions: {
        async getSongUrl({ commit }, id) {
            let result = await reqSongUrl(id);
            if (result.data.code == 200) {
                commit('GETSONGURL', result.data.data[0].url);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        },
        async getLyric({ commit }, id) {
            let result = await reqGetLyric(id);
            if (result.data.code == 200) {
                commit('GETLYRIC', result.data.lrc.lyric);
            } else {
                return Promise.reject(new Error('Fail'));
            }
        }
    },
    mutations: {
        GETSONGURL(state, songUrl) {
            state.songUrl = songUrl;
        },
        GETSONGINFO(state, songInfo) {
            state.songInfo = {
                name: songInfo.name,
                id: songInfo.id,
                picUrl: songInfo.picUrl,
                artists: songInfo.song.artists,
                duration: songInfo.song.duration
            }
        },
        GETSONGINFO1(state, songInfo) {
            state.songInfo = {
                name: songInfo.name,
                id: songInfo.id,
                picUrl: songInfo.al.picUrl,
                artists: songInfo.ar,
                duration: songInfo.dt
            }
        },
        GETSONGINFO2(state, songInfo) {
            state.songInfo = songInfo;
        },
        GETSONGINFO3(state, songInfo) {
            state.songInfo = {
                name: songInfo.name,
                id: songInfo.id,
                picUrl: songInfo.album.picUrl,
                artists: songInfo.artists,
                duration: songInfo.duration
            }
        },
        CLEARSONGINFO(state) {
            state.songInfo = {};
            state.songUrl = '';
        },
        GETLYRIC(state, lyric) {
            state.lyric = lyric;
        }
    },
    state: {
        songUrl: '',
        songInfo: {},
        lyric: ''
    },
    getters: {}
}