import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { setSelectedCategory } from '../../store/slices/categorySlice';
import { getLocalizedContent } from '../../utils/api';
import './CategoryCard.css';


const CategoryCard = ({ category }) => {
  const dispatch = useAppDispatch();

  const handleCategoryClick = () => {
    dispatch(setSelectedCategory(category.slug));
  };

  const arabicLang = getLocalizedContent(category.Langs, 'ar');
  const categoryName = arabicLang?.name || category.slug;
  const categoryImage = arabicLang?.img;

  return (
    <div className="category-card" onClick={handleCategoryClick}>
      <div className="category-image">
        {categoryImage ? (
          <img 
            src={categoryImage}
            alt={categoryName}
            loading="lazy"
          />
        ) : (
          <div className="category-placeholder">
            <span>{categoryName.charAt(0)}</span>
          </div>
        )}
      </div>
      
      <div className="category-info">
        <h3 className="category-name">{categoryName}</h3>
        <p className="category-description">تسوق الآن</p>
      </div>
    </div>
  );
};

export default CategoryCard;