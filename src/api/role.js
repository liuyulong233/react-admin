import Base from './baseApi.js'
class Role extends Base {
    constructor(model) {
        super(model);
    }
    getPermissionByRole(data) {
        return this.get('/permissionByRole', data)
    }
}

export default new Role('role')