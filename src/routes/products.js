const productCtrl = require("../controllers/productCtrl");

module.exports = app => {
  /**
   * Routes:
   * Get All Products
   * Save Product (param-> ProductObj)
   */
  app.route("/products")
    .get(productCtrl.getAllProducs)
    .post(productCtrl.saveProduct);

  /**
   * Routes:
   * Get Product by id
   * Delete Product
   * Update Product
   * Param -> id
   */
  app.route("/product/:id")
    .get(productCtrl.getProductById)
    .put(productCtrl.updateProduct)
    .delete(productCtrl.deleteProduct);

  /**
   * Auxiliary Routes
  */
  //Get Products by a OrderID
  app.route("/products-order/:orderId")
    .get(productCtrl.getProductByOrderId)

};
