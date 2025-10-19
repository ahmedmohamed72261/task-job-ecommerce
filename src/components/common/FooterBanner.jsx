import React from 'react';
import './FooterBanner.css';

const FooterBanner = () => {
  return (
    <div className="footer-banner">
      <img src="/footer-banner.webp" alt="Special Offers" className="footer-banner-image" />
      {/* <div className="footer-banner-content">
        <h2>عروض خاصة على المنتجات الصحية</h2>
        <p>تسوق الآن واحصل على خصم يصل إلى 30%</p>
        <button className="footer-shop-now-btn">تسوق الآن</button>
      </div> */}
    </div>
  );
};

export default FooterBanner;