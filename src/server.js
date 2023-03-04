const express = require('express')
const path = require('path')
const db = require('./database')
const app = express()

db.connect()

//definindo o template engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

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


//rotas

app.get('/', (request, response) => {
   
    response.render('index', {
       
        title: 'inicio'
    })
} )

//direcionar para algum erro
app.use((request, response) => {
    response.send('Pagina não encontrada')
})

//qual porta que ele quer rodar
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Servidor ligado: http://127.0.0.1/${port}`))
