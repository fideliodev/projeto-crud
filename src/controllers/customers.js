//controller é uma funcao que é adicionada na rota


//fc que vai add un usu
//importar o schema

const CustomersModel = require('../model/customers')

const { crypto } = require ('../utils/password')
const tituloPadrao = 'Cadastro-Cliente'
function index(request, response) {
   
    response.render('register', {
       
        title: tituloPadrao,
    })
}

async function listUsers(request, response){

    //buscar todos os usuarios do db
    const users = await CustomersModel.find()
    
    response.render('listUsers', {
        title: 'Listagem de usuarios',
        users,
    })
}

async function indexEdit(req, res){
    const { id } = req.query

  const user = await CustomersModel.findById(id)
    res.render('edit', {
      title: 'Editar Usuario',
      user,
    })
}

async function edit (req, res){
    const{
        name,
        age,
        email,
    } = req.body

    const { id } = req.params

    const user = await CustomersModel.findById(id)   
    
    user.name = name
    user.age = age
    user.email = email
    user.save()

    res.render('edit', {
        title: 'Editar Usuario',
        user,
        message: 'Usuario alterado com sucesso!',

    })
}

async function remove (req, res){

    const { id } = req.params

 const remove = await CustomersModel.deleteOne({_id: id})   
if(remove.ok){
    res.redirect('/registrar')
    res.redirect('/list')

}

}



async function add(req, res){
    const{
        name,
        age,
        email,
        password,
    } = req.body

const passwordCrypto = await crypto(password)

    const register = new CustomersModel({
        name,
        age,
        email,
        password: passwordCrypto,
    })

    register.save()

    res.render('register', {
        title: tituloPadrao,
        message: 'Cadastro realizado com sucesso!'
    })
    
}



module.exports = {
    listUsers,
    index,
    add,
    indexEdit,
    edit,
    remove,
    
}
