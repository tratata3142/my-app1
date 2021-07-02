import React, { FC } from 'react'
import s from './Cart.module.scss'
import cartImg from '../assets/img/cart.png'
import trash from '../assets/img/trash.svg'
import PizzaCart from '../Components/PizzaCart/PizzaCart'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { actions } from '../redux/cart'
import { Link } from 'react-router-dom'
import EmptyCart from '../Components/EmptyCart/EmptyCart'


const Cart:FC = () => {
    const dispatch = useDispatch()
    const {items,totalCount,totalPrice} = useSelector(({cartReducer}:RootState) => cartReducer)

    const onClearCart=()=>{
        if(window.confirm('Вы действительно хотите очистить корзину?')){
            dispatch(actions.clearCart())
        }
    }
    const onPlusItem=(id:number)=>{
        dispatch(actions.plusCartItem(id))
    }
    const onMinusItem=(id:number)=>{
        dispatch(actions.minusCartItem(id))
    }
    const onRemoveItem=(id:number)=>{
        if(window.confirm('Вы действительно хотите удалить?')){
            dispatch(actions.removeCartItem(id))
            }
        }

    const addedPizzas=Object.keys(items).map((key)=>{
        return items[key].items[0]
    })

                
    if(!totalCount){
        return <EmptyCart/>
    }
    return (
        <div className={s.cartContainer}>
            <div className={s.cartTop}>
                <div className={s.topLeft}>
                <img width='29' height='29' src={cartImg} alt="cart" />
                <h1>Корзина</h1>
                </div>
                <div onClick={onClearCart} className={s.topRight}>
                    <img src={trash} alt="trash" />
                    Очистить корзину
                </div>  
            </div>
            <div>
                {addedPizzas.map((obj)=>(
                    <PizzaCart 
                    key={obj.id}
                    onPlusItem={onPlusItem}
                    onMinusItem={onMinusItem}
                    onRemoveItem={onRemoveItem}
                    pizza={obj}
                    totalPrice={items[obj.id].totalPrice}
                    totalCount={items[obj.id].items.length}
                    />
                ))}
            </div>

            <div className={s.cartBottom}>
                <div className={s.botLeft}>
                    <p>Всего пицц:<b>{totalCount}шт.</b></p>
                    <div className={s.inMain}>
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                        <Link to='/'>
                            <p>Вернутся назад</p> 
                        </Link>             
                    </div>
                </div>
                <div className={s.botRight}>
                    <p>Сумма заказа:<b>{totalPrice} Р</b></p>
                    <div className={s.pay}>
                        <p>Оплатить сейчас</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Cart
