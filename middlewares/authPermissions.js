/*const authorizePermissions = (...requiredPermissions) => {
  return (req, res, next) => {
    const permisos = req.user.permisos || [];
    const tienePermiso = requiredPermissions.some(p => permisos.includes(p) || permisos.includes('acceso_total'));

    if (!tienePermiso) {
      return res.status(403).json({ error: 'No tenés permisos suficientes' });
    }

    next();
  };
};

module.exports = authorizePermissions;*/