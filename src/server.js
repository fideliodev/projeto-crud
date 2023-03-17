const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose');


//não me pergunte o que é isso
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
  })

 

//const db = require('./database/index')
const routeS = require('./routes/index')
//definindo as rotas
app.use('/', routeS)


//db conectar
mongoose.connect('mongodb://localhost:27017/projeto-crud')
const db = mongoose.connection
db.once('open', () => {
    console.log('Bancos de dados conectado!  ')
})

db.on('error', console.error.bind(console, 'erro de conexão'))



//criação de schemas

/* const register = new Model({
    name: "André",
    age: 16,
    email: "teste@teste.com",
    password: "teste"
  })


  register.save()

*/

//definindo o template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


//arquivos estaticos | publicos

//defindindo arquivos publicos
const publicFolder = path.join(__dirname, 'public')
const expressPublic = express.static(publicFolder)
app.use(expressPublic)


//definindo arquivos estaticos
const StaticFolder = path.join(__dirname, 'views')
const expressStatic = express.static(StaticFolder)
app.use(expressStatic)

//habilita o servidor a receber dados vias posts(formularios)
app.use(express.urlencoded({extends: true}))




//Porta em que o servidor vai rodar
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Servidor ligado: http://127.0.0.1/${port}`))
