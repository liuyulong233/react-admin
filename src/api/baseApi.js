import request from './index'
class Base {
    constructor(model) {
        this.model = model
    }
    getList(data) {
        return this.get('/' + this.model + '/list', data)

    }
    detail(data) {
        return this.get('/' + this.model + '/detail', data)

    }
    edit(data) {
        return this.post('/' + this.model + '/edit', data)

    }
    add(data) {
        return this.post('/' + this.model + '/add', data)
    }
    remove(data) {
        return this.get('/' + this.model + '/remove', data)
    }
    get(url, data) {
        return request({
            method: 'get',
            url: url,
            params: data
        })
    }
    post(url, data) {
        return request({
            method: 'post',
            url: url,
            data: data
        })
    }
   

}
export default Base