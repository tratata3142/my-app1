import { InferActionsTypes } from "./store"

const initialState={
    items:{} as any,
    totalPrice:0 as any,
    totalCount:0 as any,
    
}
type TinitialState=typeof initialState


const getTotalPrice = (arr:number[]) => arr.reduce((sum:number, obj:any) => obj.price + sum, 0)

const _get = (obj:any, path:string) => {
  const [firstKey, ...keys] = path.split('.')
  return keys.reduce((val:any, key:any) => {
    return val[key]
  }, obj[firstKey])
}

const getTotalSum = (obj:any, path:string) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path)
    return sum + value
  }, 0)
}

const cartReducer=(state=initialState,action:ActionsTypes):TinitialState=>{
    switch(action.type){
        case'ADD_PIZZA_TO_CART':{
            const currentPizzaItems= !state.items[action.payload.id]
                ? [action.payload]
                : [...state.items[action.payload.id].items,action.payload]

            
            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items:currentPizzaItems,
                    totalPrice:getTotalPrice(currentPizzaItems)
                }
            }
          
            const totalCount=getTotalSum(newItems, 'items.length')
            const totalPrice = getTotalSum(newItems,'totalPrice')

            return {
                ...state,
                items:newItems,
                totalCount,
                totalPrice,
            }
        }
        case 'CLEAR_CART':
            return{
                ...state,
                items:{},
                totalPrice:0,
                totalCount:0
            }
        case "PLUS_CART_ITEM":{
            const newObjItems=[
                ...state.items[action.payload].items,
                state.items[action.payload].items[0]
            ]
            const newItems={
                ...state.items,
                [action.payload]:{
                    items:newObjItems,
                    totalPrice:getTotalPrice(newObjItems)
                }  
            }
            const totalCount=getTotalSum(newItems, 'items.length')
            const totalPrice = getTotalSum(newItems,'totalPrice')
            return{
                ...state,
                items:newItems,
                totalCount,
                totalPrice
            }
        }
            
        case "MINUS_CART_ITEM":{
            const oldItems=state.items[action.payload].items
            const newObjItems=
            oldItems.length > 1 
                    ? state.items[action.payload].items.slice(1)
                    :oldItems
            const newItems={
                ...state.items,
                [action.payload]:{
                    items:newObjItems,
                    totalPrice:getTotalPrice(newObjItems)
                }
            }  
            const totalCount=getTotalSum(newItems, 'items.length')
            const totalPrice = getTotalSum(newItems,'totalPrice')

            return{
                ...state,
                items:newItems,
                totalCount,
                totalPrice
            }
        }
        case 'REMOVE_CART_ITEM':{
            const newItems={
                ...state.items,
            }
            const currentTotalPrice=newItems[action.payload].totalPrice
            const currentTotalCount=newItems[action.payload].items.length
            delete newItems[action.payload]
            return{
                ...state,
                items:newItems,
                totalPrice:state.totalPrice - currentTotalPrice,
                totalCount:state.totalCount - currentTotalCount,
                
            }
        }   
        default:
            return state
    }
}


type ActionsTypes=InferActionsTypes<typeof actions>
export const actions={
    addPizzaToCart:(obj:any)=>({type:'ADD_PIZZA_TO_CART',payload:obj}as const),
    clearCart:()=>({type:'CLEAR_CART'}as const),
    plusCartItem:(id:number)=>({type:'PLUS_CART_ITEM',payload:id}as const),
    minusCartItem:(id:number)=>({type:'MINUS_CART_ITEM',payload:id}as const),
    removeCartItem:(id:number)=>({type:'REMOVE_CART_ITEM',payload:id}as const)
}


export default cartReducer