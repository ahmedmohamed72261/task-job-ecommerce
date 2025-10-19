import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>ايفيتا</h3>
            <p>متجر متخصص في المكملات الغذائية والفيتامينات الطبيعية لتعزيز صحتك ولياقتك.</p>
            <div className="social-links">
              <a href="#" className="social-icon facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-icon youtube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>روابط سريعة</h3>
            <ul>
              <li><a href="#">الرئيسية</a></li>
              <li><a href="#">المتجر</a></li>
              <li><a href="#">العلامات التجارية</a></li>
              <li><a href="#">العروض الخاصة</a></li>
              <li><a href="#">من نحن</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>خدمة العملاء</h3>
            <ul>
              <li><a href="#">تواصل معنا</a></li>
              <li><a href="#">الأسئلة الشائعة</a></li>
              <li><a href="#">سياسة الخصوصية</a></li>
              <li><a href="#">شروط الاستخدام</a></li>
              <li><a href="#">سياسة الإرجاع</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>تحميل التطبيق</h3>
            <p>احصل على تجربة تسوق أفضل مع تطبيق ايفيتا</p>
            <div className="app-buttons">
              <a href="#" className="app-button">
                <img src="/app-store.svg" alt="App Store" />
              </a>
              <a href="#" className="app-button">
                <img src="/google-play.svg" alt="Google Play" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="company-logos">
          <img src="/logo-company1.jpg" alt="Partner 1" />
          <img src="/logo-company2.jpg" alt="Partner 2" />
          <img src="/logo-company3.jpg" alt="Partner 3" />
          <img src="/logo-company4.jpg" alt="Partner 4" />
        </div>
        
        <div className="footer-bottom">
          <p>© 2023 ايفيتا. جميع الحقوق محفوظة.</p>
        </div>
      </div>
      
      <a href="#" className="whatsapp-float">
        <i className="fab fa-whatsapp"></i>
      </a>
    </footer>
  );
};

export default Footer;