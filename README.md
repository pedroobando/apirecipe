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
La base de datos debe esta previamente creada cuando se trabaja con postgres
`http://recipe.com/createdb`:  inicializa la base de datos
`http://website.com/createdemo`: inicializa y agrega contenido
`http://website.com/conectdb`: verifica la conexion
```

### Api Category (Categorias)
```markdown
Esto indica las posibles categorias de la recetas
Ejemplo: Almuerzo, Postres, Recetas Abuela, Sopas, Preferia, etc.
```
[http://localhost:3000/category/](http://localhost:3000/category/): _Muestra todas las categorias registradas, pudiendose agregar los siguientes parametros:_ **order=**[ASC/DESC] **limit=**[numero] **page=**[nropagina]

[http://localhost:3000/category/:id](http://localhost:3000/category/6): Muestra una categoria en especifica

[http://localhost:3000/category/faker](http://localhost:3000/category/faker): Agrega elementos a la base datos para demostrar las categorias

[http://localhost:3000/category/faker/:totalElment](http://localhost:3000/category/faker/20): Agrega la cantidad de elementos a las diferentes tabla de la base datos para demostrar las categorias

[post - http://localhost:3000/category]: Agrega un registro completo a la categoria.

[put - http://localhost:3000/category/:id]: Actualiza el registro completo de la categoria.

[patch - http://localhost:3000/category/:id/active]: Activa o desactivo el registro completo de la categoria.

[delete - http://localhost:3000/category/:id]: Elimina el registro de la categoria.

#### Tabla Category
- id: numerico
- name: caracter o string
- active: bolean o logico

### Api Measure (Medidas)
```markdown
Esto indica las medidas existentes en las recetas.
Ejemplo: Taza, cucharada rasa, gramos, kilos, mili-litros, unidad, etc
```
[http://localhost:3000/measure/](http://localhost:3000/measure/): _Muestra todas las medidas registradas, pudiendose agregar los siguientes parametros:_ **order=**[ASC/DESC] **limit=**[numero] **page=**[nropagina]

[http://localhost:3000/measure/:id](http://localhost:3000/measure/6): Muestra una medidas en especifica

[http://localhost:3000/measure/faker](http://localhost:3000/measure/faker): Agrega elementos a la base datos para demostrar las medidas

[http://localhost:3000/category/faker/:totalElment](http://localhost:3000/category/faker/20): Agrega la cantidad de elementos a las diferentes tabla de la base datos para demostrar las categorias

[post - http://localhost:3000/measure]: Agrega un registro completo

[put - http://localhost:3000/measure/:id]: Actualiza el registro completo

[patch - http://localhost:3000/measure/:id/active]: Activa o desactivo el registro completo

[delete - http://localhost:3000/measure/:id]: Elimina el registro

#### Tabla Measure
- id: numerico
- name: caracter o string
- active: bolean o logico
