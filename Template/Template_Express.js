/**
 * Created by jusk2 on 2017-01-03.
 */

var express = require('express');
var app = express();
app.set = express('view engine', 'jade');
app.set('views', './views');

app.get('/template', function (req, res) {
    res.render('temp');
});