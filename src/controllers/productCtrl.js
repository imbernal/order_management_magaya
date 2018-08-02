let Product = require('../models/Product');

/**
 * Basic api methods
*/

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

exports.updateProduct =  async ( req , res ) => {

    try {

        await Product.findByIdAndUpdate( req.params.id , { $set: req.body } );
        res.json({ msg: "The product was updated" });
        
    } catch (error) {
        console.log("Error: " , error);
        res.json(error);
    }

}

exports.deleteProduct = async ( req , res ) => {

    try {

        await Product.findByIdAndRemove( req.params.id );
        res.json({ msg: "The product was deleted" });

    } catch (error) {
        console.log("Error: " , error);
        res.json(error);
    }

} 


/**
 * Auxiliary Methods
 */

exports.getProductById = async ( req , res ) => {

    try {

        let productData = await Product.findById( req.params.id );
        res.json(productData);
        
    } catch (error) {
        console.log("Error" , error);
        res.json(error);
    }

} 

// Method to switch isInOrder when order is created or deleted
exports.isInOrder = async (productId , isAdded ) => {
      
    try {
          
          let product = await Product.findById(productId);

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
          
    } catch (error) {
          console.log("Error" , error);
    }
    
}