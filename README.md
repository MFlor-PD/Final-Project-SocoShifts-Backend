# 🚩 Final-Project-SocoShifts

[![Node.js](https://img.shields.io/badge/node.js-16.x-green?logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13-blue?logo=postgresql)](https://www.postgresql.org/)
[![Express](https://img.shields.io/badge/express.js-4.x-black?logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/prisma-4.x-blue?logo=prisma)](https://www.prisma.io/)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

API para la **gestión dinámica y automatizada de cuadrantes laborales**.

---

## 📋 Descripción

Esta aplicación web tiene como objetivo **facilitar, optimizar y hacer más eficiente la generación de cuadrantes** en entornos dinámicos, típicos de trabajos de temporada como:

- 🏖️ Socorrismo
- 🍽️ Hostelería
- 🏨 Restauración

Actualmente enfocada en salvamento y socorrismo, pero diseñada para escalar y adaptarse a otros sectores mediante selección inicial.

---

## ⭐ Funcionalidades principales

- 👥 **Gestión de trabajadores**: nombre, apellido, rol, playa asignada.
- 📆 **Configuración de cuadrante**: selección de mes.
- ⏳ **Carga horaria flexible**: horas legales mensuales y diarias.
- ⚙️ **Cálculo automático**: distribución balanceada de días laborales.
- 🖥️ **Visualización**: frontend React, deploy con render y Netfily.

---

## 🚧 Funcionalidades a futuro

- ⚖️ Definición de roles y cantidades por playa.
- 💰 Generación de nóminas con cálculos impositivos.
- ✍️ Edición manual de asignaciones, días, trabajadores y roles.
- 🔒 Sistema de fichaje para control de entradas y salidas.
- 📤 Compartir cuadrantes vía email o enlace público.

---

## ⚙️ Instalación y configuración

### Clonar el repositorio y preparar entorno

```bash
git clone <url-del-repositorio>
cd Final-Project-SocoShifts
npm install

- DEPENDENCIAS:

npm install dotenv express pg @prisma/client date-fns cors



- CONFIGURAR BBDD PostgreSQL (AWS recomendado)
    - Crear las tablas mínimas:

* usuarios (con nombre, apellido, rol, playa)
* asignaciones_trabajo (tabla intermedia)
* configuracion_cuadrante (mes, horas diarias, horas legales mensuales, socorristas por dia)

- VARIABLES DE ENTORNO (.env)

PORT

#Postgres y AWS
PG_DB_HOST
PG_DB_USER
PG_DB_PASSWORD
PG_DB_NAME
PG_DB_PORT

# Prisma DB URL
DATABASE_URL

## 🗂️ Estructura del proyecto

/certs               # Certificados para AWS (SSL)
/config              # Configuración conexión PostgreSQL
/models              # Consultas a DB
/controllers         # Controladores para rutas
/routes              # Definición de rutas CRUD
/helpers             # Funciones auxiliares
/services            # Lógica de negocio
/generated           # Prisma generated files
/prisma              # Prisma schema y migraciones
app.js               # Entrada principal backend


## 🔑 Rutas principales

                 Usuarios

Método         	Ruta	               Descripción
GET	          /usuarios	         Listar todos los usuarios
GET	          /usuarios/:id	     Obtener usuario por ID
POST	        /usuarios	         Crear nuevo usuario
PUT	          /usuarios/:id	        Editar usuario

Ejemplo POST /usuarios:           
{
  "nombre": "Lucas",
  "apellido": "Martínez",
  "rol": "Socorrista",
  "playa": "Playa Norte"
}


                 Cuadrante

Método	             Ruta	                                  Descripción
GET	            /cuadrante?mes=YYYY-MM	      Obtener asignaciones y cuadrante del mes
POST	          /cuadrante	                  Crear asignación manual (día obligatorio o no)
POST	         /cuadrante/generar	            Generar cuadrante completo según configuración
PUT	           /cuadrante/editar	            Editar asignaciones concretas
DELETE	       /cuadrante/eliminar	          Eliminar días asignados

Ejemplo POST /cuadrante:
{
  "usuario_id": 1,
  "fecha": "2025-08-12",
  "es_obligatorio": true
}

Ejemplo POST /cuadrante/generar:
{
  "mes": "2025-08",
  "periodos": [
    { "inicio": "2025-08-01", "fin": "2025-08-15", "horasPorDia": 9.5 },
    { "inicio": "2025-08-16", "fin": "2025-08-31", "horasPorDia": 7.5 }
  ],
  "horasMensuales": 174
}


                  Configuración de cuadrante

Método	                     Ruta	                                    Descripción
GET	                /configuracion-cuadrante/YYYY-MM	       Obtener configuración por mes
PUT	               /configuracion-cuadrante	                 Guardar/actualizar configuración
DELETE	           /configuracion-cuadrante/:mes	           Eliminar configuración y datos mes

Ejemplo GET http://localhost:3000/configuracion-cuadrante?mes=2025-08

Ejemplo PUT /configuracion-cuadrante
{
  "mes": "2025-08",
  "horas_diarias": 7.5,
  "horas_legales_mes": 160,
  "socorristas_por_dia": 3
}

Ejemplo DELETE http://localhost:3000/configuracion-cuadrante/2025-11



[
  {
    "id": 123,
    "nombre": "Juan",
    "apellido": "Pérez",
    "correo": "juan.perez@example.com",
    "rol": "Socorrista",
    "auth": false,
    "mes": "2025-07",
    "dias_obligatorios": ["viernes", "sabado"],
    "dias_trabajo_por_defecto": "mes"
    "dias_libres": [{ "dia": "2025-07-05" }],
    "horas_legales": 160,
    "horas_trabajadas": 165,
    "Cantidad_socorristas por dia": 2
  }
]

## 📜 Licencia

Este proyecto está bajo licencia MIT — mira el archivo LICENSE para más detalles.

