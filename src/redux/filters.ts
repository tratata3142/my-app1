import { InferActionsTypes } from "./store"

const initialState = {
    category:null as null|number,
    sortBy:{
        type:'popular',
        order:'desc',
    }
}

const filterReducer=(state=initialState,action:ActionsTypes):InitialState=>{
    switch(action.type){
        case 'SET_CATEGORY':
            return{
                ...state,
                category:action.payload
            }
        case'SET_SORT_BY':
            return{
                ...state,
                sortBy:action.payload
            }
        default:
            return state
    }
}

type ActionsTypes=InferActionsTypes<typeof actions>
export const actions={
    setCategory:(payload:number|null)=>({type:'SET_CATEGORY',payload}as const),
    setSortBy:(type:string,order:string)=>({type:'SET_SORT_BY',payload:{type,order}}as const)
}


export default filterReducer

type InitialState=typeof initialState