import { useState } from 'react';
import './App.css';
import contacts from './contacts.json';

function App() {
  const initialContacts = contacts.slice(0, 10);

  const [contactList, setContactList] = useState(initialContacts);

  const addRandomContact = () => {
    const remainingContacts = contacts.filter(contact => !contactList.includes(contact));

    if (remainingContacts.length === 0) {
      alert('No mreo contacts to add!');
      return;
    }

    const randomContact = remainingContacts[Math.floor(Math.random() * remainingContacts.length)];

    setContactList([...contactList, randomContact]);
  };

  const sortByName = () => {
    const sortedContacts = [...contactList].sort((a, b) => a.name.localeCompare(b.name));
    setContactList(sortedContacts);
  };

  const sortByPopularity = () => {
    const sortedContacts = [...contactList].sort((a, b) => b.popularity - a.popularity);
    setContactList(sortedContacts);
  };

  const deleteContact = (id) => {
    const updatedContacts = contactList.filter(contact => contact.id !== id);
    setContactList(updatedContacts);
  }

  return (
    <div className="App">
    <h1>Contact List</h1>
    <button onClick={addRandomContact}>Add Random Contact</button>
    <button onClick={sortByName}>Sort by Name</button>
    <button onClick={sortByPopularity}>Sort by Popularity</button>
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
        </tr>
      </thead>
      <tbody>
        {contactList.map(contact => (
          <tr key={contact.id}>
            <td>
              <img src={contact.pictureUrl} alt={contact.name} width="100" />
            </td>
            <td>{contact.name}</td>
            <td>{contact.popularity.toFixed(2)}</td>
            <td>{contact.wonOscar ? '🏆' : ''}</td>
            <td>{contact.wonEmmy ? '🏆' : ''}</td>
            <td>
              <button className="delete" onClick={() => deleteContact(contact.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    
    </div>
  );
}

export default App;
