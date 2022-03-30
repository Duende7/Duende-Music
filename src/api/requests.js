import axios from 'axios';
import { Message } from 'element-ui';
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import 'nprogress/nprogress.css';

const requests = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 5000
})

requests.defaults.withCredentials = true // 允许跨域设置，不然可能因为拿不到cookie而报错

requests.interceptors.request.use((config) => {
    nprogress.start();
    return config;
}, (error) => {
    error && Message({
        type: 'error',
        message: '网络连接出问题了~',
    })
})

requests.interceptors.response.use((res) => {
    nprogress.done();
    return res;
}, (error) => {
    error && Message({
        type: 'error',
        message: '网络连接出问题了~',
    })
})

export default requests;