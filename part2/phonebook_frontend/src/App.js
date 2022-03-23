import React, { useState, useEffect, useCallback} from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import ContactServices from './services/contacts'


const Notification = ({message, errorStyle}) => {
  if (message === null) { 
    return null
  }

  return (
    <div style={errorStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  const messageStyle =  {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  }

  const hook = () => {
    ContactServices
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }
  useEffect(hook, [])

  const handleFormSubmit = (event) => {
    event.preventDefault()
    let match = persons.filter(person => person.name === newName)
    if (!(match.length > 0)) {
      let newPerson = {name: newName, number: newNumber, id: persons[persons.length - 1].id + 1}
      ContactServices
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          setMessage(`new number ${newPerson.name} is added`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(error.response.data)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    } else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      let id = match[0].id
      let updatePerson = {...match[0], number: newNumber}
      ContactServices
        .update(id, updatePerson)
        .then(() => {
          let people = persons.filter(person => person.id !== id).concat(updatePerson)
          setPersons(people)
          setMessage(`new number ${updatePerson.number} is added`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(error.response.data)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
    event.target.reset()
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterContacts = (event) => {
    let keyword = event.target.value
    setFilter(keyword)
  }

  const handleDelete = (event) => {
    let name = event.target.previousElementSibling.textContent.split(' ')[0]
    if (!window.confirm(`delete ${name}?`)) {
      return
    }
    let id = event.target.previousElementSibling.dataset.id
    ContactServices
      .remove(id)
      .then(response => {
        let people = persons.filter(person => person.id !== id)
        setPersons(people)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterContacts={handleFilterContacts} />
      <h2>add a new</h2>
      <Notification message={message} errorStyle={messageStyle}/>
      <PersonForm 
        handleNumberChange={handleNumberChange} 
        handleNameChange={handleNameChange}
        handleFormSubmit={handleFormSubmit}
        />
      <h2>Numbers</h2>
        <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  )
}

export default App