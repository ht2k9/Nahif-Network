const PORT = process.env.PORT || 8080;

const express = require('express');

const app = express();

app.set('view engine' , 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/:channel', (req, res) => {
    res.render(req.params.channel);
});



app.listen(PORT, ()=>{
    console.log(`listening to localhost:${PORT}`);
});