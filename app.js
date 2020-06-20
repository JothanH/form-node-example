const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const formData = require('./routes/formulario');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); //Middleware que sirve para poder servir los archivos estáticos como el CSS


app.use('/formulario', formData.routes);


app.listen(3000);