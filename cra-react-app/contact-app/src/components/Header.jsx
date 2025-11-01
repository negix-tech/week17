import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <h2>📒 دفترچه مخاطبین</h2>
      <nav>
        <Link to="/">لیست مخاطبین</Link>
        <Link to="/add">➕ افزودن مخاطب</Link>
      </nav>
    </div>
  );
}

export default Header;