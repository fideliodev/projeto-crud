const router = require('express').Router()

//controller
const CustomersController = require('../controllers/customers')
const IndexController = require('../controllers/index')


//rota que vai criar os dados

//registro
router.get('/', IndexController.index)
router.get('/registrar', CustomersController.index  )
//rota que vai receber os dados

router.post('/registrar/add', CustomersController.add)

module.exports = router


//listar

router.get('/list', CustomersController.listUsers)


//editar
router.get('/edit', CustomersController.indexEdit)
router.post('/edit/:id', CustomersController.edit)


//remover
router.get('/remove/:id', CustomersController.remove)

/*(request, response) => {
   
    response.render('register', {
       
        title: 'registrar-se'
    })
} */