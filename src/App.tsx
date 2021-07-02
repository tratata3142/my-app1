import React from 'react';
import Header from './Components/Header/Header';
import s from './App.module.scss'
import Main from './pages/Main';
import { Route } from 'react-router-dom';
import Cart from './pages/Cart';



function App() {
  return (
    <div className={s.app}>
      <div className={s.container}>
        <Header />  
        <hr/>
        <Route path='/' component={Main} exact/>
        <Route path='/cart' component={Cart}/>
      </div>
    </div>
  );
}

export default App;
