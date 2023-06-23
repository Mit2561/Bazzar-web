import React from 'react'
import AllProduct from './AllProduct'
import CategorySidebar from './CategorySidebar'
// import loading from '../../ASSETS/Images/1.png'
import './Product_Sidebar.css'
const ProductSidebar = ({products,categories}) => {
  // const Loading = () => {
  //   return(
  //     <div>
  //       <img src={loading} alt='loading'/>
  //     </div>
  //   )
  // }
  const searchCategory = (item) => {
    // findCategoris(item)
    console.log(item);
  }
  return (
    <div className='product_sidebar'>
        <CategorySidebar categories={categories} searchCategory={searchCategory}/>
        {products.length>0 &&<AllProduct products={products}/>}
        {/* {products.length===0 && <Loading/>} */}
    </div>
  )
}

export default ProductSidebar