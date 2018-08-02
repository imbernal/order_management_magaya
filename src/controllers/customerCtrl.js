let Customer = require('../models/Customer');


/**
 * Basic api methods
 */
exports.getAllCustomer = async ( req , res ) => {

      try{
            let customerData = await Customer.find({});
            res.json( customerData );
      }
      catch( error ){
            console.log(error);
      }

};

exports.saveCustomer = async ( req , res ) => {

      try {
            let customer = new Customer({
                  name  : req.body.name,
                  phone : req.body.phone,
                  email : req.body.email,
                  shipping_address: {
                        street : req.body.street,
                        number : req.body.number,
                        city   : req.body.city,
                        state  : req.body.state,
                        zip    : req.body.zip,
                        country: req.body.country
                  },
                  isInOrder: req.body.isInOrder
            });

            await customer.save();

            res.json({ customer });
            
      } catch (error) {
            console.log(error);
            res.json(error);
      }

};

exports.updateCustomer = async ( req , res ) => {

      try {

           await Customer.findByIdAndUpdate(req.params.id , { $set: req.body });
           res.json({ msg: "The Customer was updaed!!!" });
            
      } catch (error) {
            console.log("Error: " , error);
            res.json(error);
      }

}

exports.deleteCustomer = async ( req , res ) => {

      try {
            let customer = await Customer.findById( req.params.id );

            if(customer.isInOrder == 0){
                  Customer.deleteOne(customer);
                  res.json({ msg: "Custometer deleted successfully!" });
            }else
                  res.json({ msg: `Customer ${customer.name} cannot be deleted because he has an order!` })
            
      } catch (error) {
            console.log("Error" , error);
            res.json(error);
      }
}


/**
 * Auxiliary Methods
*/

exports.getCustomerById = async ( req , res ) => {

      try {
            let customer = await Customer.findById(req.params.id);
            res.json({ customer });
            
      } catch (error) {
            console.log("Error" , error);
            res.json({ error });
      }

}

// Method to switch isInOrder when order is created or deleted
exports.isInOrder = async (customerId , isAdded ) => {
      
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
            console.log("Error" , error);
      }
      
}