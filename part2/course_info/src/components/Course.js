const Header = ({name}) => {
  return (<h1>{name}</h1>)
}

const Total = ({total}) => (
  <p>total of {total} exercises</p>
)

const Part = ({name, exercise}) => (
  <>
    <p>
      {name} {exercise}
    </p>
  </>
)

const Content = ({parts}) => {

  return (<>
    {parts.map(part => 
      <Part key={part.id} name={part.name} exercise={part.exercises} />
    )}
    
    <Total total={parts.reduce((sum, part) => sum + part.exercises, 0)} />
  </>)
}

const Course = ({course}) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts}/>
  </div>
)

export default Course