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
