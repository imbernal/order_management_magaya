let customerCtrl = require("../controllers/customerCtrl");

module.exports = app => {
  /**
   * Routes:
   * Get All Customers
   * Save Customer (param-> CustomerObj)
   */
  app.route("/customers")
    .get(customerCtrl.getAllCustomer)
    .post(customerCtrl.saveCustomer);

  /**
   * Routes:
   * Get Customer by id
   * Delete Customer
   * Update Customer
   * Param -> id
   */
  app.route("/customer/:id")
    .get(customerCtrl.getCustomerById)
    .put(customerCtrl.updateCustomer)
    .delete(customerCtrl.deleteCustomer);
};
