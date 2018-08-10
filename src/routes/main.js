const mainCtrl = require("../controllers/mainCtrl");

module.exports = app => {
  
//---------------******Statistics*****---------------------


  //Top Customer
  app.route("/top-customers")
    .get(mainCtrl.getTopCustomer);

  //Top Products
  app.route("/top-products")
    .get(mainCtrl.getTopProducts);

  //General Statistics
  app.route("/general-statistics")
    .get(mainCtrl.getGeneralStatistics);
};
