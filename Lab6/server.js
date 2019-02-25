require('./models/db');

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

const employeeController = require('./controllers/employeeController');
var app = express();


app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/', helpers: require("./public/helpers.js").helpers}));
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, '/views/'));
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/employee', employeeController);
app.use(bodyParser.json());

app.get('/', (req, res) => {    
    res.render("employee/addOrEdit",{
        viewTitle: "Enter New Employee"
    });    
});

app.listen(3000, () =>{
    console.log("Server is running on Port:3000");
})

