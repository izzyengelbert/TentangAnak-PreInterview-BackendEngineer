const createError = require('http-errors');

const authorization = (httpMethod, route, app) => async (req, res, next) => {
    const { PolicyAccessControl, Role, Permission } = app.locals.models;
    const { role } = req.user;
    try {
        const permissions = Permission.findAll({
            include: {
                as: 'roles',
                model: Role,
                require: true,
                where: {
                    roleId: role.id
                }
            }
        })
        const requiredPermissions = Permission.findAll({
            include: {
                as: 'policies',
                model: PolicyAccessControl,
                required: true,
                where: { route, httpMethod }
            }
        })
        console.log(permissions, requiredPermissions);
        if (permissions.length === requiredPermissions.length && permissions.every(v => requiredPermissions.includes(v))) {
            return next();
        }
        return next(new createError.Unauthorized());
    } catch (error) {
        return next(new createError.Unauthorized());
    }
};

module.exports = authorization;
