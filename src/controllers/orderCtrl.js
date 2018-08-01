let Order = require('../models/Order');

exports.getAllOders = ( req , res ) => {
   
    Order.find({})
         .then( data => res.json({ data }) )
         .catch( () => res.status(400).send());
}

exports.saveOrder = ( req , res ) => {

    const {
        // shipping_address,
        payment_type,
        total
    } = req.body;

    let order =  new Order({
        // shipping_address,
        payment_type,
        total
    });

    order.save()
    .then( data => res.send(data) )
    .catch( () => res.status(400).send() )


}