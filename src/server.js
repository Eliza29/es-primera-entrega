const express = require('express')
const { Router } = express

const ContenedorArchivo = require('./contenedores/ContenedorArchivo.js')
const productosApi = new ContenedorArchivo('dbProductos.json')
const carritosApi = new ContenedorArchivo('dbCarritos.json')
//--------------------------------------------
// instancio servidor y persistencia

const app = express()

//--------------------------------------------
// permisos de administrador MIDDLEWARES

const esAdmin = true

function crearErrorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1
    }
    if(ruta && metodo){
        error.description =  `ruta ${ruta} metodo ${metodo} no autorizado`
    }else{
        error.description = 'no autorizado'
    }
    return error
}

function soloAdmins(req, res, next) {
    if(esAdmin){
        console.log('solo admins')
        next();
        
    }else{
        res.json(crearErrorNoEsAdmin());
    }
}

//--------------------------------------------
// configuro router de productos

const productosRouter = new Router()

//RUTAS LLAMANDO A LOS METODOS DE LA CLASE
productosRouter.get('/', async(req, res) => {
    const productos = await productosApi.listarAll()
    res.json(productos)
})

productosRouter.post('/', soloAdmins, async(req, res) => {
    const productos = await productosApi.guardar(req.body)
    res.json(productos)
})
productosRouter.put('/:id', soloAdmins, async(req, res, ) => {
    const id = req.params.id;
    const producto = await productosApi.actualizar(req.body,id)
    res.json(producto)
});

productosRouter.delete('/:id', soloAdmins, async(req, res) => {
    const id = req.params.id;
    const producto = await productosApi.borrar(id)
    res.json(producto)
});

// --------------------------------------------
// configuro router de carritos

const carritosRouter = new Router()

carritosRouter.get('/:id/productos', async(req, res) => {
    const id = req.params.id;
    const productos = await carritosApi.listarCarrito(id)
    res.json(productos)
})
carritosRouter.post('/', async(req, res) => {
    const productos = await carritosApi.crearCarrito()
    res.json(productos)
})
carritosRouter.post('/:id/productos', async(req, res) => {
    const id = req.params.id;
    const productos = await carritosApi.guardarCarrito(id, req.body)
    res.json(productos)
})
carritosRouter.delete('/:id', async(req, res) => {
    const id = req.params.id;
    const productos = await carritosApi.borrarCarrito(id)
    res.json(productos)
})
carritosRouter.delete('/:id/productos/:id_prod', async(req, res) => {
    const id = req.params.id;
    const id_prod = req.params.id_prod;
    const productos = await carritosApi.borrarProd(id, id_prod)
    res.json(productos)
})


  
//--------------------------------------------
// configuro el servidor

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', productosRouter)
app.use('/api/carritos', carritosRouter)

app.get('*', function(req, res){
    res.status(404)
    .send({error: -2, descripcion: `no implementada`});
});
module.exports = app