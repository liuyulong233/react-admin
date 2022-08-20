import Base from './baseApi.js'

let instance=new Base('article')
instance.checkArticle=function (data) {
    return this.post('/article/check', data)
}
export default instance