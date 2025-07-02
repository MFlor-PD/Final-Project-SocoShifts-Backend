const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const usuarios = await prisma.usuarios.findMany({
    include: { asignaciones_trabajo: true },
  });
  console.log(usuarios);

  const nuevoUsuario = await prisma.usuarios.create({
    data: {
      nombre: "Test",
      apellido: "Usuario",
      rol: "tester",
      playa: "Playa Test",
    },
  });
  console.log("Usuario creado:", nuevoUsuario);
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
