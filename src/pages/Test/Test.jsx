import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Question from '../Test/Question'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import style from './test.module.css';

const Test = () => {

    const [questions, setQuestions] = useState([])

    const params = useParams()

    const navigate = useNavigate()

    const {
        register,
        handleSubmit
    } = useForm()

    useEffect(() => {
        axios(`http://localhost:3333/questions?category=${params.title}`)
            .then(({ data }) => setQuestions(data))
    }, [])

    const passTest = (data) => {
        const score = Object.values(data).splice(1).filter(item => JSON.parse(item).correct === 'true')

        axios.post('http://localhost:3333/answers', { ...data, point: score.length, category: params.title })
            .then((res) => console.log(res))

        alert(`${data.name} вы прошли тест`)
        navigate('/')
    }

    return (
        <div className={style.Test}>
            <h1 className={style.title}>Тест по {params.title}</h1>



            <form onSubmit={handleSubmit(passTest)}>

                <input required className={style.input} {...register('name')} type='text' placeholder='Введите имя' />

                {
                    questions.reduce((acc, currentValue) => {
                        const randomIdx = Math.floor(Math.random() * (acc.length + 1));
                        acc.splice(randomIdx, 0, currentValue)
                        return acc
                    }, []).map((item) => (
                        <Question register={register} key={item.question} item={item} />
                    ))
                }

                <button className={style.btn} type='submit'>Отправить</button>
            </form>
        </div>
    )
}

export default Test
