const fs = require('fs')

class ContenedorArchivo {

    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    async listar(id) {
        try{
            const contenido = await fs.promises.readFile(`${this.nombreArchivo}`, 'utf-8')
            const info = await JSON.parse(contenido)

            if(info.length>0){
                const findById = info.find((elemento)=> elemento.id == id )
                return findById
            }else{
                return null
            }      
          
        } catch(error){
            console.log(error)
        }
    }
    async listarAll() {
        try{
            const contenido = await fs.promises.readFile(`${this.nombreArchivo}`, 'utf-8')
            const info = await JSON.parse(contenido)
            return info

        } catch(error){
            console.log(error)
        }
    }

    async guardar(obj) {
        try{
            const contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            const info = await JSON.parse(contenido)
         
            if(info.length>0){
                let id =  info.length + 1
                info.push({...obj, id: id, timestamp: new Date().getTime()})
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(info, null,2))
                return info
            }else{
                info.push({...obj, id: 1, timestamp: new Date().getTime()})
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(info, null,2))
                return info
            }
 
        } catch(error){
            console.log(error)
        }
    }
    async borrar(id) {
        console.log(id, 'id borrar')
        try{
            const contenido = await fs.promises.readFile(`${this.nombreArchivo}`, 'utf-8')
            const info = await JSON.parse(contenido)

            if(info.length>0){
                const findById = info.filter((elemento)=> elemento.id !== Number(id) )
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(findById, null,2))
                console.log(findById, 'findById')
                return findById
            }else{
                console.log('no se encuentra el producto')
            }      
          
        } catch(error){
            console.log(error)
        }
    }

    async borrarAll() {
        try{

            const deleteAll = []
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(deleteAll, null,2))            
            return `Se borraron todos los objetos`

        } catch(error){
            console.log(error)
        }
    }
    async actualizar(obj, id) {
        try{
            const contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            let info = await JSON.parse(contenido)

            const findproduct = info.find(product=>product.id == id);
            const product = {...obj, id:Number(id)}

            if(findproduct){
                let updateproduct = info.map((el)=>{
                    if(el.id == id){
                       return el=product
                    }else{
                        return el
                    }
                })

                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(updateproduct, null,2))
                return updateproduct
            }else{
               return {error:'producto no encontrado'}
            }
 
        } catch(error){
            console.log(error)
        }
    }
    //metodos del carrito
    async crearCarrito() {
        try{
            const contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            const info = await JSON.parse(contenido)
            if(info.length>0){
                let id =  info.length + 1
                info.push({id: id, timestamp: new Date().getTime(), productos: []})
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(info, null,2))
                return info
            }else{
                info.push({id: 1, timestamp: new Date().getTime(), productos: []})
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(info, null,2))
                return info
            }
     
        } catch(error){
            console.log(error)
        }
    }
    async listarCarrito(id) {
        try{
            const contenido = await fs.promises.readFile(`${this.nombreArchivo}`, 'utf-8')
            const info = await JSON.parse(contenido)

            if(info.length>0){
                const findById = info.find((elemento)=> elemento.id == id )
                return findById.productos
            }else{
                return null
            }      
          
        } catch(error){
            console.log(error)
        }
    }
    async guardarCarrito(id, obj) {
        try{
            const contenido = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            const info = await JSON.parse(contenido)
            if(info.length>0){
                const findById = await info.find((elemento)=> elemento.id == id )
                let productos = await findById.productos
                if(productos.length>0){
                    let id =  productos.length + 1
                    productos.push({...obj, id: id, timestamp: new Date().getTime()})
                    await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(info, null,2))
                    return productos
                }else{
                    productos.push({...obj, id: 1, timestamp: new Date().getTime()})
                    await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(info, null,2))
                    return productos
                }

            }else{
                return null
            }
     
        } catch(error){
            console.log(error)
        }
    }
    async borrarCarrito(id) {
        try{
            const contenido = await fs.promises.readFile(`${this.nombreArchivo}`, 'utf-8')
            const info = await JSON.parse(contenido)

            if(info.length>0){
                const findById = info.filter((elemento)=> elemento.id !== Number(id) )
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(findById, null,2))
                return findById
            }else{
                console.log('no se encuentra el producto')
            }      
          
        } catch(error){
            console.log(error)
        }
    }
    async borrarProd(id, id_prod) {
        try{
            const contenido = await fs.promises.readFile(`${this.nombreArchivo}`, 'utf-8')
            const info = await JSON.parse(contenido)

            if(info.length > 0){
                // productos del carrito
                const {productos} = await info.find((elemento)=> elemento.id == id )
      
                // nuevo array sin el producto eliminado
                const nuevoArrayProductos = await productos.filter((elemento)=> elemento.id !== Number(id_prod) )
          
                let actualizarCarrito = info.map((el)=>{
                    //encuentra el carrito y actualiza el array de productos
                    if(el.id == id){
                        el.productos = nuevoArrayProductos
                        return el
                    }else{
                        return el
                    }
                })
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(actualizarCarrito, null,2))
                return actualizarCarrito
              
            }else{
                console.log('no se encuentra el producto')
            }      
          
        } catch(error){
            console.log(error)
        }
    }
}

module.exports = ContenedorArchivo