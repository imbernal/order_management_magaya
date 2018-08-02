const orderCtrl =  require('../controllers/orderCtrl');

module.exports = app => {
    
    app.route('/orders')
        .get( orderCtrl.getAllOders )
        .post( orderCtrl.saveOrder );


    app.route('/order/:id')
        .delete( orderCtrl.deleteOrder )
    
}