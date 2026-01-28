const authMiddleware = (requiredRole) => {
    return (req, res, next) => {
        const userRole = req.headers['x-user-role'];
        const userId = req.headers['x-user-id'];

        if (!userRole) {
            return res.status(401).json({
                success: false,
                message: 'Akses ditolak. Header x-user-role tidak ditemukan.'
            });
        }

        if (requiredRole && userRole !== requiredRole) {
            return res.status(403).json({
                success: false,
                message: `Akses ditolak. Role '${requiredRole}' diperlukan.`
            });
        }

        if (userRole === 'user' && !userId) {
            return res.status(401).json({
                success: false,
                message: 'Akses ditolak. Header x-user-id diperlukan untuk role user.'
            });
        }

        req.user = { id: userId, role: userRole };
        next();
    };
};

module.exports = authMiddleware;
