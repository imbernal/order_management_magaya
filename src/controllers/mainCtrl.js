let Customer = require("../models/Customer");
let Product = require("../models/Product");
let Order = require("../models/Order");

exports.getTopCustomer = async (req, res) => {

  try {
    let topCustomer =  await Customer.find()
      .select("name isInOrder")
      .populate("orders")
      .limit(5)
      .sort({ isInOrder: -1 })
      .exec();

    res.json(topCustomer);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.getTopProducts = async (req , res) => {
  try {
    let data =  await Product.find()
      .select("description isInOrder")
      .populate("orders")
      .limit(5)
      .sort({ isInOrder: -1 })
      .exec();

    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

exports.getGeneralStatistics = async (req , res) => {
  try {

    let data = {};

    // Getting all info about Customers
    let customers = await Customer.find().countDocuments().exec();
    
    //Getting Products
    let products = await Product.find().countDocuments().exec();

    //Getting Orders
    let orders = await Order.find();
      // Getting Total amout in orders
    const total_amount = orders
    .map(item => item.total)
    .reduce((prev, curr) => prev + curr);

    data = {
      'total_customers': customers,
      'total_products' : products,
      'orders' : {
        'total_orders' : orders.length,
        'total_amount' : total_amount   
      }
    }

    res.json(data);
    
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}
