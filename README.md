## es-primera-entrega
Avance de la aplicación ecommerce Backend.
Implementación de un servidor de aplicación basado en plataforma Node.js y express

### Proyecto desplegado glitch

#### ruta api productos
Devuelve un array con todos los productos disponibles.
https://melon-ivy-pig.glitch.me/api/productos

La ruta base 'api/productos' tiene implementada las siguientes funcionalidades:
* GET: '/' Lista todos los productos disponibles
* GET: '/:id' Lista el producto correspondiente a su id
* POST: '/' Agrega un producto al listado
* PUT: ':id' Actualiza un producto por su id
* DELETE: '/:id' Borra un producto por su id 


#### ruta api carrito
Me permite listar todos los productos guardados en uno de los carritos por id.
https://melon-ivy-pig.glitch.me/api/carritos/1/productos

La ruta base 'api/carritos' tiene implementada cinco funcionalidades:
* POST: '/' Crea un carrito
* DELETE: '/:id' Elimina un carrito
* GET: '/:id/productos' Me permite listar todos los productos guardados en uno de los carritos
* POST: ':id/productos' Agrega un producto al carrito por el id del carrito
* DELETE: '/:id/productos/:id_prod' Elimina un producto del carrito por su id de carrito y de producto 

