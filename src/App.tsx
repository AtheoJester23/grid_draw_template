import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CurrentTab from './components/CurrentTab'
import NoSelected from './pages/NoSelected'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home/>}>
            <Route path='' element={<NoSelected/>}/>
            <Route path='/tab/:id' element={<CurrentTab/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
