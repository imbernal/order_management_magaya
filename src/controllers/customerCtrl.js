let Customer = require("../models/Customer");
let Order = require("../models/Order");

/**
 * Basic api methods
 */
exports.getAllCustomer = async (req, res) => {
  try {
    let customerData = await Customer.find({});
    res.json(customerData);
  } catch (error) {
    console.log(error);
  }
};

exports.saveCustomer = async (req, res) => {
  try {
    let customer = new Customer({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      shipping_address: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country
      },
      isInOrder: req.body.isInOrder
    });

    await customer.save();

    res.json(customer);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    let customerData = await Customer.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.json(customerData);
  } catch (error) {
    console.log("Error: ", error);
    res.json(error);
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id);

    if (customer.isInOrder == 0) {
      await Customer.remove(customer);
      res.json({ msg: "Custometer deleted successfully!" });
    } else
      res.json({
        msg: `Customer ${
          customer.name
        } cannot be deleted because he has an order!`
      });
  } catch (error) {
    console.log("Error", error);
    res.json(error);
  }
};

/**
 * Auxiliary Methods
 */

exports.getCustomerByOrderId = async (req, res) => {
  try {
    let orderData = await Order.findById(req.params.orderId);
    let customerData = await Customer.findById(orderData.customer);
    res.json(customerData);
  } catch (error) {
    console.log(error);
    res.json({ msg: "Customer not found!!!" });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id);
    res.json(customer);
  } catch (error) {
    console.log("Error", error);
    res.json({ error });
  }
};

// Method to switch isInOrder when order is created or deleted
exports.isInOrder = async (customerId, isAdded) => {
  try {
    let customer = await Customer.findById(customerId);

    switch (customer.isInOrder >= 0) {
      case isAdded:
        customer.isInOrder += 1;
        break;

      case customer.isInOrder > 0:
        customer.isInOrder -= 1;
        break;

      default:
        break;
    }

    await customer.save();
  } catch (error) {
    console.log("Error", error);
  }
};
