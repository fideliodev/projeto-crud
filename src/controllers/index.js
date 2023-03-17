function index(request, response) {
   
    response.render('index', {
       
        title: 'Home'
    })
}

module.exports = {
    index
}