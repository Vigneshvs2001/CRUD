import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Register from './components/Register'
import Login from './components/Login'
import Task from './components/Task';
function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Welcome to the MERN Auth App</h1>} />
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path="/task" element={<Task />} />
      </Routes>
    </Router>

  )
}
export default App;