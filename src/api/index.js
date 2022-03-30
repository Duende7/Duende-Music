import requests from './requests';

export const reqBanner = () => requests({ url: '/banner', method: 'get' });

export const reqRecommendSongs = () => requests({ url: '/personalized', method: 'get' });

export const reqNewSongs = () => requests({ url: '/personalized/newsong', method: 'get' });

export const reqNewMV = () => requests({ url: '/personalized/mv', method: 'get' });

export const reqSongUrl = (id) => requests({ url: `/song/url?id=${id}`, method: 'get' });

export const reqPlayList = (id) => requests({ url: `/playlist/detail?id=${id}`, method: 'get' });

export const reqPlayListSongDetail = (ids) => requests({ url: `/song/detail?ids=${ids}`, method: 'get' });

export const reqPlayListComment = ({ id, limit, offset }) => requests({ url: `/comment/playlist?id=${id}&limit=${limit}&offset=${offset}`, method: 'get' });

export const reqGetArtistAlbumInfo = (id) => requests({ url: `/artist/album?id=${id}`, method: 'get' });

export const reqGetArtistMVInfo = (id) => requests({ url: `/artist/mv?id=${id}`, method: 'get' });

export const reqGetArtistIntroduce = (id) => requests({ url: `/artist/desc?id=${id}`, method: 'get' });

export const reqGetResembleArtist = (id) => requests({ url: `/simi/artist?id=${id}`, method: 'get' });

export const reqGetSongNum = (id) => requests({ url: `/artists?id=${id}`, method: 'get' });

export const reqGetAlbumDetail = (id) => requests({ url: `/album?id=${id}`, method: 'get' });

export const reqAlbumComment = ({ id, limit, offset }) => requests({ url: `/comment/album?id=${id}&limit=${limit}&offset=${offset}`, method: 'get' });

export const reqGetMVUrl = (id) => requests({ url: `/mv/url?id=${id}`, method: 'get' });

export const reqGetResembleMV = (id) => requests({ url: `/simi/mv?mvid=${id}`, method: 'get' });

export const reqGetMVDetail = (id) => requests({ url: `/mv/detail?mvid=${id}`, method: 'get' });

export const reqMVComment = ({ id, limit, offset }) => requests({ url: `/comment/mv?id=${id}&limit=${limit}&offset=${offset}`, method: 'get' });

export const reqGetHighqualityTags = () => requests({ url: '/playlist/highquality/tags', method: 'get' });

export const reqGetHighqualityPlayList = ({ cat, limit }) => requests({ url: `/top/playlist/highquality?cat=${cat}&limit=${limit}`, method: 'get' });

export const reqGetTopPlayList = ({ cat, limit, offset }) => requests({ url: `/top/playlist?cat=${cat}&limit=${limit}&offset=${offset}`, method: 'get' });

export const reqGetNewSongs = (type) => requests({ url: `/top/song?type=${type}`, method: 'get' });

export const reqGetNewMvs = ({ area, type, order, limit, offset }) => requests({ url: `/mv/all?area=${area}&type=${type}&order=${order}&limit=${limit}&offset=${offset}`, method: 'get' });

export const reqGetSearchResult = ({ keywords, limit, type, offset }) => requests({ url: `/cloudsearch?keywords=${keywords}&limit=${limit}&type=${type}&offset=${offset}`, method: 'get' });

export const reqGetLyric = (id) => requests({ url: `/lyric?id=${id}`, method: 'get' });