import Base from './baseApi.js'
class Menu extends Base {
    constructor(model) {
        super(model);
    }
    getPermissionMenuList(data) {
        return this.get('/rightMenu', data)
    }

}

export default new Menu('menu')