import React from 'react'
import BtnRender1 from './BtnRender1'
import moment from "moment";



function ProductItem1({product,deleteRoom,date }) {
    // useEffect(() => {
    //     console.log(date)
    // }, [])
    return (
        <div className="product_card1">
             {/* {
                isAdmin && <input type="checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
            }  */}
            {product.images &&<img src={product.images.url} alt="" />}

            
                <h2  title={product.title}>{product.title}</h2>
                {/* <h5 location={product.location}>Loaction-{product.location}</h5> */}
               
                <p>{product.description}</p>
                {/* <h5>{product.hotelName}</h5> */}
                {/* <h5 createDate={product.createDate}>{product.createDate}</h5> */}
                <p>
                From <br />{" "} 
                {moment(new Date(product.createDate)).format("MMMM Do YYYY,")}
                </p>
                <p>
              To <br />{" "}
              {moment(new Date(product.outDate)).format("MMMM Do YYYY,")}
            </p>
               
                
               
               
                
                
                
                
            

            <span>Price-Rs{product.price}</span>
            <BtnRender1 room={product} deleteRoom={deleteRoom} date={date} />
            <br />
        </div>
    )
}

export default ProductItem1