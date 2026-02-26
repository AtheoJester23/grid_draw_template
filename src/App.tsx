import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import CurrentTab from './components/CurrentTab'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="" element={<Home/>}>
            <Route path='/tab/:id' element={<CurrentTab/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
