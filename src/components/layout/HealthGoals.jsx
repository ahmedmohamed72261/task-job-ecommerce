import React from 'react';
import './HealthGoals.css';

const HealthGoals = () => {
  const healthGoals = [
    { id: 1, image: '/imgi_39_IVITA01.webp', title: 'التغذية الصحية' },
    { id: 2, image: '/product1.webp', title: 'الرياضة واللياقة البدنية' },
    { id: 3, image: '/product2.webp', title: 'الصحة العامة' },
    { id: 4, image: '/product3.webp', title: 'صحة الأطفال' },
    { id: 5, image: '/product4.webp', title: 'صحة الرجل' },
    { id: 6, image: '/product5.webp', title: 'صحة المرأة' }
  ];

  return (
    <section className="health-goals">
      <div className="container">
        <h2 className="section-title">تسوق حسب هدفك الصحي</h2>
        <div className="health-goals-grid">
          {healthGoals.map((goal) => (
            <div key={goal.id} className="health-goal-card">
              <div className="health-goal-image">
                <img src={goal.image} alt={goal.title} />
              </div>
              <h3 className="health-goal-title">{goal.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthGoals;