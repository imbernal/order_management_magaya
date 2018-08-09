let Order = require("../models/Order");
let customerCtrl = require("./customerCtrl");
let productCtrl = require("./productCtrl");

/**
 * Basic api methods
 */
exports.getAllOders = async (req, res) => {
  try {
    
    let orderData = await Order.find({});
 
    res.send(orderData);

  } catch (error) {

    console.log("Error: ", error);
    res.json(error);
  }
};

exports.saveOrder = async (req, res) => {
  try {
    let order = new Order({
      payment_type: req.body.payment_type,
      shipping_address: {
        street: req.body.street,
        number: req.body.number,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country
      },
      customer: req.body.customer,
      products: req.body.products
    });

    //Getting Total Price
    order.total = await productCtrl.totalProductPrice(order.products);

    await order.save();

    //Find Customer and update isInOrder property
    customerCtrl.isInOrder(order.customer, true);

    //Find Product and update isInOrder property
    productCtrl.isInOrder(order.products, true);

    res.json( order );
  } catch (error) {
    console.log("Error: ", error);
    res.json(error);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    let orderData = await Order.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.json(orderData);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.deleteOrder = async (req, res) => {
  try {

    let order = await Order.findById(req.params.id);
    await Order.deleteOne(order);

    //Find Customer and update isInOrder property
    customerCtrl.isInOrder(order.customer, false);

    res.json({ msg: "I was deleted successfully!" });
  } catch (error) {
    console.log("Errror: ", error);
    res.json({ msg: "The order couldn't be deleted" });
  }
};

/**
 * Auxiliary Methods
 */

exports.getOrderById = async (req, res) => {
  try {
    let orderData = await Order.findById(req.params.id);
    res.json(orderData);
  } catch (error) {
    console.log("Error", error);
    res.json(error);
  }
};

exports.getTotalOrderPrice = async (req, res) => {
  try {
    let orders = await Order.find({});

    const sum = orders
      .map(item => item.total)
      .reduce((prev, curr) => prev + curr);
      
    res.json(sum);
  } catch (error) {
    console.log("Error", error);
    res.json(error);
  }
};
