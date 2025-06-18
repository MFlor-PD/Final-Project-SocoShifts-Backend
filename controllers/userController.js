const userModel = require('../models/userModel');

const getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.getUsersById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

const createUser = async (req, res) => {
  const { nombre, apellido, rol_id } = req.body;
  try {
    const newUser = await userModel.createUser({ nombre, apellido, rol_id });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

const editUser = async (req, res) => {
  const userId = req.params.id;
  const { nombre, apellido, rol_id } = req.body;
  try {
    const updatedUser = await userModel.editUser(userId, { nombre, apellido, rol_id });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    if (error.message === 'Usuario no encontrado') {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(500).json({ error: 'Error al editar el usuario' });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await userModel.deleteUser(userId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.message === 'Usuario no encontrado') {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser
};