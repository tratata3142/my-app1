import React from 'react'
import { Link } from 'react-router-dom'
import emptyCart from '../../assets/img/emtyCart.png'
import s from './emptyCart.module.scss'

const EmptyCart = () => {
    return (
        <div>
            <div className={s.emptyCartContainer}>
                <h1>Корзина пустая</h1>
                <p>Вероятней всего, вы не заказывали ещё пиццу.
                    Для того, чтобы заказать пиццу, перейди на главную страницу.</p>
                <img src={emptyCart} alt="empty cart" />
                <Link to='/'>
                    <div className={s.backHome}><b>Вернутся назад</b></div>
                </Link>
                
            </div>
        </div>
    )
}

export default EmptyCart
