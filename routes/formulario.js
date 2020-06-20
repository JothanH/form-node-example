const express = require('express');

const router = express.Router();
const path = require('path');

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));


router.get('/', (req, res, next) => {
    res.sendFile(path.join(path.dirname(process.mainModule.filename), 'views', 'formulario.html'));
});


router.post('/enviar', (req, res, next) => {
    console.log(req.body);

    transporter.sendMail({
        to: 'jonathan.henao@gmail.com',
        from: 'info@jobysoft.com',
        subject: '[Formulario de prueba] Datos enviados dese un formulario',
        html: `
            <h1>Acá se envian los datos que se llenaron en el formulario</h1>
            <br>
            <br>
            <p>Por ejemplo lo que introdujo en el campo fue: "${req.body.title}"</p>
           
            `
    }).then(
        res.redirect('/formulario/confirmacion')
    ).catch(err => {
        res.redirect('/formulario/error')
    });


})


router.get('/confirmacion', (req, res, next) => {
    res.sendFile(path.join(path.dirname(process.mainModule.filename), 'views', 'confirmacion.html'));
});

router.get('/error', (req, res, next) => {
    res.sendFile(path.join(path.dirname(process.mainModule.filename), 'views', 'error.html'));
});

exports.routes = router;