import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

function ContactTable({ contacts, setContacts }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const [modal, setModal] = useState({ show: false, id: null, group: false });
  const [menuOpen, setMenuOpen] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('contacts') || '[]');
    setContacts(stored);
  }, [setContacts]);

  const filtered = contacts.filter(c =>
    c.name.includes(search) || c.email.includes(search)
  );

  const deleteContact = (id) => {
    const updated = contacts.filter(c => c.id !== id);
    localStorage.setItem('contacts', JSON.stringify(updated));
    setContacts(updated);
    setMessage('✅ مخاطب حذف شد');
    setTimeout(() => setMessage(''), 3000);
    setModal({ show: false, id: null, group: false });
  };

  const deleteGroup = () => {
    const updated = contacts.filter(c => !selected.includes(c.id));
    localStorage.setItem('contacts', JSON.stringify(updated));
    setContacts(updated);
    setSelected([]);
    setMessage('✅ مخاطبین انتخاب‌شده حذف شدند');
    setTimeout(() => setMessage(''), 3000);
    setModal({ show: false, id: null, group: false });
  };

  const toggleSelect = (id) => {
    setSelected(selected.includes(id) ? selected.filter(i => i !== id) : [...selected, id]);
  };

  return (
    <>
      <input className="search" placeholder="جستجو..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={() => setModal({ show: true, group: true })} disabled={selected.length === 0}>🗑️ حذف گروهی</button>
      {message && <div className="success">{message}</div>}
      <table className="contact-table">
        <thead>
          <tr>
            <th>✔️</th>
            <th>نام</th>
            <th>ایمیل</th>
            <th>شماره</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id}>
              <td><input type="checkbox" checked={selected.includes(c.id)} onChange={() => toggleSelect(c.id)} /></td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>
                <div className="menu-inline">
                  <button onClick={() => setMenuOpen(menuOpen === c.id ? null : c.id)}>⋮</button>
                  {menuOpen === c.id && (
                    <div className="menu">
                      <button onClick={() => navigate('/add', { state: c })}>✏️ ویرایش</button>
                      <button onClick={() => setModal({ show: true, id: c.id })}>🗑️ حذف</button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modal.show && (
        <Modal
          message={modal.group ? 'آیا مخاطبین انتخاب‌شده حذف شوند؟' : 'آیا مخاطب حذف شود؟'}
          onConfirm={() => modal.group ? deleteGroup() : deleteContact(modal.id)}
          onCancel={() => setModal({ show: false, id: null, group: false })}
        />
      )}
    </>
  );
}

export default ContactTable;