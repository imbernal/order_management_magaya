let Product = require('../models/Product');

exports.getAllProducs = async ( req , res ) => {

    try {

        let productData = await Product.find({});
        res.json( productData );
        
    } catch (error) {
        console.log("Error: " , error);
        res.json( error );
    }
};

exports.saveProduct = async ( req , res ) => {

    try {

        const {
            description,
            price,
            weight,
            order
        } = req.body;
    
        let product = new Product({
            description,
            price,
            weight,
            order
        });
   
        await product.save();

        res.json(product);
        
    } catch (error) {
        console.log("Error: " , error);
        res.json(error);
    }
};