import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AddQuestion from '../AddQuestion/AddQuestion';

function AddTest() {

  const {register, handleSubmit} = useForm()
  const navigate = useNavigate()

  const addTestFunc = (data) => {
    
    axios.post('http://localhost:3333/tests', data)
    .then((res) => {
      alert('тест создан')
      navigate('/')
    }).catch((err) => alert(err.maessage))
  }



  return (
    <div>
      <form onSubmit={handleSubmit(addTestFunc)}>
        <h2>Cоздать тест</h2>
        <input required {...register('title')} type='text' placeholder='Введите название теста'/>
        <input required {...register('image')} type='text' placeholder='Введите ссылку на картинку'/>
        <AddQuestion/>
        <button type='submit'>Добавить тест</button>
      </form>
    </div>

    
  );
}

export default AddTest;
