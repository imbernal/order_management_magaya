let Order = require('../models/Order');
let customerCtrl = require('./customerCtrl');

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
            customer : req.body.customer
        });
    
        await order.save();

        //Find Customer and update isInOrder property
        customerCtrl.isInOrder(order.customer);
        
        res.json({ order });
        
    } catch (error) {
        console.log("Error: " , error);
        res.json( error )
    }
};

exports.deleteOrder = async ( req , res ) => {

    try {

        await Order.findByIdAndRemove(req.params.id);
        res.json({ msg: "I was deleted successfully!"  });
          
    } catch (error) {
          console.log("Errror: " , error);
          res.json( error );
    }     
}