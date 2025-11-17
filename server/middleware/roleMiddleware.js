const roleAccess = (allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied for your role' });
        }
        next();
    };
};

// Country-based access
const countryAccess = (req, res, next) => {
    if (req.user.role !== 'ADMIN' && req.body.country && req.body.country !== req.user.country) {
        return res.status(403).json({ message: 'Access denied for this country data' });
    }
    next();
};

module.exports = { roleAccess, countryAccess };