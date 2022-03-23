import React from "react";

const PersonForm = ({handleFormSubmit, handleNameChange, handleNumberChange}) => (
  <form onSubmit={handleFormSubmit}>
    <div>
      name: 
      <input onChange={handleNameChange} />
    </div>
    <div>Number: <input onChange={handleNumberChange}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm 