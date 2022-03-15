import React, {useState, useEffect} from 'react';
import {getToken} from '../Utils/Common';
import axios from 'axios';

function Products() {
    const token = getToken();

    const [products, setProducts] = useState([]);
    
    useEffect(() => {
     axios.get('/baidang')
       .then( (res) => {
           setProducts(res.data)
           console.log(res.data);
           console.log(token);
       })
       .catch((err) => {
         console.log(err);
       })
   }, [])
  return (
      <div>
    <div>Products</div>
    <div>
        {products && products.map( (product)  => {
            return(
                <p>
                    {product.TenTK}
                </p>
            )
        })}
    </div>
    </div>
    
  )
}

export default Products