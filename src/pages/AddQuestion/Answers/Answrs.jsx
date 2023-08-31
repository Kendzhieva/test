import React, { useState } from 'react';

function Answers({ item, setOptions, trueAnswer, setTrueAnswer }) {

  const [text, setText] = useState(item.text || '')

  const saveOneAnswers = () => {
    setOptions(prev => prev.map((el) => {
      if (el.id === item.id) {
        return { ...el, saved: true, text: text ? text : 'Ответ' }
      } else {
        return el
      }
    }))
  }

  const editOneAnswers = () => {
    setOptions(prev => prev.map((el) => {
      if (el.id === item.id) {
        return { ...el, saved: false }
      } else {
        return el
      }
    }))
  }

  const deleteOneAnswers = () => {
    setOptions(prev => prev.filter((el) => el.id !== item.id))
  }

  const checkTrueAnswer = () => {
    setTrueAnswer(prev => {return {...prev, text: text}})
    setOptions(prev => prev.map((el) => {
      if (el.id === item.id) {
        return { ...el, correct: true}
      } else {
        return {...el, correct: false}
      }
    }))
  }

  return (
    <li>
      {
        trueAnswer.status && 
        <input 
          onChange={checkTrueAnswer} 
          id={item.id} value={text} 
          type='radio' 
          name='answer'
          checked={text === trueAnswer.text}
          required
        /> 
      }

      {
        item.saved ? <>
        <label htmlFor={item.id}>{item.text}</label>
          <button onClick={editOneAnswers}>Edit</button>
        </> :
          <>
            <input value={text} required onChange={(e) => setText(e.target.value)} type='text' placeholder='Введите ответ' />
            <button onClick={saveOneAnswers}>Save</button>
          </>
      }
      <button onClick={deleteOneAnswers}>Delete</button>
    </li>
  );
}

export default Answers;
