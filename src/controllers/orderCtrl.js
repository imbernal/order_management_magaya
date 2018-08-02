let Order = require('../models/Order');
let customerCtrl = require('./customerCtrl');
let productCtrl = require('./productCtrl');

/**
 * Basic api methods
*/
exports.getAllOders = async ( req , res ) => {
   
    try {

        let orderData = await Order.find({});

        res.json( orderData );
        
    } catch (error) {
        console.log("Error: " , error);
        res.json( error )
    }
}

exports.saveOrder = async ( req , res ) => {

    try {

        let order =  new Order({
            payment_type : req.body.payment_type,
            total : req.body.total,
            shipping_address: {
                street : req.body.street,
                number : req.body.number,
                city   : req.body.city,
                state  : req.body.state,
                zip    : req.body.zip,
                country: req.body.country
            },
            customer : req.body.customer,
            product  : req.body.product,
        });
    
        await order.save();

        //Find Customer and update isInOrder property
        customerCtrl.isInOrder(order.customer , true);

        //Find Product and update isInOrder property
        productCtrl.isInOrder(order.customer , true);
        
        res.json({ order });
        
    } catch (error) {
        console.log("Error: " , error);
        res.json( error )
    }
};

exports.updateOrder = async ( req , res ) => {

    try {

        await Order.findByIdAndUpdate( req.params.id , { $set: req.body } );
        res.json({ msg: "The Order was updated!!" });
        
    } catch (error) {
        console.log(error);
        res.json(error);
    }

}

exports.deleteOrder = async ( req , res ) => {

    try {

        let order = await Order.findById(req.params.id);

        await Order.deleteOne(order);
  
        //Find Customer and update isInOrder property
        customerCtrl.isInOrder(order.customer , false);

        res.json({ msg: "I was deleted successfully!"  });
          
    } catch (error) {
          console.log("Errror: " , error);
          res.json( { msg: "The order couldn't be deleted" } );
    }     
}


/**
 * Auxiliary Methods
 */

exports.getOrderById = async ( req , res ) => {
    try {

        let orderData = Order.findById(req.params.id);
        res.json(orderData) ;
        
    } catch (error) {
        console.log("Error" , error);
        res.json(error);
    }
}
