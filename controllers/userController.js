const { json } = require('express');
const { getAllUsers, getUsersById, createUser, editUser, deleteUser } = require('../models/userModel');

const getUsers = async (req, res) => {
  try {
    const usuarios = await getAllUsers();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await getUsersById(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuario por ID' });
  }
};

const crearUsuarioHandler = async (req, res) => {
  try {
    const { nombre, apellido, rol, playa } = req.body;

    if (!nombre || !apellido || !rol || !playa) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const nuevoUsuario = await createUser({ nombre, apellido, rol, playa });
    res.status(201).json(nuevoUsuario);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};


const editUserbyId = async (req, res) => {
  try{

  const { id } = req.params;
  const { nombre, apellido, rol, playa } = req.body;

   if (!id || !nombre || !apellido || !rol) {
      return res.status(400).json({ error: 'Faltan campos obligatorios para editar el usuario' });
    }

    const usuarioEditado = await editUser(id, { nombre, apellido, rol, playa });

    res.status(200).json(usuarioEditado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al editar el usuario' });
  }
};
 
const deleteUserbyId = async (req, res) => {
  try{

    const { id } = req.params;

   if (!id) {
      return res.status(400).json({ error: 'Falta el ID del usuario para eliminar'  });
    }

    const usuarioEliminado = await deleteUser(id)
      res.status(200).json({
      mensaje: 'Usuario eliminado con éxito',
       usuario: usuarioEliminado
});


  }catch (err) {

   console.error(err);
   res.status(500).json({error: 'Error al eliminar el usuario'})
   
  }
}
module.exports = {
  getUsers,
  getUserById,
  crearUsuarioHandler,
  editUserbyId,
  deleteUserbyId
};

