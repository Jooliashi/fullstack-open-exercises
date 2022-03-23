import React from "react";

const Persons = ({persons, filter, handleDelete}) => {
  let filtered;
  if (filter) {
    filtered = persons.filter(person => person.name.toLowerCase().match(filter.toLowerCase()))
  } else {
    filtered = persons
  }
  return (
  <>
    {filtered.map(person =>
    <div key={person.id}>
      <div data-id={person.id}>{person.name} {person.number}</div>
      <button onClick={handleDelete}>delete</button>
    </div>
    )}
  </>
)
}
export default Persons