import React from 'react';
import './BannerSection.css';

const BannerSection = () => {
  const banners = [
    {
      id: 1,
      image: '/banner1.webp',
      title: 'صحتــــك بال AI',
    },
    {
      id: 2,
      image: '/banner2.webp',
      title: 'تســــوق فيتامينـــاتــك',
    },
    {
      id: 3,
      image: '/banner3.webp',
      title: 'تحاليل الفيتــــامينات',
    },
    {
      id: 4,
      image: '/banner4.webp',
      title: 'استشــر طبيبــــك',
    }
  ];

  return (
    <section className="banner-section">
      <div className="container">
        <div className="banner-grid">
          {banners.map((banner) => (
            <div key={banner.id} className="banner-card">
              <div className="banner-image">
                <img src={banner.image} alt={banner.title} />
              </div>
              <h3 className="banner-title">{banner.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerSection;