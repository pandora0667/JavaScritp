/**
 * Created by jusk2 on 2017-01-02.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false })) // post 방식

/*app.set = express('view engine', 'jade');
app.set('views','./views');*/
app.locals.pretty = true;
app.use(express.static('public'));

app.get('/template', function (req, res) {
    res.render('temp', {time:Date(), title:'wisoft'});
})

app.get('/template2', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
})

app.get('/', function (req, res) {
    res.send('Welcome to My Homepage!!');
});

app.get('/login', function (req, res) {
    res.send('<h1>Login Please!!</h1>')
});

app.get('/router', function (req, res) {
    res.send('<h1>Hello Router<h1/> <img src = "1.jpg">')
});

app.get('/dynamic', function (req, res) {
    var lis = '';
    for(var i=0; i<5; i++) {
        lis = lis +'<li>coding</li>';
    }
    var time = Date();
    var outPut =`
        <!DOCTYPE html>
    <html lang="en"> 
        <head>
        <meta charset="UTF-8">
        <title>SeongWon</title>
        </head>
        <body>
        Hello, SeongWon!
    <ul>
    ${lis}
    </ul>
    ${time}
    </body>
    </html>`
    res.send (outPut)
})

app.get('/topic/:id', function (req, res) {
    var topics = [
        'Wisoft is ... ',
        'My name is Lee Seong Won ',
        'Express is ... '
        ];
    var output = `
        <a href="/topic/0">Wisoft is ... </a><br>
        <a href="/topic/1">My name is Lee Seong Won ... </a><br>
        <a href="/topic/2">Express is ...  </a><br><br>
        ${topics[req.params.id]}
`
    res.send(output);
})

app.get('/topic/:id/:mode', function (req, res) {
    res.render(req.params.id+', '+req.params.mode);
})
app.get('/form', function (req, res) {
    res.render('form')
})

app.get('/form_receiver', function (req, res) {
    var title = req.query.title;
    var description = req.query.description;
    res.send(title + ', ' + description);
})

app.post('/form_receiver', function (req, res) {
    var title = req.body.title;
    var description = req.body.description;
    res.send(title + ', ' + description)
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})