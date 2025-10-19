import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import './ProductSlider.css';

const ProductSlider = ({ title }) => {
  // Product data with local images (product1.webp to product10.webp)
  const products = [
    {
      id: 1,
      name: 'فيتامين د زنك مكملات زنك 25 ملغ 100 حبة',
      price: 75.50,
      oldPrice: 85.00,
      image: '/product1.webp',
    },
    {
      id: 2,
      name: 'استيبان فيتامين د3 1000 وحدة 60 كبسولة',
      price: 65.25,
      oldPrice: 75.00,
      image: '/product2.webp',
    },
    {
      id: 3,
      name: 'حبوب فيتامين سي 500 ملغ 30 كبسولة',
      price: 45.75,
      oldPrice: 55.00,
      image: '/product3.webp',
    },
    {
      id: 4,
      name: 'حبوب فيتامين ناتشورال 400 وحدة 30 كبسولة',
      price: 55.25,
      oldPrice: 65.00,
      image: '/product4.webp',
    },
    {
      id: 5,
      name: 'الصناعة شاي البابونج 25 كيس',
      price: 35.50,
      oldPrice: 45.00,
      image: '/product5.webp',
    },
    {
      id: 6,
      name: 'فيتا-مينرال زنك مكملات زنك 25 ملغ 60 قرص',
      price: 65.50,
      oldPrice: 75.00,
      image: '/product6.webp',
    },
    {
      id: 7,
      name: 'مكمل غذائي فيتامين سي 1000 ملغ',
      price: 85.00,
      oldPrice: 95.00,
      image: '/product7.webp',
    },
    {
      id: 8,
      name: 'كالسيوم مع فيتامين د3 60 قرص',
      price: 55.75,
      oldPrice: 65.00,
      image: '/product8.webp',
    },
    {
      id: 9,
      name: 'أوميغا 3 زيت السمك 1000 ملغ 60 كبسولة',
      price: 75.25,
      oldPrice: 85.00,
      image: '/product9.webp',
    },
    {
      id: 10,
      name: 'فيتامين ب المركب 100 قرص',
      price: 45.50,
      oldPrice: 55.00,
      image: '/product0.webp',
    },
  ];

  const nextSlide = () => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.querySelector('.product-card').offsetWidth + 20; // width + margin
      const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
      const newScrollLeft = Math.min(sliderRef.current.scrollLeft + itemWidth * 3, maxScrollLeft);
      
      sliderRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      if (newScrollLeft >= maxScrollLeft) {
        setCurrentIndex(products.length - 6);
      } else {
        setCurrentIndex(prev => Math.min(prev + 3, products.length - 6));
      }
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.querySelector('.product-card').offsetWidth + 20; // width + margin
      const newScrollLeft = Math.max(sliderRef.current.scrollLeft - itemWidth * 3, 0);
      
      sliderRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      setCurrentIndex(prev => Math.max(prev - 3, 0));
    }
  };

  return (
    <div className="product-slider-container">
      <div className="product-slider-header">
        <h2 className="product-slider-title">{title || 'خصومات متميزة'}</h2>
      </div>
      
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop={true}
        breakpoints={{
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
        className="product-slider"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-brand">
                  <img src="/logo.png" alt="Brand Logo" className="brand-logo" />
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price-container">
                  <span className="product-price">{product.price.toFixed(2)} ر.س</span>
                  <span className="product-old-price">{product.oldPrice.toFixed(2)}</span>
                </div>
              </div>
              <button className="add-to-cart-btn">إضافة إلى السلة</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;