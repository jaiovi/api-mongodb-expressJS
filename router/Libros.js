const express = require('express');
const router = express.Router();
const Libro = require('../models/libro');

// Obtener todo los documentos directamente de la base de datos de mongo
router.get('/',async(req,res)=>{
    try{
        const arrayLibrosDB = await Libro.find();
        // console.log(arrayLibrosDB);
        res.json(arrayLibrosDB);
    } catch (error) {
        console.log(error);
    }
});

// Para obtener un solo libro de la base de datos
router.get('/:id', async(req,res)=>{
    const id = req.params.id;
    try {
        const arrayLibrosDB = await Libro.find({isbn:id});
        console.log(arrayLibrosDB)
        res.json(arrayLibrosDB);

    } catch (error) { 
        console.log(error);
    }
})

// Para insertar un documento en la base de datos de Mongo
router.post('/', async(req,res)=>{
    const body = req.body;
    try {
        await Libro.create(body);
        res.json({estado:"Libro insertsado exitosamente"});
    } catch { 
        console.log(error);
    }
})

// Para eliminar un documento en la base de datos de Mongo
router.delete('/:id', async(req,res)=>{
    const id = req.params.id;
    try {
        const libroDB = await Libro.findOneAndDelete({isbn:id});
        if(libroDB){
            res.json({
                estado:true,
                mensaje:'libro eliminado'
            })
        } else {
            res.json({
                estado:false,
                mensaje:'No se pudo eliminar el libro solicitado'
            })
        }
    } catch (error) { 
        console.log(error);
    }
})

// Para actualizar un documento en la base de datos de Mongo
router.put('/:id', async(req,res)=>{
    const id = req.params.id;
    const body = req.body;
    try {
        const libroDB = await Libro.findOneAndUpdate({isbn:id}, body, {useFindAndModify:false});
        res.json({
            estado:false,
            mensaje:'El libro ha sido actualizado con exito'
        })
    } catch (error) { 
        console.log(error);
        res.json({
            estado:false,
            mensaje:'Los datos del libro no fueron actualizados'
        })
    }
})


module.exports=router;