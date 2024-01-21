import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => (
   <tr>
      <td>{text}</td>
      <td>{value}</td>
   </tr>
)

const Statistics = ({ good, neutral, bad }) => {
   const all = good + neutral + bad
   const average = (good - bad) / (all)
   const positive = (good / all) * 100 + "%"

   if (all == 0) {
      return (
         <p>No feedback given</p>
      )
   }

   return (
      <div>
         <h2>statistics</h2>
         <table>
            <tbody>
         <StatisticLine text="good" value={good} />
         <StatisticLine text="neutral" value={neutral} />
         <StatisticLine text="bad" value={bad} />
         <StatisticLine text="all" value={all} />
         <StatisticLine text="average" value={average} />
         <StatisticLine text="positive" value={positive} />
         </tbody>
         </table>
      </div>
   )
}

const App = () => {
   // tallenna napit omaan tilaansa
   const [good, setGood] = useState(0)
   const [neutral, setNeutral] = useState(0)
   const [bad, setBad] = useState(0)

   const increment = (state, setState) => () => setState(state + 1)

   return (
      <div>
         <h1>give feedback</h1>
         <Button onClick={increment(good, setGood)} text="good" />
         <Button onClick={increment(neutral, setNeutral)} text="neutral" />
         <Button onClick={increment(bad, setBad)} text="bad" />
         <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
   )
}

export default App