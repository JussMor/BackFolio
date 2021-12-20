# BackFolio

<h1 align="center">Hi 👋, Este es mi proyecto de backend</h1>
<h3 align="center">Que hay aqui?</h3>

<p align="right">
Este es un pequeño backend donde uso muchos conocimientos aunque aun es propenso a bugs. Este proyecto esta hosteado en HEROKU.
</p>
<br>
Tecnologias:<br>
- NODEJS: El runtime de javascript <br>
- EXPRESS: Framework backend.<br>
- REDIS: Base de datos en memoria<br>
- JWT: Json Web tokens <br>
- FIREBASE: Servios BAAS de google <br>
- MONGO: Base de datos no relacional <br>
- POSTGRES: Base de datos relacional<br>
- SEQUELIZE: ORM para bases de datos relacionales<br>
<br>
<p align="left">
Este proyecto contiene varios endpoints distribuidos de la siguiente manera:
</p>

<h2> URL BASE </h2>
<h3>https://apifolio.herokuapp.com</h3>
<h2>USER</h2>
<br>
<p>Estas rutas estan usando Sequelize con Postgres</p>
<br>
GET:     /api/v1/users <br>
GET:     /api/v1/users/:id<br>
POST:    /api/v1/users<br>
PUT:     /api/v1/users/:id<br>
DELETE:  /api/v1/users/:id<br>

<h2>TECHNOLOGY</h2>
<br>
<p>Estas rutas estan usando Mongo como base de datos</p>
<br>
GET:   /api/v1/feature/tools<br>
GET:   api/v1/feature/tools/:id (Esta rutas esta protegida gracias a firebase que puede ser usado en el backend para hacer validaciones.)<br>
<br>
<p>En este punto te invito a ir a mi proyecto Fronfolio  para que puedas ver como esta integrada esta ruta y visitar mi sitio web https://fronfolio.herokuapp.com/</p>
<br>
POST:  /api/v1/feature/tools<br>
PUT:   /api/v1/feature/tools/:id/edit<br>
DELETE: /api/v1/feature/tools/:id/delete<br>
<br>
<h2>AUTH</h2>
<br>
<p>Estas rutas son de login y usa redis para almacenar el jwt, la ruta signup crea un usuario y lo almacena tanto en postres como en firebase auth</p>
<br>
POST: /api/v1/auth/signin (Logea usuario en firebase)<br> 
POST: /api/v1/auth/signup (Crea usuario Postgres y Firebase)<br>
POST: /api/v1/auth/refresh-token <br>
DELETE: /api/v1/auth/logout <br>
