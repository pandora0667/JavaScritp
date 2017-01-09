/**
 * Created by jusk2 on 2017-01-09.
 * First Seong Won Homepage
 */

const express = require('express');
const session = require('express-session');
const pug = require('pug');

const app = express();
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session);


app.use(bodyParser.urlencoded({ extended: false })); // post 방식
app.set('view engine', 'pug');
if (app.get('env') === 'development') {
    app.locals.pretty = true;
}
app.use(session({
    secret: 'sgggrgtretwehfdh',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

app.get('/', function (req, res) {
    res.send(`
            <!DOCTYPE html>
            <html lang="en"> 
            <head>
            <meta charset="UTF-8">
                <h1>Wisoft Seminar for Java Script</h1>
                <p>
                    <ul><li>Created By LEE SEONG WON</li></ul>
                </p>
                <p>
                    <ul><li>Production date 2017.01.09 V1.0</li></ul>
                </p>
                <p>
                    <ul><li>Hanbat National University Department of Information and Communication Engineering</li></ul>
                </p>
                <p>
                <a href="/login">Sign in</a><br>
              `);

});

app.get('/test', function (req, res) {
    res.render('test');
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login', function (req, res) {
    const admin = {
        userId: 'jusk2',
        userPwd: '01030250667',
    };
    const userName = req.body.username;
    const userPassword = req.body.password;

    if(admin.userId === userName && admin.userPwd === userPassword) {
      //  return req.session.save(function () {} // 이건 세션 정보 저장?
            res.redirect('/welcome');
    }
    res.send('Login failed <a href="/login">return login</a>');

});

app.get('/welcome', function (req, res) {
    res.send('TEST');
});

app.listen(3000, function () {
    console.log('Connecting 3000 Port');
});