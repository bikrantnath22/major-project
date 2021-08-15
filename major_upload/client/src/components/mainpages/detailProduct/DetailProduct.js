import React, {useContext, useState, useEffect} from 'react'
import {useParams,useLocation} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utlis/productItem/ProductItem';
import ProductItem1 from '../utlis/productItem/ProductItem1';
import moment from 'moment';
import axios from 'axios'








function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    // const addCart =state.userAPI.addCart
    const [detailProduct, setDetailProduct] = useState([])
    const [data,setData] = useState([])
    const [token] = state.token
   
    // console.log(detailProduct)
    const location = useLocation()

    useEffect(() =>{
       
        console.log('re render')
        if(params.id){

            products.forEach(product => {
                if(product._id === params.id) setDetailProduct(product)
            })
        }
    },[params.id, products])

    if(detailProduct.length === 0) return null;

  


  
    
    
    return(
        <>
            <div className="detail">
                <img src={detailProduct.images.url} alt="" />
                <div className="box-detail">
                   
                        <h2>{detailProduct.title}</h2>
                        {/* <h6> {detailProduct.product_id}</h6> */}
                    
                    {/* <span>Price-USD{detailProduct.price}</span> */}
                    <p>Abouts-{detailProduct.description}</p>
                    <h5>Location-{detailProduct.location}</h5>
                   
                    <p>
                    Available from <br />{" "} 
                {moment(new Date(detailProduct.startDate)).format("MMMM Do YYYY,")}
                </p>
                

                    
                    
                  

                    
                    
                  
                    

                </div>
            </div>
            <div className="products1">
                        {
                           detailProduct.Rooms.map(Room=>{
                                return  <ProductItem1 key={Room._id} product={Room} 
                                
                               /> 
                              
                            })
                        }
            </div>
            {/* <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,products._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
           */}
            <div>
                   
                    <h2 >
                        Related  Hotels
                    </h2>
                    <div className="products">
                        {
                            products.map(product=>{
                                return product.category ===detailProduct.category
                                 ? <ProductItem key={product._id} product={product} /> :null
                            })
                        }
                    </div>
            </div>

        </>
        
    )
}
export default DetailProduct