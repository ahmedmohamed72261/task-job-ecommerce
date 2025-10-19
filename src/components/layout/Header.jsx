import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { toggleCart } from '../../store/slices/cartSlice';
import { fetchCategories } from '../../store/slices/categorySlice';
import { fetchBrands } from '../../store/slices/brandSlice';
import { getLocalizedContent } from '../../utils/api';
import './Header.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const dispatch = useAppDispatch();
  const { totalItems } = useAppSelector(state => state.cart);
  const { items: categories } = useAppSelector(state => state.categories);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBrands({ limit: 10 }));

    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch, scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent scrolling when mobile menu is open
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : 'auto';
  };

  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  // Get main categories (parent_id is null)
  const mainCategories = categories.filter(cat => cat.parent_id === null).slice(0, 6);

  // Static categories for dropdown menu
  const staticCategories = [
    { id: 1, name: { ar: 'تسوق حسب الهدف' } },
    { id: 2, name: { ar: 'الإستشارة الطبية' } },
    { id: 3, name: { ar: 'المختبر' } },
    { id: 4, name: { ar: 'عرفنا عن صحتك' } },
    { id: 5, name: { ar: 'تسوق حسب الفيتامين' } }
  ];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
      {/* Top Bar - Only visible when not scrolled */}
      <div className={`header-top`}>
        <div className="container">
          <div className="header-top-content">
            <div className="announcement-text">
              توصيل مجاني للطلب أكثر من 299 ريال سعودي
            </div>
          </div>
        </div>
        
        {/* Main Header moved inside header-top */}
        {/* <div className="header-main">
          <div className="container">
            <div className="header-main-content">
              <div className="logo">
                <img src="/logo.png" alt="iVita Logo" className="logo-img" />
              </div>
              
              <div className="search-bar">
                <input 
                  type="text" 
                  placeholder="ابحث عن المنتجات، العلامات التجارية..." 
                  className="search-input"
                />
                <button className="search-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              <div className="header-actions">
                <button className="action-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>حسابي</span>
                </button>
                
                <button className="action-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>المفضلة</span>
                </button>
                
                <button className="action-btn" onClick={handleCartClick}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>السلة</span>
                  {totalItems > 0 && (
                    <span className="cart-badge">{totalItems}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      

      
      {/* Mobile Menu Toggle */}
      <div className="mobile-menu-toggle">
        <button onClick={toggleMobileMenu} className="menu-toggle-btn">
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className={`header-nav   ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="logo">
            <img src="/logo.png" alt="iVita Logo" className="logo-img" />
        </div>
        <div className={`container-header`}>
          <div className="nav-wrapper">
            <div className="categories-dropdown">
              <button className="categories-btn">
                فئات المتجر
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="dropdown-menu">
                {staticCategories.map(category => (
                  <a key={category.id} href={`/category/${category.id}`} className="dropdown-item">
                    {getLocalizedContent(category.name, 'ar')}
                  </a>
                ))}
              </div>
            </div>
            <ul className="nav-menu">
              <li><a href="#home" className="active">الرئيسية</a></li>
              <li><a href="#store">المتجر</a></li>
              <li><a href="#brands">العلامات التجارية</a></li>
              <li><a href="#offers">العروض الخاصة</a></li>
              <li><a href="#about">من نحن</a></li>
            </ul>
            <div className="categories-dropdown mobile-actions">
              <div className="header-actions">
                <button className="action-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>حسابي</span>
                </button>
                
                <button className="action-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.5783 8.50903 2.9987 7.05 2.9987C5.59096 2.9987 4.19169 3.5783 3.16 4.61C2.1283 5.6417 1.5487 7.04097 1.5487 8.5C1.5487 9.95903 2.1283 11.3583 3.16 12.39L12 21.23L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6053C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39467C21.7563 5.72723 21.351 5.1208 20.84 4.61V4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>المفضلة</span>
                </button>
                
                <button className="action-btn" onClick={handleCartClick}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>السلة</span>
                  {totalItems > 0 && (
                    <span className="cart-badge">{totalItems}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={toggleMobileMenu}></div>
      )}
    </header>
  );
};

export default Header;