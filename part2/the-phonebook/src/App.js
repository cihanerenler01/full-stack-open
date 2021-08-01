import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

const Form = (props) => {
  const { addContact, newName, setNewName, newNumber, setNewNumber } = props;
  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={addContact}>
        <div>
          <div>
            name:
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div>
            number:
            <input
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Contact = ({ person }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
    </tr>
  );
};

const Contacts = ({ personsToShow }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {personsToShow.map((person) => (
            <Contact key={person.name} person={person} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addContact = (e) => {
    e.preventDefault();

    const isPersonExist = persons.filter(
      (person) =>
        person.name.toLowerCase().trim() === newName.toLowerCase().trim()
    );

    if (isPersonExist.length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newContact = {
        id: persons.length + 1,
        name: newName,
        number: newNumber,
        date: new Date().toISOString(),
      };

      setPersons([...persons, newContact]);
      setNewName("");
      setNewNumber("");
    }
  };

  const personsToShow = !filter
    ? persons
    : persons.filter(
        (person) => person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <Form
        addContact={addContact}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      {personsToShow.length === 0 ? (
        `No contact with name of "${filter}"`
      ) : (
        <Contacts personsToShow={personsToShow} />
      )}
    </div>
  );
};

export default App;
