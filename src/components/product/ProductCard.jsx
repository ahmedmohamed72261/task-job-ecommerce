import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { addToCart } from '../../store/slices/cartSlice';
import './ProductCard.css';


const ProductCard = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card">
      {product.isSale && discountPercentage > 0 && (
        <div className="discount-badge">
          -{discountPercentage}%
        </div>
      )}
      
      {product.isNew && (
        <div className="new-badge">
          جديد
        </div>
      )}

      <div className="product-image">
        <img 
          src={`https://via.placeholder.com/200x200/8B5CF6/FFFFFF?text=${encodeURIComponent(product.nameAr)}`}
          alt={product.nameAr}
          loading="lazy"
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.nameAr}</h3>
        <p className="product-brand">{product.brand}</p>
        
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
              >
                ⭐
              </span>
            ))}
          </div>
          <span className="rating-text">({product.reviewCount})</span>
        </div>

        <div className="product-price">
          <span className="current-price">{product.price} ر.س</span>
          {product.originalPrice && (
            <span className="original-price">{product.originalPrice} ر.س</span>
          )}
        </div>

        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? 'أضف للسلة' : 'غير متوفر'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;