const rolModel = require('../models/rolModel');

const getAllRoles = async (req, res) => {
  try {
    const roles = await rolModel.getAllRoles();
    res.json(roles);
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).json({ error: 'Error al obtener roles' });
  }
}   
const getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const rol = await rolModel.getRoleById(id);
    if (!rol) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    res.json(rol);
  } catch (error) {
    console.error('Error al obtener rol:', error);
    res.status(500).json({ error: 'Error al obtener rol' });
  }
}
const createRole = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const nuevoRol = await rolModel.createRole(nombre, descripcion);
    res.status(201).json(nuevoRol);
  } catch (error) {
    console.error('Error al crear rol:', error);
    res.status(500).json({ error: 'Error al crear rol' });
  }
};
const updateRole = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    const rolActualizado = await rolModel.updateRole(id, nombre, descripcion);
    if (!rolActualizado) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    res.json(rolActualizado);
  } catch (error) {
    console.error('Error al actualizar rol:', error);
    res.status(500).json({ error: 'Error al actualizar rol' });
  }
};
const deleteRole = async (req, res) => {
  const { id } = req.params;
  try {
    const rolEliminado = await rolModel.deleteRole(id);
    if (!rolEliminado) {
      return res.status(404).json({ error: 'Rol no encontrado' });
    }
    res.json({ message: 'Rol eliminado', rol: rolEliminado });
  } catch (error) {
    console.error('Error al eliminar rol:', error);
    res.status(500).json({ error: 'Error al eliminar rol' });
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole
};
