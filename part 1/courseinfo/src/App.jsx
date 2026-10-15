import { Content } from "./components/Content"
import { Header } from "./components/Header"
import { Total } from "./components/Total"

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {index:1, title: 'Fundamentals of React', total: 10 },
    {index:2, title: 'Using props to pass data', total: 7 },
    {index:3, title: 'State of a component', total: 14 }
  ]

  return (
    <div>
      <Header course={ course } />
      <Content parts={ parts }/>
      <Total parts={parts} />
    </div>
  )
}

export default App