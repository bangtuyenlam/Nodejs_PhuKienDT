import React from 'react';
import Login from './component/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './component/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App