import { React } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {Register_template} from './pages/register_page'
import {Main_page} from './pages/main_page'
import {ContactUs_page} from './pages/contactus_page'
import {MisEventos_page} from './pages/miseventos_page'
import {Eventos_page} from './pages/eventos_page'


import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>

    <Routes>
      <Route path='/' element= {<Main_page/>} />
      <Route path='/register' element ={<Register_template/>} />
      <Route path='/contacto' element ={<ContactUs_page/>} />
      <Route path='/miseventos' element ={<MisEventos_page/>} />
      <Route path='/eventos/' element ={<Eventos_page/>} />
      <Route path='/eventos/:searchTerm' element ={<Eventos_page/>} />
    </Routes>

  </BrowserRouter>
 
  )
}

export default App
