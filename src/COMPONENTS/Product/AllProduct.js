import React from 'react'
import ProductCard from './ProductCard'

import './AllProduct.css'
const AllProduct = ({products}) => {
    return (
        <div className='allproducts'>
            <h1 style={{fontWeight:700 , margin:8,display:'flex' ,fontSize:"24px"}}>{products.length} Products</h1>
            <div className='products'>
                {
                    products.map((item,index) => {
                        // console.log(item);
                        return (
                            <ProductCard data={item} key={index}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AllProduct