import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './ProductCard.css'

const ProductCard = ({ data }) => {
  const navigate=useNavigate();
  const [show, setshow] = useState(false)
  const [count, setCount] = useState(1)
  const ProductDiscount = 10
  // const [product,setProduct] = useState(data)
  // setProduct(data)
  // console.log(product)
  // const getproduct_id = () => {
  //   alert(data.id)
  // }
  const addtocart = () => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    console.log(cart);
    let productData = data
    if (cart) {
      // alert('1 item is already added to cart')
      let itemincart = cart.find(item => item.product_id === productData.product_id)
      if (itemincart) {
        cart = cart.map(item => {
          if (item.product_id === productData.product_id) {
            return {
              ...item,
              quantity: item.quantity + count
            }
          }
          else {
            return item
          }
        })
        console.log(cart);
        localStorage.setItem('cart', JSON.stringify(cart))
      }
      else {
        let tempData=productData;
        let imageString="";
        const imageSet=tempData.images;
        tempData.images.forEach(item=> {
            imageString+=item.image;
        });
        tempData.images=imageString
        tempData.quantity=count
        const setImageData=tempData
        cart.push(setImageData)
        localStorage.setItem('cart', JSON.stringify(cart))
        tempData.images=imageSet
        console.log(data);
      }
    }
    else {
      let tempData=productData;
      let imageString="";
      const imageSet=tempData.images;
      tempData.images.forEach(item=> {
          imageString+=item.image;
      });
      tempData.images=imageString
      tempData.quantity=count
      const setImageData=tempData
      cart.push(setImageData)
      localStorage.setItem('cart', JSON.stringify(cart))
      tempData.images=imageSet
      console.log(data)
    }
    // setreloadnavbar(!reloadnavbar)
    // window.location.reload()
    // toast.success('Item added to cart')

  }
  return (
    <div className='product'>

      <div className='s1'>
        {/* {console.log(data)} */}
        <div onClick={()=>{navigate(`/product/${data.product_id}`)}}>
          {/* {console.log(data)} */}
          <img src={`https://res.cloudinary.com/dqzedyrjd/image/upload/${data.images[0].image}.jpg`} alt={'no img'} />
        </div>
      </div>
      <div className='s2'>
        <h3>
          $ {
            data.price - (data.price * ProductDiscount / 100)
          }
          <span>${data.price}</span>
        </h3>
        
        <div className='nameContainer'>
          <Link to={`/product/${data.product_id}`}><a>{data.product_name}</a></Link>
        </div>
      </div>
      <div className='s3'>
        <p>{data.counttype}</p>
      </div>
      {
        show ?
          <div className='addbtn'>
            <div className='qty'>
              <button
                onClick={() => {
                  if(count===1){
                    setshow(false);
                  }
                  if (count > 1) {
                    setCount(count - 1)
                  }
                }}
              >-</button>
              <p>{count}</p>
              <button
                onClick={() => setCount(count + 1)}
              >+</button>
            </div>
            <button className='addtocart'
              onClick={() => {
                setshow(false)
                // setCount(1)
                addtocart()
              }}
            >
              Add to cart
            </button>
          </div>
          :
          <div className='addbtn'>
            {/* <Link
              to={`/product/${data.id}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link> */}


            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"
              onClick={() => setshow(true)}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>

          </div>
      }
    </div>
  )
}

export default ProductCard