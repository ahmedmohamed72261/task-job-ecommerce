import React from 'react';
import './Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <div className="banner-text">
          <h2>عروض خاصة على المكملات الغذائية</h2>
          <p>خصم يصل إلى 50% على منتجات مختارة</p>
          <button className="banner-btn">تسوق الآن</button>
        </div>
        <div className="banner-image">
          <img 
            src="https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=عروض+خاصة"
            alt="عروض خاصة"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;