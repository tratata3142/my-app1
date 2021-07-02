import { createStore, compose, applyMiddleware, combineReducers, Action} from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import pizzasReducer from './pizzas'
import filterReducer from './filters'
import cartReducer from './cart'


const rootReducer=combineReducers({
    pizzasReducer,
    filterReducer,
    cartReducer,
})

export type RootState=ReturnType<typeof rootReducer>

export type InferActionsTypes<T> = T extends {[key:string]:(...args:any[])=>infer U}? U:never
export type BaseThunkType<A extends Action,R=Promise<void>>=ThunkAction<R,RootState,unknown,A>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store