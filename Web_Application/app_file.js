/**
 * Created by jusk2 on 2017-01-03.
 */
const express = require('express');
const multer = require('multer');
const _storage  = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: _storage })
const fs = require('fs');
const bodyParser =  require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.locals.pretty = true;
app.set('views', './view_file');
app.set('view engine', 'jade');

app.get('/topic/new' , function (req, res) {
    fs.readdir('Data/', function (err, files) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('new', {topics:files});

    });
});

app.post('/topic', function (req, res) {
    const title = req.body.title;
    const description = req.body.description;

    fs.writeFile('Data/'+ title, description, function (err) {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title);

    });
});

app.get(['/topic', '/topic/:id'], function (req, res) {
    fs.readdir('Data/', function (err, files) {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if(id) {
        // id 값이 있을때
        fs.readFile('data/'+id, 'utf8', function (err, data) {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            res.render('view', {topics:files, title:id, description:data});
        })
            } else
                {
                    // id 값이 없을때
                    res.render('view', {topics: files, title:'Welcome', description:'Hello, JavaScript for server'});
                }
    });
});

app.get('/upload', function (req, res) {
    res.render('upload')

});
app.post('/upload', upload.single('userfile'), function (req, res) {
    console.log(req.file);
    res.send('Uploaded : '+req.file.filename);
});

app.use('/user', express.static('uploads'));

/*
app.get('/topic/:id', function (req, res) {
    var id = req.params.id;
    fs.readdir('Data/', function (err, files) {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

        fs.readFile('data/'+id, 'utf8', function (err, data) {
            if(err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            res.render('view', {topics:files, title:id, description:data});
        })
    })
});
*/

app.listen(5000, function () {
    console.log('Connected Port 5000');
});
