import express from 'express';
import { engine } from 'express-handlebars';

const app = express();
const port = 2202;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, ()=> console.log('app listening on port ', port));

