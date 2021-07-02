import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { PizzaType } from '../../../types'
import Pizza from './Pizza'
import s from './Pizzas.module.scss'



type PropsType={
    pizzas:PizzaType[]
}
const Pizzas:FC<PropsType> = ({pizzas}) => {
    const {items} = useSelector(({cartReducer}:RootState) => cartReducer)

    return (
        <div className={s.pizzas}>
            {pizzas.map((pizza:PizzaType)=>
                <Pizza key={pizza.id} pItemsInCart={items[pizza.id] && items[pizza.id].items.length} pizza={pizza}/> 
            )}
        </div>
    )
}

export default Pizzas
