import { useState, useEffect } from 'react'
import Filter from "./components/filter.jsx"
import Form from "./components/form.jsx"
import Person from "./components/person.jsx"
import personService from "./services/persons.jsx"
import Notification from "./components/notification.jsx"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({name: "", number: ""})
  const [filter, setFilter] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorStyle, setErrorStyle] = useState({color: "red"})

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const add = (event) => {
    event.preventDefault()
    if(persons.map(p => p.name).indexOf(newPerson.name) > -1){
      if(window.confirm(`${newPerson.name} is already added to the phonebook, do you want to replace?`)){
        let id = persons[persons.map(p => p.name).indexOf(newPerson.name)].id
        personService.update(id, newPerson)
          .then(response => {
            setPersons(persons.map(p => p.id !== id ? p : response.data))
            notifications(`Assigned ${newPerson.name} a new phone number`)
            setErrorStyle({color: "green"})
          })
          .catch(error => {
            notifications(`${newPerson.name} was already removed from the phonebook`)
          })
      } 
    } else {
      setPersons(persons.concat(newPerson))
      personService
        .createNew(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          notifications(`Added ${newPerson.name} to phonebook`)
          setErrorStyle({color: "green"})
        })
    }
  }

  const handleNameChange = (event) => {
    setNewPerson({name: event.target.value, number: newPerson.number})
  }

  const handleNumberChange = (event) => {
    setNewPerson({name: newPerson.name, number: event.target.value})
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  const Button = (props) => {
    return (
      <button onClick={props.handleClick}>
        {props.text}
      </button>
    )
}


const DeletePerson = (person, event) => {
  event.preventDefault()
  if(window.confirm(`Are you sure you want to delete ${person.name}`)){
      personService.deleteById(person)
      let arr = persons.filter(p => p.id !== person.id)
      setPersons(arr)
      notifications(`Removed ${person.name} from the phonebook`)
  }
}

const notifications = (text) => {
  setErrorMessage(text)
  setTimeout(() => {
    setErrorMessage(null)
    setErrorStyle({color: "red"})
  }, 5000)
}


var personsToShow = persons;

if (filter.length > 0) {
  let filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  personsToShow = filteredPersons;
}

return (
  <div>
    <h2>Phonebook</h2>
    <Notification message={errorMessage} style={errorStyle} />
    <Filter handleFilterChange={handleFilterChange} />
    <h2>Add new</h2>
    <Form add={add} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
    <h2>Numbers</h2>
    <ul>
      {personsToShow.map((person) => (
        <li key={person.id}>
          <Person person={person} />
          <Button handleClick={(event) => DeletePerson(person, event)} text="delete" />
        </li>
      ))}
    </ul>
  </div>
);

}

export default App;