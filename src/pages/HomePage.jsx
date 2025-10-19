import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchCategories } from '../store/slices/categorySlice';
import { fetchBrands } from '../store/slices/brandSlice';
import { getLocalizedCategoryName, getLocalizedCategoryImage, getLocalizedBrandName } from '../utils/api';
import { Helmet } from 'react-helmet-async';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSlider from '../components/layout/HeroSlider';
import BannerSection from '../components/layout/BannerSection';
import NewBannerSection from '../components/layout/NewBannerSection';
import NewSplitBanner from '../components/layout/NewSplitBanner';
import ProductSlider from '../components/product/ProductSlider';
import SplitBanner from '../components/common/SplitBanner';
import FooterBanner from '../components/common/FooterBanner';
import './HomePage.css';
import '../components/product/ProductCard.css';
import '../components/category/CategoryCard.css';

const HomePage = () => {
  const dispatch = useAppDispatch();
  
  const { items: categories, loading: categoriesLoading } = useAppSelector(state => state.categories);
  const { items: brands, loading: brandsLoading } = useAppSelector(state => state.brands);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands({ limit: 20, offset: 0 }));
  }, [dispatch]);

  // Filter main categories (parent_id is null)
  const mainCategories = categories.filter(cat => cat.parent_id === null);
  
  // Get subcategories for "Shop By Goal" (id: 1)
  const shopByGoalSubcategories = categories.filter(cat => cat.parent_id === 1);

  // Don't show loading if we have data already
  const isInitialLoading = categoriesLoading && categories.length === 0 && brandsLoading && brands.length === 0;

  if (isInitialLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>iVita - متجر الفيتامينات والمكملات الغذائية</title>
        <meta name="description" content="تسوق أفضل الفيتامينات والمكملات الغذائية من iVita بأسعار تنافسية وتوصيل سريع لجميع أنحاء المملكة" />
        <meta name="keywords" content="فيتامينات, مكملات غذائية, صحة, عناية, منتجات طبيعية, iVita" />
        <link rel="canonical" href="https://ivita.com/" />
      </Helmet>
      <div className="homepage">
        <Header />
      
      {/* Hero Slider */}
      <HeroSlider />
      
      {/* Banner Section */}
      <BannerSection />
      
      {/* First Product Slider */}
      <ProductSlider title="منتجات مميزة" />
      
      
      {/* Second Product Slider */}
      <ProductSlider title="الأكثر مبيعاً" />
      
      {/* Third Product Slider */}
      <ProductSlider title="وصل حديثاً" />

       {/* Featured Categories - Shop By Goal Subcategories */}
      <section className="health-goals-section">
        <div className="container">
          <h2 className="section-title">تسوق حسب هدفك الصحي</h2>
          <div className="health-goals-grid">
            {shopByGoalSubcategories.map((category) => {
              const categoryName = getLocalizedCategoryName(category, 'ar');
              const categoryImage = getLocalizedCategoryImage(category, 'ar');
              
              return (
                <div key={category.id} className="health-goal-card">
                  <div className="health-goal-image">
                    {categoryImage ? (
                      <img src={categoryImage} alt={categoryName} />
                    ) : (
                      <div className="health-goal-placeholder">
                        <span>{categoryName.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

       {/* Second Product Slider */}
      <ProductSlider title="منتجات ايفيتا بخصم 50 %" />
      
      {/* Third Product Slider */}
      <ProductSlider title="احتياجاتك من الفيتامين" />

      {/* Split Banner */}
      <SplitBanner />
      
      {/* New Banner Section */}
      <NewBannerSection />
      
      {/* Second Product Slider */}
      <ProductSlider title="فيتامينات جمالك وصحتك" />
      
      {/* Third Product Slider */}
      <ProductSlider title="عروض المختبرات" />
      
      {/* New Split Banner */}
      <NewSplitBanner />

      {/* Second Product Slider */}
      <ProductSlider title="منتجات ايفيتا بخصم 50 %" />
      
      {/* Third Product Slider */}
      <ProductSlider title="احتياجاتك من الفيتامين" />
      {/* Footer Banner */}
      <FooterBanner />

      {/* Footer */}
      <Footer />
      
    </div>
  </>
  );
};

export default HomePage;