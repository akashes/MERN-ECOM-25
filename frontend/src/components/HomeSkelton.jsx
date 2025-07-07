import React from 'react';
import '../pageStyles/Home.css'; // Reuse your styles

const HomeSkeleton = () => {
  const fakeProducts = Array(8).fill(0);

  return (
    <>
      {/* Skeleton Navbar */}
      <div style={{
        height: '60px',
        backgroundColor: '#e0e0e0',
        width: '100%',
        animation: 'pulse 1.5s infinite',
      }} />

      {/* Skeleton Banner (ImageSlider) */}
      <div style={{
        height: '300px',
        width: '100%',
        backgroundColor: '#e0e0e0',
        animation: 'pulse 1.5s infinite',
      }} />

      {/* Trending Section */}
      <div className="home-container">
        <div
          className="home-heading"
          style={{ backgroundColor: '#e0e0e0', height: '2.8rem', width: '250px', borderRadius: '8px', animation: 'pulse 1.5s infinite' }}
        ></div>

        <div className="home-product-container">
          {fakeProducts.map((_, index) => (
            <div
              key={index}
              style={{
                width: "250px",
                height: "300px",
                backgroundColor: "#e0e0e0",
                borderRadius: "10px",
                animation: "pulse 1.5s infinite",
              }}
            />
          ))}
        </div>
      </div>

      {/* Skeleton Footer */}
      <div style={{
        height: '150px',
        backgroundColor: '#e0e0e0',
        marginTop: '3rem',
        animation: 'pulse 1.5s infinite',
      }} />

      <style>{`
        @keyframes pulse {
          0% { background-color: #e0e0e0; }
          50% { background-color: #f5f5f5; }
          100% { background-color: #e0e0e0; }
        }
      `}</style>
    </>
  );
};

export default HomeSkeleton;
