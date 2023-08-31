import React, { useEffect, useState } from 'react';
import style from './answers.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Answers() {

  const [answers, setAnswers] = useState([])
  const [filterSortedAnswers, setFilterSortedAnswers] = useState([])
  const [categories, setCategories] = useState([])

  const [selectedCategories, setSelectedCategories] = useState('all')
  const [sortBy, setSortBy] = useState('none')

  useEffect(() => {
    axios('http://localhost:3333/answers')
    .then(({data}) => {
      setAnswers(data);
      setFilterSortedAnswers(data);
      
      const uniqueCategories = [...new Set(data.map((item) => item.category))]
      setCategories(uniqueCategories)
    })
  },[])

  useEffect(() => {
    let filtered = answers

    if(selectedCategories !== 'all'){
      filtered = answers.filter((item) => item.category === selectedCategories);
    }

    const sortedAnswers = [...filtered].sort((a, b) => {
      switch(sortBy){
        case 'category-abc':
          return a.category.localeCompare(b.category);

        case 'category-cba':
          return b.category.localeCompare(a.category);
          
          case 'point-more':
            return b.point - a.point
  
          case 'point-lower':
            return a.point - b.point
        default:
          return 0
      }
    })

    setFilterSortedAnswers(sortedAnswers)
  },[sortBy, selectedCategories, answers])

  return (
    <div className={style.Answers}>
    <button className={style.btn}><Link to='/'>Назад</Link></button>
      <h2 className={style.title}>Ответы</h2>

      <div className={style.filters}>
        <label>Филтер по категории: 
          <select className={style.select} value={selectedCategories} onChange={(e) => {setSelectedCategories(e.target.value)}}>

            <option className={style.option} value='all'>All</option>

            {categories.map((category) => (
            <option className={style.option} key={category} value={category}>{category}</option>
            ))}

          </select>
        </label>

        <label>Сортировать по: 
          <select className={style.select} value={sortBy} onChange={(e) => {setSortBy(e.target.value)}}>

            <option className={style.option} value='none'>Hе сортировать</option>
            <option className={style.option} value='category-abc'>По категории (ABC)</option>
            <option className={style.option} value='category-cba'>По категории (CBA)</option>
            <option className={style.option} value='point-more'>наибольший балл</option>
            <option className={style.option} value='point-lower'>Hаименьший балл</option>

          </select>
        </label>
      </div>

      <div className={style.block}>
        <table className={style.table}>
          <tr className={style.row}>
            <th className={style.th}>User id</th>
            <th className={style.th}>Name</th>
            <th className={style.th}>Point</th>
            <th className={style.th}>Category</th>
            <th className={style.th}>Action</th>
          </tr>

          {
            filterSortedAnswers.map((item) => (
              <tr key={item.id}>
                <td className={style.td}>{item.id}</td>
                <td className={style.td}>{item.name}</td>
                <td className={style.td}>{item.point}</td>
                <td className={style.td}>{item.category}</td>
                <td className={style.td}>
                <Link to={`/answers/${item.category}/${item.name}/${item.id}`}>
                  <button className={style.btn}>Посмотреть ответы</button>
                </Link>
                </td>
              </tr>
            ))
          }

        </table>
      </div>

    </div>
  );
}

export default Answers;
