# Pasos iniciales:
1. Instalar NodeJS.
2. Instalar MySQL con las opciones "Developer Default" y "Use Legacy Authentication Method". 
3. Abrir conexión en MySQL Workbench con cualquier usuario y ejecutar las sentencias SQL del fichero "database-init.sql".
4. Editar el fichero ".env" con los datos del usuario de MySQL utilizado en el paso anterior.
5. Instalar dependencias de package.json: npm install
6. Ejecutar el fichero "app.js": npm start 
7. Acceder desde el navegador a http://localhost:8080

# Descripción de la web:
Este proyecto consiste en una página web para el restaurant italiano ficticio "La Nostra Casa". 
Se distingue entre tres tipos de usuarios: 
Usuario no registrado: puede ver el menú, la información del restaurante y acceder a la hoja de reclamaciones.
Usuario registrado y con sesión iniciada: además de las acciones disponibles para el usuario no registrado, este puede realizar y cancelar reservas en el restaurante, ver la información de su cuenta, eliminar su cuenta y cerrar sesión. 
Administrador: puede visualizar y cancelar las reservas de todos los usuarios, así como sus reclamaciones. Tiene la posibilidad de añadir, modificar y eliminar secciones y productos del menú. Al igual que el usuario registrado, puede ver la información de su cuenta y cerrar sesión, sin embargo, este no puede eliminar su cuenta.