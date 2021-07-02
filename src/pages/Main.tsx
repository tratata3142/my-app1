import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Categories from '../Components/Categories/Categories'
import Pizzas from '../Components/Categories/Pizzas/Pizzas'
import SortPopup from '../Components/SortPopup/SortPopup'
import { fetchPizzas } from '../redux/pizzas'
import { RootState } from '../redux/store'
import s from './Main.module.scss'

const categories:string[]=['Мясные','Вегетарианская','Гриль','Острые','Закрытые']
const sortIems = [
    { name: 'популярности', type: 'popular', order: 'desc' },
    { name: 'цене', type: 'price', order: 'desc' },
    { name: 'алфавит', type: 'name', order: 'asc' },
  ];
const Main:FC = () => {
    const dispatch = useDispatch()
    const {category,sortBy} = useSelector(({filterReducer}:RootState) => filterReducer)
    const {pizzas} = useSelector(({pizzasReducer}:RootState) => pizzasReducer)

    useEffect(() => {
        dispatch(fetchPizzas(category,sortBy.type,sortBy.order))
    }, [category,sortBy,dispatch])
  
    return (
        <div className={s.mainContainer}>
            <div className={s.contentTop}>
                <Categories categories={categories} />
                <SortPopup sortBy={sortIems}/>
            </div>
            <Pizzas pizzas={pizzas} />    
        </div>
    )
}

export default Main
