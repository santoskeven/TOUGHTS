const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

const app = express()

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

const conn = require('./db/conn')

//ROTAS
const authRoutes = require('./router/auth')
const toughtsRoutes = require('./router/toughts')

app.use(session({
    name: 'session',
    secret: 'meu segredo',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function() {},
        path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    cookie: {
        secure: false,
        maxAge: 3600000,
        httpOnly: true
    }
}))

app.use(flash());

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static('/public'))

app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session;
        return next();
    }

    next(); // Apenas segue para o próximo middleware
});

app.use((req, res, next) => {
    if (req.session) {
        req.session.cookie.maxAge = 3600000; // Renova a sessão a cada requisição
    }
    next();
});

app.use((req, res, next) => {
    console.log(`Path: ${req.path}, Sessão: ${req.session.userid}`);
    next();
});

app.use('/', authRoutes);
app.use('/toughts', toughtsRoutes);


conn.
sync().
then(() => {
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
}).catch((err) => {console.log(err)});
