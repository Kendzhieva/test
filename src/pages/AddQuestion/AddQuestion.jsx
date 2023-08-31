import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Answers from './Answers/Answrs';
import {v4 as uuid4} from 'uuid'
import { useNavigate } from 'react-router-dom';

function AddQuestion() {

  const [test, setTest] = useState([])
  const [category, setCategory] = useState('')
  const [question, setQuestion] = useState('')
  const navigate = useNavigate()

  const [options, setOptions] = useState([
    {text: '', correct: false, id: 1, saved: false},
    {text: '', correct: false, id: 2, saved: false},
  ])

  const [trueAnswer, setTrueAnswer] = useState({
    text:'',
    status: false
  })

  


  const addAnswers = () => {
    setOptions(prev => [...prev, {
      text: '',
      correct: false,
      id: uuid4(),
      saved: false
    }])
  }

  const addQuestinFunc = () => {
    const newQuestion = {
      category,
      question,
      options : options.map((e) => {
        let {saved, ...other} = e
        return other
      }),
      id: uuid4()
    }
    axios.post('http://localhost:3333/questions', newQuestion)
    .then((res) => {
      alert('Вопрос дабавлен')
      navigate('/')
    })
  }



  useEffect(() => {
    axios('http://localhost:3333/tests')
    .then(({data}) => setTest(data))
  },[])

  return (
    <div>
      <h2>Добавить вопрос к тесту</h2>

      <h3>выбирите тест</h3>

      <div>
        {test.map((item) => (
          <button key={item.id} style={{background: category === item.title ? 'red' : 'buttonface'}} onClick={() => setCategory(item.title)}>{item.title}</button>
        ))}
      </div>
      <input 
        value={question} 
        onChange={(e) => setQuestion(e.target.value)} 
        type='text' 
        placeholder='Введите название вопроса'
        required
      />
      <ul>
        {
          options.map((item) => (
            <Answers trueAnswer={trueAnswer} setTrueAnswer={setTrueAnswer} key={item.id} item={item} setOptions={setOptions}/>
          ))
        }
      </ul>
      <button onClick={addAnswers}>Создать ещё один вопрос</button>
      <button onClick={() => setTrueAnswer(prev => {return {...prev , status: !prev.status}})}>Выбрать правельный ответ</button>
      <button onClick={addQuestinFunc}>Добавить вопрос</button>
    </div>
  );
}

export default AddQuestion;
