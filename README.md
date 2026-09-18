# NODO_TP3_APIHTTPcon-EXPRESS

Descripción

Este proyecto implementa una API HTTP con Express para administrar temporalmente un catálogo de instrumentos musicales. La API carga datos iniciales desde un archivo JSON y permite listar, filtrar, consultar detalles y crear instrumentos en memoria.

Importante: las creaciones no se persisten en el archivo JSON, por lo que desaparecen al reiniciar el seLos instrumentos creados mediante POST se almacenan solo en memoria mientras el servidor está activo.

Al reiniciar el servidor, los datos vuelven al estado inicial definido en datos/instrumentos.json.

Esto ocurre porque no se escribe en el archivo JSON ni se usa una base de datos.rvidor.

 Instalación

Clonar el repositorio:

git clone https://github.com/canayorui/NODO_TP3_APIHTTPcon-EXPRESS.git

Instalar dependencias:

npm install

🚀 Ejecución

Iniciar el servidor:

npm start

Detener el servidor: Ctrl + C en la terminal.

El servidor se ejecuta por defecto en:http://localhost:3000

Endpoints

Bienvenida

GET /Responde con un mensaje indicando que la API está disponible.

Listado y filtro

GET /api/instrumentosDevuelve todos los instrumentos.

GET /api/instrumentos?familia=cuerdaFiltra por familia (no distingue mayúsculas/minúsculas).Si no hay coincidencias, devuelve [].

Detalle por ID

GET /api/instrumentos/:idDevuelve el instrumento con el ID indicado.

Si existe → 200 con el objeto.

Si no existe → 404 con { error: "Instrumento no encontrado" }.

Creación en memoria

POST /api/instrumentosRequiere un cuerpo JSON con los campos:

{
  "nombre": "Piano",
  "familia": "Cuerda",
  "origen": "Alemania",
  "descripcion": "Instrumento de teclado con cuerdas percutidas.",
  "disponible": true
}

Si falta algún campo obligatorio → 400 con { error: "Faltan campos obligatorios" }.

Si el cuerpo está completo → 201 con el instrumento creado (incluye nuevo id).

Códigos de estado

200 → Solicitud exitosa (bienvenida, listado, filtro, detalle existente).

201 → Creación exitosa.

400 → Error por campos faltantes en creación.

404 → Instrumento no encontrado.

 Persistencia de los datos

Los instrumentos creados mediante POST se almacenan solo en memoria mientras el servidor está activo.

Al reiniciar el servidor, los datos vuelven al estado inicial definido en datos/instrumentos.json.

Esto ocurre porque no se escribe en el archivo JSON ni se usa una base de datos.