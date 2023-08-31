import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import style from './home.module.css';

const Home = () => {

    const [tests, setTests] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchTests(){
            try{
                const response = await axios('http://localhost:3333/tests')
                setTests(response.data)
            }catch(err){
                console.error('Error fetching tests: ' + err);
            }
        }
        fetchTests()
    }, [])

  return (
    <div className={style.Home}>
        <h2 className={style.title}>Выбирите тему для решения теста</h2>

        <div style={{display: 'flex', gap: '20px'}}>{
            tests.map((item) => (
                <div className={style.block} key={item.id} style={{width:'200px', height: '200px'}}>
                    <img className={style.img} onClick={() => navigate(`test/${item.title}`)} src={item.image}/>
                    <p className={style.text}>{item.title}</p>
                </div>
            ))
        }</div>

        <div className={style.btnBlock}>
            <Link to='/add/test'><button className={style.btn}>Создать тест</button></Link>
            <Link to='/add/question'><button className={style.btn}>Добавить вопросы</button></Link>
            <Link to='/answers'><button className={style.btn}>Посмотреть ответы</button></Link>
        </div>

    </div>
  )
}

export default Home