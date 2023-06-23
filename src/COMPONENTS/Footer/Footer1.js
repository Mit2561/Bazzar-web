import React from 'react'
import product_images from '../../ASSETS/product_images.png'
import './Footer1.css'
const Footer1 = () => {
    return (
        <div className='footer1'>
            <div className='left'>
                <img src={product_images} alt='veges' />
            </div>
            <div className='right'>
                <h1>All type of Elcectronics at one place 
                </h1>
                <p>We provide all types of electronics items at good price.
                </p>
            </div>
        </div>
    )
}

export default Footer1