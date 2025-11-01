import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', id: null });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const state = location.state;
    if (state) setForm(state);
  }, [location]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'نام الزامی است';
    if (!form.email.includes('@')) errs.email = 'ایمیل معتبر نیست';
    if (!form.phone.match(/^\d{10,}$/)) errs.phone = 'شماره معتبر نیست';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    if (form.id) {
      const updated = contacts.map(c => c.id === form.id ? form : c);
      localStorage.setItem('contacts', JSON.stringify(updated));
    } else {
      contacts.push({ ...form, id: Date.now() });
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
    navigate('/');
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input placeholder="نام و نام خانوادگی" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      {errors.name && <span className="error">{errors.name}</span>}

      <input placeholder="ایمیل" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      {errors.email && <span className="error">{errors.email}</span>}

      <input placeholder="شماره تماس" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      {errors.phone && <span className="error">{errors.phone}</span>}

      <button type="submit">{form.id ? 'ویرایش مخاطب' : 'افزودن مخاطب'}</button>
    </form>
  );
}

export default ContactForm;