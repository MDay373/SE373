const express = require("express")
const hbs = require('hbs');

const app = express();

app.set('view engine', hbs);

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));


/* GET home page. */
app.get('/', (req, res) => {
    res.render('index.hbs');
});

app.post('/gridDisplay', (req, res) => {    
    res.render('gridDisplay.hbs',{        
        selectedValue: req.body.myList
    });
});

function randomNumber(){
    var color = ((1<<24)*Math.random()|0).toString(16).toUpperCase();
    return color;
  }

hbs.registerHelper('selector', ()=>{
    var selectorValues = [3,4,5,10,20]
    var strBuild = '<form action = "/gridDisplay" method="POST">';
    strBuild += '<select name = myList>'
    for(let i =0; i < selectorValues.length; i++){
      strBuild += `<option value="${selectorValues[i]}" name="blah">${selectorValues[i]}</option>`
    }
    strBuild += '</select>'
    strBuild += '<input type="submit" value="Submit">'
    strBuild += '</form>'
    return new hbs.handlebars.SafeString(strBuild);
})

hbs.registerHelper('customGrid',(rowCount)=>{
    var gridStr = '<table>'
    gridStr += '<tbody>'
    for(i = 0; i < rowCount; i++){
        gridStr += '<tr>'
        for(j = 0; j < rowCount; j++){
            var randNum = randomNumber();            
            gridStr += `<td style="background-color: #${randNum};">${randNum}<br/><span style="color:#ffffff;">${randNum}</span></td>`
        }
        gridStr += '</tr>'
    }

    gridStr += '</table>'
    gridStr += '</tbody>'

    return new hbs.handlebars.SafeString(gridStr);
})

hbs.registerHelper('errorGrid',(min, max) =>{
    var randomNum = Math.floor(Math.random()*(max-min+1)+min);
    var classes = ["still", "rotate", "shrink"]
    var divString = '';
    for(i = 0; i < randomNum; i++){
        var rand = Math.floor(Math.random()*(2-0+1)+0);
        var randClass = classes[rand];
        divString += `<div class="${randClass}">404</div>`
    }
    return new hbs.handlebars.SafeString(divString);
})

app.use((req,res,next)=>{
    res.render('notFound.hbs');
});


app.listen(3000, () =>{
    console.log("Server is running on Port:3000");
})