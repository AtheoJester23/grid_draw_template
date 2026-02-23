import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import CurrentTab from './components/CurrentTab'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home/>}>
            <Route path='/tab/:tabNum' element={<CurrentTab/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
