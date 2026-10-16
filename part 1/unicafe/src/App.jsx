import { useState } from 'react'
import { Button } from './components/Button'
import { Title } from './components/Title'
import { Stats } from './components/Stats'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title text={ 'Give feedback' } size={1}/>
      <Button label={ 'Good' } onClick={() => setGood(good + 1) }/>
      <Button label={ 'Neutral' } onClick={() => setNeutral(neutral + 1) }/>
      <Button label={ 'Bad' } onClick={() => setBad(bad + 1) }/>

      <Title text={ 'Statistics' } size={2}/>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App