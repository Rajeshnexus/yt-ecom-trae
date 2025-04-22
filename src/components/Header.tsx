import React from 'react';

interface HeaderProps {
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <>
    <header className="header">
      <h1>Welcome to Our Store</h1>
      <p>Discover amazing products at great prices</p>
    </header>
      <button onClick={onLogout} className="logout-button">
        Logout
      </button>
    </>
    
  );
};