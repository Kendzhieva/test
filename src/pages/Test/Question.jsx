import React from 'react'
import style from './question.module.css';

const Question = ({item, register}) => {
  return (
    <div className={style.Question}>
        <h2 className={style.title}>{item.question}</h2>

        <ul className={style.list}>
            {item.options.reduce((acc,currentValue) => {
                const randomIdx = Math.floor(Math.random() * (acc.length + 1));
                acc.splice(randomIdx, 0, currentValue)
                return acc
            }, [])
            .map((el) => (
                <li key={el.text}>
                    <label>
                        <input 
                        required
                            className={style.input} 
                            {...register(`${item.question}`)} 
                            value={JSON.stringify(el)} 
                            name={item.question} 
                            type='radio'
                        />
                    </label>
                    <h6 className={style.text}>{el.text}</h6>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Question