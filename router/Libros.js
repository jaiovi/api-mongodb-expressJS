const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Libro = require('../models/libro');

//obtener documentos de BD mongo
router.get('/',async(req,res)=>{
    try{
        const arrayLibrosDB = await Libro.find();
        res.json(arrayLibrosDB);
    }catch(error){
        console.log(error);
    }
});

//obtener documentos de BD mongo
router.get('/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const arrayLibrosDB = await Libro.find({isbn:id});
        res.json(arrayLibrosDB);
    }catch(error){
        console.log(error);
    }
});

router.post('/',async(rew,res)=>{
    const body = req.body;
    try{
        await Libro.create(body);
        res.json({estado:'Libro insertado exitosamente'})
    }catch(error){
        console.log(error);
    }
});

router.delete('/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const libroDB = await Libro.findOneAndDelete({isbn:id});
        libroDB ? res.json({estado:true,mensaje:'Libro eliminado'}) : res.json({estado:false,mensaje:'No se elimino libro'})
    }catch(error){
        console.log(error);
    }
});

module.exports = router;