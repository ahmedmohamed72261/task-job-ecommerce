import React from 'react';
import './NewSplitBanner.css';

const NewSplitBanner = () => {
  return (
    <section className="new-split-banner">
      <div className="container">
        <div className="split-banner-grid">
          <div className="split-banner-item">
            <img src="/bannersplit1.png" alt="Split Banner Promotion" />
          </div>
          <div className="split-banner-item">
            <img src="/bannersplit2.png" alt="Split Banner Promotion" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewSplitBanner;