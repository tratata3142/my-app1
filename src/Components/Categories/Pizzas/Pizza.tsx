import React, { FC, useState } from 'react'
import { PizzaType } from '../../../types'
import s from './Pizzas.module.scss'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { actions } from '../../../redux/cart'


type PropsType={
    pizza:PizzaType
    pItemsInCart:any
}
const Pizza:FC<PropsType> = ({pizza,pItemsInCart}) => {
    const dispatch = useDispatch()
    const availableTypes:string[] =['тонкое','традиционное']
    const availableSizes:number[] =[26,30,40]
    
    const [activeType, setActiveTiype] = useState<number>(pizza.types[0])
    const [activeSize, setActiveSize] = useState<number>(0)

    const onAddPizza=()=>{
        const obj={
            id:pizza.id,
            name:pizza.name,
            imageUrl:pizza.imageUrl,
            price:pizza.price,
            size:availableSizes[activeSize],
            type:availableTypes[activeType],
        }
        dispatch(actions.addPizzaToCart(obj))
    }
    

    return (   
            <div className={s.pizzaItem} key={pizza.id}>
                <img src={pizza.imageUrl} alt="pizza" />
                <div className={s.pizzaName} >{pizza.name}</div>
                <div className={s.pizzaParameters}>
                    <div className={s.pizzaType}>
                        {availableTypes.map((type,i)=>(
                            <span className={cn({[s.active]:activeType===i,[s.disabled]:!pizza.types.includes(i)})}
                             onClick={()=>setActiveTiype(i)} key={i}>{type}</span>
                        ))}
                    </div>
                    <div className={s.sizes}>
                    {availableSizes.map((size,i)=>(
                        <span className={cn({[s.active]:activeSize===i,[s.disabled]:!pizza.sizes.includes(size)})}
                         onClick={()=>setActiveSize(i)} key={i}>{size} см.</span>
                    ))}
                    </div>
                </div>
                <div className={s.price} >{pizza.price} ₽</div>
                <div className={s.addPizzaCart} onClick={()=>onAddPizza()}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill="#EB5A1E"/>
                </svg>
                    Добавить
                    {pItemsInCart &&
                        <div className={s.iInCart}><b>{pItemsInCart}</b></div>          
                    }
                </div>

            </div>
    )
}

export default Pizza
