import React, { useEffect, useState } from 'react';
import style from './oneUserAnswer.module.css'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {FiCheck} from 'react-icons/fi'
import {BsDot} from 'react-icons/bs'
import {RxCross1} from 'react-icons/rx'


function OneUserAnswer() {

  const {title, name, id} = useParams()
  const [question, setQuestion] = useState([])
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    axios(`http://localhost:3333/questions?category=${title}`)
    .then(({data}) => setQuestion(data))

    axios(`http://localhost:3333/answers/${id}`)
    .then(({data}) => setAnswers(data))

  }, [])

  if(question.length && 'name' in answers && answers){
    return (
      <div className={style.OneUserAnswer}>
        <h2 className={style.title}>Ответы {name} по {title}</h2>
  
        {
           question.map((item) => {
            console.log(answers[item.question]);
            return <div>
              <h2 className={style.questionTitle}>{item.question}</h2>
  
              <ul className={style.list}>
                  {item.options.map((el) => (
                      <li key={el.text}>
                        <h6 
                          style={{textDecoration: JSON.parse(answers[item.question])?.text === el.text ? 'underline' : 'none'}} 

                          className={style.text}>

                          {el.correct ? <FiCheck size={'20px'}/> :
                            JSON.parse(answers[item.question])?.text === el.text ? <RxCross1 size={'20px'}/> :
                            <BsDot size={'20px'}/>
                          }

                          {el.text}
                          </h6>
                      </li>
                  ))}
              </ul>
            </div>
        }) 
        }
        <Link to='/answers'><button className={style.btn}>Назад</button></Link>
      </div>
    );
  }else{
    <h2>Loading...</h2>
  }
}

export default OneUserAnswer;
