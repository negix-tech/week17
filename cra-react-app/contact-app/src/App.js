import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactList from './pages/ContactList';
import AddContact from './pages/AddContact';
import Header from './components/Header';
import './styles.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/add" element={<AddContact />} />
      </Routes>
    </Router>
  );
}

export default App;