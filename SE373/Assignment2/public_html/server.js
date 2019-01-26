var express = require("express")
var hbs = require('hbs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', hbs);
app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index.hbs');
});

app.get('/about', (req, res) => {
    res.render('about.hbs');
});

app.get('/form', (req, res) => {
    res.render('form.hbs');
});

app.post('/result', (req, res) => {
    res.render('result.hbs', {
        name: req.body.username,
        email: req.body.emailaddress,
        comments: req.body.comments
    })
});

app.listen(3000, () => {
    console.log('Server is up at localhost:3000');
});