const productCtrl =  require('../controllers/productCtrl');

module.exports = app => {
    app.route('/products')
       .get(productCtrl.getAllProducs)
       .post(productCtrl.saveProduct);
}