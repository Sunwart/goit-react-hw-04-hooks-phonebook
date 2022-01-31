import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactsList/ContactList';
import Filter from './components/Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const userContacts = JSON.parse(localStorage.getItem('Contacts'));
    return userContacts
      ? userContacts
      : [
          { id: 'id-1', name: 'Fire emergency', number: '101' },
          { id: 'id-2', name: 'Police', number: '102' },
          { id: 'id-3', name: 'Ambulance', number: '103' },
          { id: 'id-4', name: 'Gas emergency', number: '104' },
        ];
  });

  const [filter, setFilter] = useState('');

  const checkContact = name => {
    const normilizedName = name.toLowerCase();
    return contacts.find(
      contact => normilizedName === contact.name.toLowerCase()
    );
  };

  const addContact = ({ name, number }) => {
    const contact = { id: nanoid(), name, number };
    if (checkContact(name)) {
      alert(`${name} is already in contacts.`);
    } else {
      setContacts(prevContacts => [contact, ...prevContacts]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const getVisibleNumbers = () => {
    const normilizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter)
    );
  };

  useEffect(() => {
    localStorage.setItem('Contacts', JSON.stringify(contacts));
  }, [contacts]);

  const visibleNumbers = getVisibleNumbers();
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm submit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={e => setFilter(e.currentTarget.value)} />
      <ContactList
        visibleNumbers={visibleNumbers}
        onDeleteContact={deleteContact}
      />
    </>
  );
};

export default App;
