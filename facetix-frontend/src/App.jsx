import { React } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {Register_template} from './pages/register_page'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>

    <Routes>
      <Route path='/register' element ={<Register_template/>} />
    </Routes>

  </BrowserRouter>
 
  )
}

export default App
