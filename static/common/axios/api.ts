import axios from 'axios';

export default {
    navList: (data) => axios.post('http://106.12.56.151:3334/nav/list', data), /*获取导航列表*/
    listApi: (data) => axios.get('http://106.12.56.151:3334/api/list', { params: data }), /*获取资讯模块列表*/
}