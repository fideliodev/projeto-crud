const mongoose = require('mongoose');

function connect(){
mongoose.connect('mongodb://localhost:27017', { useUnifiedTopology: true })
const db = mongoose.connection
db.once('open', () => {
    console.log('Inicializando...')
    console.log('Banco de dados conectado')
})

db.on('error', console.error.bind(console, 'error: '))
}

module.exports = {
    connect
}