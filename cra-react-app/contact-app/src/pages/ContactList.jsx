import React, { useState } from 'react';
import ContactTable from '../components/ContactTable';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  return (
    <div className="page">
      <ContactTable contacts={contacts} setContacts={setContacts} />
    </div>
  );
}

export default ContactList;