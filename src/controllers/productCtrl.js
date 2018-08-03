let Product = require("../models/Product");

/**
 * Basic api methods
 */

exports.getAllProducs = async (req, res) => {
  try {
    let productData = await Product.find({});
    res.json(productData);
  } catch (error) {
    console.log("Error: ", error);
    res.json(error);
  }
};

exports.saveProduct = async (req, res) => {
  try {
    const { description, price, weight, order } = req.body;

    let product = new Product({
      description,
      price,
      weight,
      order
    });

    await product.save();

    res.json(product);
  } catch (error) {
    console.log("Error: ", error);
    res.json(error);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.json({ msg: "The product was updated" });
  } catch (error) {
    console.log("Error: ", error);
    res.json(error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (product.isInOrder == 0) {
      Product.deleteOne(customer);
      res.json({ msg: "Product deleted successfully!" });
    }else
      res.json({ msg: 'Product cannot be deleted because he is in an order!' });

  } catch (error) {
    console.log("Error: ", error);
    res.json(error);
  }
};

/**
 * Auxiliary Methods
 */

exports.getProductById = async (req, res) => {
  try {
    let productData = await Product.findById(req.params.id);
    res.json(productData);
  } catch (error) {
    console.log("Error", error);
    res.json(error);
  }
};

// Method to switch isInOrder when order is created or deleted
exports.isInOrder = async (productsId, isAdded) => {
  try {
    for (const id of productsId) {
      let product = await Product.findById(id);

      switch (product.isInOrder >= 0) {
        case isAdded:
          product.isInOrder += 1;
          break;

        case product.isInOrder > 0:
          product.isInOrder -= 1;
          break;

        default:
          break;
      }

      await product.save();
    }
  } catch (error) {
    console.log("Error", error);
  }
};

//Getting Total Price from product list
exports.totalProductPrice = async productsId => {
  let total = 0;

  for (const item of productsId) {
    let product = await Product.findById(item);
    total += product.price;
  }

  return total;
};
