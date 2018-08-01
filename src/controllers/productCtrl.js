let Product = require('../models/Product');

exports.getAllProducs =  ( req , res ) => {

    Product.find({})
        .then( data => res.json({ data }) )
        .catch( res.status(400).send() );

}

exports.saveProduct = ( req , res ) => {

    const {
        description,
        price,
        weight
    } = req.body;


    let product = new Product({
        description,
        price,
        weight
    });

    product.save()
           .then( data => res.json({ data }) )
           .catch( res.status(400).send() );

}