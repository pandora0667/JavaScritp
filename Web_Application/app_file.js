/**
 * Created by jusk2 on 2017-01-03.
 */
const express = require('express');
const fs = require('fs');
const bodyParser =  require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.locals.pretty = true;
app.set('views', './view_file');
app.set('view engine', 'jade');
app.get('/topic/new' , function (req, res) {
    res.render('new');
});

app.post('/topic', function (req, res) {
    const title = req.body.title;
    const description = req.body.description;

    fs.writeFile('Data/'+ title, description, function (err) {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.send('Success!');

    });
});

app.get('/topic', function (req, res) {
    fs.readdir('Data/', function (err, files) {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        res.render('view', {topics:files});
    });
});

app.listen(5000, function () {
    console.log('Connected Port 5000');
});
