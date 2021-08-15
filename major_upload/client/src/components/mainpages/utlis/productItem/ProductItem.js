import React from 'react'
import { useEffect } from 'react'
import BtnRender from './BtnRender'



function ProductItem({product, isAdmin, deleteProduct, handleCheck,isSearched}) { 
    useEffect(() => {
       if(isSearched===false) {
           sessionStorage.clear('date') ;
       }
    }, [])
    return (
        <div className="product_card">
            {
                isAdmin && <input type="checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
            }
            {product.images &&<img src={product.images.url} alt="" />}

            
                <h2 title={product.title}>{product.title}</h2>
                <h5 location={product.location}>Loaction-{product.location}</h5>
                
                <p>{product.description}</p>      
           

            <span>Start From-Rs{product.price}</span>
          <BtnRender product={product} deleteProduct={deleteProduct} />
            
        </div>
    )
}

export default ProductItem