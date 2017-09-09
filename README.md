## APIRECIPE
Tutorial o ejemplo de un simple APIRESTful -


### Descripcion

Desarrollo de API REST para recetas de cocina. el cual realiza un CRUD en la base de datos.

Este API, lugo sera consumido por una aplicacion realizada en VUEJS 2.0roducto (CRUD)

Fecha de inicio del cursillo: 2017-AGO-20


### Desarollado bajo

- node.js (v6.10.0)
- express
- sequelize


### Base de datos

- sqlite3 	[Testing](https://www.sqlite.org/)
- Postgres 	[Produccion](https://www.postgresql.org/)


### Usando Token & Postman

- [JWT](https://jwt.io/)
- [Postman](https://www.getpostman.com/) Para ver y verificas las API's

### Api operaciones con la Base Datos
```markdown
- La base de datos debe esta previamente creada cuando se trabaja con postgres

- inicializa la base de datos 		=> 		`http://recipe.com/createdb`
- inicializa y agrega contenido   =>		`http://website.com/createdemo`
- verifica la conexion						=>		`http://website.com/conectdb`

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

### Api Category (Categorias)
```markdown
- Esto indica las posibles categorias de la recetas
	Ejemplo: Almuerzo, Postres, Recetas Abuela, Sopas, Preferia, etc.

`http://recipe.com/category`: _Muestra todas las categorias registradas_, pudiendose agregar los siguientes parametros: **order=ASC/DESC** **limit=[numero]** **page=[nropagina]**
`http://recipe.com/category/:id`: _Muestra una categoria en especifica_
`http://recipe.com/category/faker`: _Agrega elementos a la base datos para demostrar las categorias_

- inicializa la base de datos 		=> 		`http://recipe.com/createdb`
- inicializa y agrega contenido   =>		`http://website.com/createdemo`
- verifica la conexion						=>		`http://website.com/conectdb`

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

