const express = require('express');
const bodyParser = require('body-parser');
const {dirname} = require('path');
const port = 3000;

const app = express();

app.use(bodyParser,bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/biblio',
{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>console.log('Base de datos conectada'))
.catch(e=>console.log(e));


app.use('/libros',require('./router/Libros'));

app.listen(port, () => console.log(`Server running on port ${port}`));

