import React, { FC, useState } from 'react'
import s from './Categories.module.scss'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { actions } from '../../redux/filters'



type PropsType={
    categories:string[]
}
const Categories:FC<PropsType> = ({categories}) => {
    const dispatch = useDispatch()
    const [active, setActive] = useState<null|number>(null)

    const onActiveCategory=(idx:number|null)=>{
        setActive(idx)
        dispatch(actions.setCategory(idx))  
    }

    return (
        <ul className={s.categories}>
            <li onClick={()=>onActiveCategory(null)} className={cn(s.categoryButton,{[s.active]:active===null}) }>All</li>
               {categories.map((c,i)=>
                <li onClick={()=>onActiveCategory(i)} className={cn(s.categoryButton,{[s.active]:active===i}) } key={i}>{c}</li>
                )}   
        </ul>
    )
}

export default Categories
