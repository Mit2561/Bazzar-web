import React from 'react'
import './CategorySidebar.css'

const CategorySidebar = ({categories,searchCategory}) => {
    const search = (category_id) =>{
        searchCategory(category_id);
    }
    return (
        <div className='categorysidebar'>
            <h2 style={{margin:"12px",color:"green"}}>Categories</h2>
            {
                categories.map((item) => {
                    return (
                        <div className='category' onClick={()=>{search(item.category_id)}}>
                            <h3>{item.category_name}</h3>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CategorySidebar