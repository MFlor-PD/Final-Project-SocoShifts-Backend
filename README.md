# Final-Project-SocoShifts

API para la gestión dinámica y automatizada de cuadrantes laborales.

DESCRIPCION
Esta aplicación web tiene como objetivo facilitar, optimizar y hacer más eficiente la generación de cuadrantes en entornos altamente dinámicos, típicos de trabajos de temporada como socorrismo, hostelería y restauración.

Actualmente, la aplicación está enfocada en el sector de salvamento y socorrismo, pero está diseñada para escalar y adaptarse a diferentes rubros mediante un sistema de selección inicial que solicitará datos específicos según el área elegida.

FUNCIONALIDADES PRINCIPALES
* Carga de datos de trabajadores: nombre, apellido, rol, playa asignada, y autorización mediante token para manipular datos (crear, editar, eliminar o acceder a información sensible).

* Configuración del cuadrante: selección del mes para generar el cuadrante, opción de definir días preferentes de trabajo (opcional).

* Gestión de carga horaria: se establecen las horas legales mensuales a cumplir (160, 169, 172, 174, 176, etc.) y la carga horaria diaria, que puede dividirse en periodos (por ejemplo, horarios diferentes para distintas quincenas o eventos especiales).

* Cálculo automático: la app calcula la carga total de horas del mes, días libres legales, horas extras y distribuye los días libres y laborales de manera armónica, respetando días obligatorios si los hubiera.

* Visualización: frontend desarrollado en React que muestra un calendario día a día con los trabajadores activos y la playa asignada.


FUNCIONALIDADES A DESARROLLAR
* Definir parámetros como cantidad de roles y trabajadores por playa (ejemplo: Playa Sur → 1 supervisor, 3 socorristas).

* Cálculo y generación de nóminas considerando cargas impositivas y horas trabajadas.

* Edición individual de días, trabajadores, playas y roles.

* Sistema de fichaje para registrar entradas y salidas.

* Compartir cuadrantes vía email o enlace público.


INSTALACION Y CONFIGURACION DEL BACKEND
* Clonar o forkear el repositorio desde GitHub.
* Inicializar el proyecto con: npm install.
* Instalar dependencias necesarias:

"bcryptjs"
"dotenv"
"express"
"jsonwebtoken"
"mysql2"
"pg"
"swagger-jsdoc"
"swagger-ui-express"
"jest"

* Configurar la base de datos PostgreSQL en AWS.

* Crear tablas principales mínimas en PostgreSQL:

- usuarios
- rol
- playas
- mes
- dia_de_semana

* Estructura del proyecto backend

/docs                # Documentación Swagger
/test.js             # Tests con Jest y Supertest
/certs               # Certificados para conexión segura a AWS
/config              # Configuración de conexión a PostgreSQL
/models              # Consultas a la base de datos
/controllers         # Lógica para manejar datos y rutas
/routes              # Rutas CRUD (protegidas con autenticación, excepto GET cuadrante)
/helpers             # Funciones y cálculos auxiliares para la generación del cuadrante
/services            # Lógica de negocio y generación de cuadrantes
/middlewares         # Middleware para autenticación JWT y protección de rutas
app.js               # Entrada principal de la aplicación backend

* Variables de entorno
El archivo .env debe contener al menos:

PORT=3000
DB_HOST=...
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
JWT_SECRET=...

* Licencia
- MIT


* Rutas
get('/') obtiene el cuadrante
post('/') crea asignaciones de dias
post('/cuadrante/generar'); genera cuadrante

------------------------------------------------------------------------------------

* Respuesta de la API: Formato del Cuadrante

La API devuelve el cuadrante en formato JSON con la siguiente estructura:

[
  {
    "id": 123,
    "nombre": "Juan",
    "apellido": "Pérez",
    "correo": "juan.perez@example.com",
    "rol": "Socorrista",
    "auth": false,                     // Booleano: indica si el usuario está autorizado (por defecto false)
    "mes": "2025-07",                 // Mes correspondiente al cuadrante (formato YYYY-MM)
    "dias_obligatorios": [            // Días de la semana con obligación de trabajo (por ejemplo, días fijos)
      "viernes",
      "sabado"
    ],
    "dias_trabajo_por_defecto": [     // Días asignados para trabajar, con horarios o turnos específicos
      {
        "dia": "2025-07-02",
        "horario": "08:00-16:00"
      },
      {
        "dia": "2025-07-03",
        "horario": "10:00-18:00"
      }
    ],
    "dias_libres": [                  // Días libres asignados (calculados en base a la carga horaria mensual y legal)
      {
        "dia": "2025-07-05"
      }
    ],
    "horas_legales": 160,             // Horas legales mensuales que debe cumplir el trabajador
    "horas_trabajadas": 165           // Horas realmente trabajadas calculadas para el mes
  }
]
