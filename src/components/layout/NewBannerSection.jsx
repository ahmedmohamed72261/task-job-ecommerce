import React from 'react';
import './NewBannerSection.css';

const NewBannerSection = () => {
  return (
    <section className="new-banner-section">
      <div className="container">
        <div className="new-banner-grid">
          <div className="new-banner-item">
            <img src="/banner-new1.webp" alt="Banner Promotion" />
          </div>
          <div className="new-banner-item">
            <img src="/banner-new2.webp" alt="Banner Promotion" />
          </div>
          <div className="new-banner-item">
            <img src="/banner-new3.webp" alt="Banner Promotion" />
          </div>
          <div className="new-banner-item">
            <img src="/banner-new4.webp" alt="Banner Promotion" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewBannerSection;