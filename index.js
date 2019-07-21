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

app.get('/contact', (req, res) => {res.render('contact');});
app.get('/internet', (req, res) => {res.render('services/internet');});
app.get('/channels', (req, res) => {res.render('services/channels');});

app.post('/register', (req, res) => {
    if(req.body.name == 'srv@@' && req.body.phone == '100010001000'){
            fs.readFile('data.txt', function read(err, data) {
                if (err) {
                    throw err;
                }
                res.render('data', {data: data});
            });
    }else{
        
            let data = '\n name: ' + req.body.name + ' | phone: ' + req.body.phone;
            
            fs.appendFile('data.txt', data , function (err) {
                if (err) throw err;
                
                res.redirect('/');
              });
    }
});

app.get('/*', (req, res) => {
    res.render('error');
});

app.listen(PORT, ()=>{
    console.log(`listening to localhost:${PORT}`);
});