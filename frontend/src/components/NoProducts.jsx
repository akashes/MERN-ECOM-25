import React from 'react'
import '../componentStyles/NoProducts.css'
const NoProducts = ({keyword}) => {
  return (
    <div className="no-products-content">
        <div className="no-products-icon">
            ⚠️
            <h3 className="no-products-title">
                No products found
                <p className="no-products-message">
                    {
                        keyword?`We couldn't find any products matching ${keyword}. Try using different keywords or browse our complete catalogue`
                        : `No Products are currently available . Please check back later`
                    }
                </p>
            </h3>
        </div>
    </div>
  )
}
export default NoProducts
