import request from './index.js'
let host = process.env.REACT_APP_API

export default   {
    login(data) {
        return request({
            method: 'post',
            url: host + '/api/login',
            data
        })
    },
    register(data) {
        return request({
            method: 'post',
            url: host + '/api/register',
            data
        })
    },
    getPermissionMenuList(data) {
        return request({
            method: 'get',
            url: '/rightMenu',
            data
        })
    }
}