import { PizzaType } from "../types"
import { BaseThunkType, InferActionsTypes } from "./store"
import axios from "axios"
import { Dispatch } from "redux"

const initialState={
    pizzas:[] as PizzaType[],
    isLoaded:false
}


const pizzasReducer=(state=initialState,action:ActionsTypes):initialStateType=>{
    switch(action.type){
        case 'SET_PIZZAS':
            return{
                ...state,
                pizzas:action.pizzas,
                isLoaded:true
            }
        case 'SET_LOADED':
            return{
                ...state,
                isLoaded:action.payload
            }

        default:
            return state
    }
}


type ActionsTypes=InferActionsTypes<typeof actions>
export const actions={
    setPizzas:(pizzas:PizzaType[])=>({type:'SET_PIZZAS',pizzas} as const),
    setLoaded:(payload:boolean)=>({type:'SET_LOADED',payload}as const),
}


export const fetchPizzas=(category:number|null,sortBy:string,order:string):ThunkType=>
    async(dispatch:DispatchType)=>{
        dispatch(actions.setLoaded(false))
        await axios.get(`/pizzas?${category !== null ? `category=${category}`:''}&_sort=${sortBy}&_order=${order}`)
        .then(({data})=>dispatch(actions.setPizzas(data)))
}



export default pizzasReducer

type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>
type initialStateType=typeof initialState