import React, { useRef, useState } from 'react'
import './App.css'

function App() {
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);
  const [data, setData] = useState([
    {
      "text": "th",
      "correctOrder": 0
    },
    {
      "text": "on",
      "correctOrder": 2
    },
    {
      "text": "er",
      "correctOrder": 1
    }
  ])
  const [submitted, setSubmittion] = useState(false)
  const [result, setResult] = useState(false)

  const dragStart = (event:any) => {
    dragItem.current = event.target.id
    console.log(event.target.id)
  }
  const dragEnter = (event:any) => {
    dragOverItem.current = event.currentTarget.id
    console.log(event.currentTarget.id)
  }
  const drop = () => {
    const newData = [...data]
    const draggedContent = newData[dragItem.current]
    newData.splice(dragItem.current, 1)
    newData.splice(dragOverItem.current, 0, draggedContent)
    dragItem.current = null
    dragOverItem.current = null
    setData(newData)
  }

  const rows = data.map((row, index) => (
    <li 
      id={String(index)}
      onDragStart={dragStart}
      onDragEnter={dragEnter}
      onDragEnd={drop}
      onTouchStart={dragStart}
      onTouchEnd={drop}
      draggable
      >
        <p>

      {row.text}
        </p>
    </li>
  ))

  const checkAnswer = () => {
    setResult(data.every((row, index) => (row.correctOrder == index)))
    setSubmittion(true)
  }

  return (
    <div className='container'>
    <ul className='list'>
      <li><p>1st</p></li>
      <li><p>2nd</p></li>
      <li><p>3rd</p></li>
    </ul>
    <ul className='list'>
      {React.Children.toArray(rows)}
    </ul>
    <button className='submit' onClick={checkAnswer}>check</button>
    <p className='submit'>{submitted && (result ? "correct!" : "try again")}</p>
    </div>
  )
}

export default App
