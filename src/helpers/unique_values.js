/**
 * Functions to autoincrement order's number and product's ID
 */



exports.orderNumber = function* () {
    
    let orderNumber = 0;

    while(true){
        yield orderNumber;
    }
}

exports.productId = function* () {
    
    let productId = 0;

    while(true){
        yield productId++;
    }
}