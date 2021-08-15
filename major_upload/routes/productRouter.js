const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')
// const auth = require('../middleware/auth')
// const authAdmin = require('../middleware/authAdmin')


router.route('/products')
    .get(productCtrl.getProducts)
    .post(productCtrl.createProduct)
    
router.route("/search-listings")   
    .post(productCtrl.searchListings);



router.route('/products/:id')
    .delete(productCtrl.deleteProduct)
    .put(productCtrl.updateProduct)
    

// add room
router.route('/products/room/:products_id').
    post(productCtrl.addRoom)

    router.delete('/room/:hotel_id/:room_id', productCtrl.removeRoom);

   
// router.patch('/products/:id', productCtrl.reviews)
    
    
    
    
    
    


module.exports = router
