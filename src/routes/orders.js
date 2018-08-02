const orderCtrl =  require('../controllers/orderCtrl');

module.exports = app => {
    

    /**
     * Routes:
     * Get All Orders
     * Save Order (param-> OrderObj)
    */
    app.route('/orders')
        .get( orderCtrl.getAllOders )
        .post( orderCtrl.saveOrder );


    /**
     * Routes:
     * Get Order by id
     * Delete Order
     * Update Order
     * Param -> id
    */
    app.route('/order/:id')
        .get( orderCtrl.getOrderById )
        .put( orderCtrl.updateOrder )
        .delete( orderCtrl.deleteOrder );
   
}