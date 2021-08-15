const Products = require('../models/productModel');
const mongoose = require('mongoose');
const Room = require('../models/roomModel');
const { v4: uuidv4 } = require('uuid');
const { compareSync } = require('bcrypt');
// const mongoose = require('mongoose');

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString } //queryString = req.query

        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete (queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)



        this.query.find(JSON.parse(queryStr))

        return this;
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }
    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }

}

function findAndUpdateArray(rooms, room_id) {
    return rooms.filter(room => { return room._id != room_id })
}
const productCtrl = {

    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Products.find().populate('Rooms'), req.query)
                .filtering().sorting().paginating()

            const products = await features.query

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addRoom: async (req, res) => {
        try {
            const { products_id } = req.params;
            console.log(products_id)
            const unique_room_id = new mongoose.Types.ObjectId()
            console.log(req.body)
            const roomObject = {
                title: req.body.room.title,
                price: req.body.room.price, description: req.body.room.description,createDate:new Date(req.body.room.createDate),outDate:new Date(req.body.room.outDate),hotelName:req.body.room.hotelName,sold:req.body.room.sold, images: req.body.images,
                _id: unique_room_id,
                product_id: products_id,
                
            }
           
            
            const room = new Room(roomObject);
            //check if room title already exist  
            //condition is checked based on title and product_id 
            // if any document is rooms collection has the title and product_id matched it wont be added
            const findIfRoomExist = await Room.findOne({ title: req.body.title, product_id: products_id });
            if (findIfRoomExist) return res.status(400).json({ msg: "Room already exist" })
            // to update the array in our product collection
            Products.findByIdAndUpdate(products_id, { $push: { Rooms: unique_room_id } }, (err, updatedProduct) => {
                if (!err) console.log('Room added');
            })
            //when all conditions and updates are made we save the room to rooms collection
            room.save()
                .then((savedRoom) => {
                    res.send(savedRoom)
                })
                .catch(err => {
                    console.log(err);
                    res.send(err)
                })
        } catch (err) {
            console.log(err);
        }

    },

    removeRoom: async (req, res) => {
        try {
            const {hotel_id , room_id} = req.params ;
             const deletedRoomFromHotel = await Products.findOneAndUpdate({ _id: hotel_id }, {
               $pull : {rooms : room_id} 
            },
            {
              new : true
            }); 
        
            if(deletedRoomFromHotel){
              await Room.findByIdAndDelete(room_id)
              .exec((err,deletedRoom) => {
                if(err || !deletedRoom) {
                  return res.status(402).json({msg:'forbidden'})
                }
              })
            }
            return res.status(200).json({msg:'success'})

        
          } catch (err) {
              console.log(err)
            // res.status(400).json({ success: false, err });
          };
    },

    createProduct: async (req, res) => {
        try {
            const { product_id, title, price, description, content, images, category, location, startDate, endDate, room } = req.body;
            if (!images) return res.status(400).json({ msg: "No image upload" })


            const product = await Products.findOne({ product_id })
            if (product)
                return res.status(400).json({ msg: "This  product already exists." })

            const newProduct = new Products({
                product_id, title, price, description, content, images, category, location: location.toLowerCase(), startDate:new Date(startDate), endDate:new Date(endDate), room
            }
            )

            await newProduct.save()
            res.json({ msg: "Created a product" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted a Product" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { title, price, description, content, images, category, location, startDate, endDate, room} = req.body;
            if (!images) return res.status(400).json({ msg: "No image upload" })

            await Products.findOneAndUpdate({ _id: req.params.id }, {
                title, price, description, content, images, category, location: location.toLowerCase(), startDate, endDate, room
            }
            )

            res.json({ msg: "Updated a Product" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
  
      
    searchListings : async (req, res) => {
        const { search, date } = req.body;
        // console.log(search, date);
        // console.log(date);
        const startDate = date.split(",");
        // console.log(startDate);
        let result = await Products.find({
            location:search,
             $and: [ { startDate: { $lte: startDate[1] } }, { endDate: { $gte: startDate[1] } } ] 
           
         
        })
          .populate('Rooms')
          .exec();
        // console.log("SEARCH LISTINGS", result);
        res.json({startDate:startDate[0],endDate:startDate[0],result});
    },
    // reviews: async(req, res) => {
    //     try {
    //         const {rating} = req.body

    //         if(rating && rating !== 0){
    //             const product = await Products.findById(req.params.id)
    //             if(!product) return res.status(400).json({msg: 'Product does not exist.'})

    //             let num = product.numReviews
    //             let rate = product.rating

    //             await Products.findOneAndUpdate({_id: req.params.id}, {
    //                 rating: rate + rating, numReviews: num + 1
    //             })

    //             res.json({msg: 'Update success'})

    //         }

    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // }
    
    
    
    
    
        
    
}
module.exports = productCtrl