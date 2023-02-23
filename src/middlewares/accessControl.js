const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const { clone } = require('../../utils/common')

const AUTH_HEADER = 'Authorization';

const authenticate = (req, enabled) => {
    try {
        const authToken = req.get(AUTH_HEADER).split(' ')[1]
        const decodedToken = jwt.verify(authToken, config.default.secretPublic);
        return decodedToken
    } catch (error) {
        if (enabled) {
            throw new createError.Unauthorized()
        }
        return { user: null }
    }
}

const accessControl = (httpMethod, route, app) => async (req, res, next) => {
    const { PolicyAccessControl, Role, Permission } = app.locals.models;
    try {
        const policy = clone(await PolicyAccessControl.findOne({
            where: { route, httpMethod },
            include: {
                as: 'permissions',
                model: Permission
            }
        }))
        const { user } = authenticate(req, policy.enabled);
        req.user = user;
        if (!policy.enabled) {
            console.log('BYPASS');
            return next();
        }
        const { role } = user;
        const userRole = clone(await Role.findOne({
            where: { id: role.id },
            include: {
                as: 'permissions',
                model: Permission,
                required: true
            }
        }))
        const userPermissions = userRole.permissions.map(v => v.name);
        const policyPermissions = policy.permissions.map(v => v.name);
        console.log({userPermissions, policyPermissions});
        if (policyPermissions.every(policyPermission => userPermissions.includes(policyPermission))) {
            return next();
        }
        return next(new createError.Unauthorized());
    } catch (error) {
        console.log(error);
        return next(new createError.Unauthorized());
    }
};

module.exports = accessControl;
