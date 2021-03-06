/**
 * Created by jusk2 on 2017-01-08.
 */

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();

var users = [
    {
        username: 'jusk2',
        password: '123',
        displayName: "SeongWon"
    }
];

app.use(session({
    secret: 'sgggrgtretwehfdh',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
 }));

app.use(bodyParser.urlencoded({ extend: false}));

app.get('/auth/login', function (req, res) {
    var output  = `
        <h1>Login</h1>
        <form action="/auth/login" method="post">
            <p>
                <input type="text" name="username" placeholder="username">
            </p>
            <p>
                <input type="text" name="password" placeholder="password">
            </p>
            <p>
            <input type="submit">
            </p>
        </form>`;

    res.send(output);
});

app.post('/auth/login', function (req, res) {
    var uname = req.body.username;
    var pwd = req.body.password;

    for(var i=0; i<users.length; i++) {
        var user = users[i];

        if(uname === user.username && pwd === user.password) {
            req.session.displayName = user.displayName;
            return req.session.save(function () {
                 res.redirect('/welcome');
            });
        }
    }
    res.send('Who are you? <a href="/auth/login">login</a>');
});

app.get('/count', function (req, res) {
    if(req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send('Count : ' +req.session.count)
});

app.get('/welcome', function (req, res) {
    if(req.session.displayName) {
        res.send(`
            <h1>Hello, ${req.session.displayName}</h1>
            <a href="/auth/logout">Logout </a>
            `);
    } else{
        res.send(`
            <h1>Welcome</h1>
            <ul>
              <li><a href="/auth/login">Login </a></li>
              <li><a href="/auth/register">Register </a></li> 
            </ul>
            `);
    }
});

app.get('/auth/logout', function (req, res) {
    delete req.session.displayName;
    res.redirect('/welcome');
});

app.get('/auth/register', function (req, res) {
    var output = `
        <form action="/auth/register" method="post">
          <p>
                <input type="text" name="username" placeholder="username">
          </p>
          <p>
                <input type="text" name="password" placeholder="password">
          </p>
          <p>
                <input type="text" name="displayName" placeholder="displayName">
          </p>
          <p>
                <input type="submit">
          </p>
        </form>
        `
    res.send(output);
});

app.post('/auth/register', function (req, res) {
    const user = {
        username:req.body.username,
        password:req.body.password,
        displayName:req.body.displayName
    };
    users.push(user);
    req.session.displayName = req.body.displayName;
    req.session.save(function () {
        res.redirect('/welcome');
    });
});

app.listen(3003, function () {
    console.log('Connecting Port 3003')
});
