# User Restful Api

Project built with:

-   NodeJS
-   Express
-   Swagger
-   Deployment Server: Heroku
-   For more information, check libraries in packege.json ;)

## Test and Read User Api Documentation

Open https://node-express-restful-api.herokuapp.com/v1/users/doc/ to visualize it.

## Definición de entidades

-   **Usuario**: Usuario registrado en la plataforma, todos los campos son obligatorios.
    -   Nombre: Mínimo de 2 caracteres y un máximo 20 (Todos los caracteres serán válidos)
    -   Apellidos: Mínimo de 4 y máximo de 50 (Todos los caracteres serán válidos)
    -   Email: Deberá cumplir el [RFC 5322](https://www.ietf.org/rfc/rfc5322.txt)
    -   Contraseña: Mínimo de 10 caracteres y máximo de 25 (Al menos una minúscula, mayúscula y un número)

## Requisitos funcionales

-   El usuario podrá registrarse en la aplicación, introduciendo los datos necesarios.
    -   El email debe ser único por cada usuario.
-   El usuario podrá autenticarse ante la aplicación utilizando su email y contraseña.
    -   Si la autenticación es válida, la aplicación le devolverá al usuario un token que le servirá para demostrar su identidad ante la aplicación cuando quiera cambiar/eliminar sus datos.
-   El usuario podrá obtener todos sus datos exceptuando su contraseña, utilizando su identificador.
-   El usuario podrá actualizar su nombre y apellidos, será necesario el identificador.
-   El usuario podrá actualizar su email, será necesario el identificador y la contraseña actual.
-   El usuario podrá actualizar su contraseña, será necesario el identificador y la contraseña actual.
-   El usuario podrá eliminar todos sus datos de la plataforma, será necesario el identificador y la contraseña actual.

## Requisitos no funcionales

-   La aplicación deberá poderse ejecutar con la versión LTS de Node.JS(16).
-   Se puede utilizar cualquier base de datos, aunque es recomendable utilizar Mongo.DB ya que es la que hemos explicado en los videos.
-   Lint-staged and husky are packages to execute our eslint and prettier to format our and code before updaload to github
