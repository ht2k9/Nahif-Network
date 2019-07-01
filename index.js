const PORT = process.env.PORT || 8080;

const express = require('express');
const compression = require('compression')
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine' , 'ejs');
app.use(compression());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/:channel', (req, res) => {
    res.render(req.params.channel);
});

app.post('/register', (req, res) => {
    let data = '\n name: ' + req.body.name + ' | phone: ' + req.body.phone;
    fs.appendFile('data.txt', data , function (err) {
        if (err) throw err;
        
        res.redirect('/');
      });
});



app.listen(PORT, ()=>{
    console.log(`listening to localhost:${PORT}`);
});