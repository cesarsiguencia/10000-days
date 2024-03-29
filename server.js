const express = require('express')
const helpers = require('./assets/script/helpers')
require('dotenv').config()

const path = require('path')

const sequelize = require ('./controller/config/connections')

const exphbs = require('express-handlebars')

const hbs = exphbs.create({helpers})

const routes = require('./controller/routes')

const app = express()

const PORT = process.env.PORT || 4000

const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'super secret password',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })

}

app.use(session(sess))
app.use(express.static('assets'))
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
//middleware for json and it's key/values
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(routes)

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
})