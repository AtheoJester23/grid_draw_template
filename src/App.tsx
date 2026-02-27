import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CurrentTab from './components/CurrentTab'
import NoSelected from './pages/NoSelected'
import { useEffect, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux'
import type { AppDispatch } from './state/store'
import { setFrame, setZoom } from './state/EditConfig/EditSlice'

function App() {
  const [menuPos, setMenuPos] = useState<{x: number, y: number} | null>(null)
  const [settings, setSettings] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const handleRightClick = (e: MouseEvent) => {
      e.preventDefault()
      setMenuPos({x: e.clientX, y: e.clientY})
      setSettings(true);
      console.log(`Right click triggereds = x: ${e.clientX} y: ${e.clientY}`)
    }

    window.addEventListener("contextmenu", handleRightClick);

    return () => {
      window.removeEventListener("contextmenu", handleRightClick)
    }
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if(e.ctrlKey){
        e.preventDefault();
        if(e.deltaY > 0) {
          handleZoomOut();
          return;
        }else if(e.deltaY < 0) {
          handleZoomIn();
          return;
        }
      }
      
      dispatch((dispatch, getState) => {
        const currentYPos = getState().editFile.frame

        if(e.deltaY > 0){
          dispatch(setFrame({...currentYPos, y: currentYPos.y - 50}))
        }else if(e.deltaY < 0){
          dispatch(setFrame({...currentYPos, y: currentYPos.y + 50}))
        }
      })

      console.log("Global wheel deltaY:", e.deltaY);
    };
    

    window.addEventListener("wheel", handleWheel, {passive: false});

    // Cleanup when component unmounts
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleClose = () => setSettings(false)

  const handleZoomIn = () => {
    dispatch((dispatch, getState) => {
      const currentZoom = getState().editFile.zoom;
      if((currentZoom + 0.2) > 3) return;
      dispatch(setZoom(currentZoom + 0.2))
    })
    setSettings(false)
  }

  const handleZoomOut = () => {
    dispatch((dispatch, getState) => {
      const currentZoom = getState().editFile.zoom;
      if((currentZoom - 0.2) < 0.5) return;
      dispatch(setZoom(currentZoom - 0.2))
    })
    setSettings(false)
  }

  const handleResetFrame = () => {
      dispatch(setZoom(1))
      dispatch(setFrame({x: 0, y:0}))
      setSettings(false)
  }

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
      <AnimatePresence>
        {settings && menuPos && (
          <Dialog open={settings} onClose={handleClose} className="fixed inset-0 z-[1002]">
            <motion.div
              className="absolute bg-white shadow-lg"
              style={{
                top: menuPos.y,
                left: menuPos.x,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <DialogPanel className="p-1 text-[rgb(23,23,23)]">
                <ul onClick={(e) => {
                    const target = e.target as HTMLElement;
                    
                    if(target.textContent == "Fit on screen"){
                      handleResetFrame()
                    }else if(target.textContent == "Zoom in"){
                      handleZoomIn()
                    }else if(target.textContent == "Zoom out"){
                      handleZoomOut()
                    }
                    
                  }}
                  className='text-sm overflow-hidden'
                >
                  <li className='truncate hover:bg-blue-400 w-full px-5 select-none'>Fit on screen</li>
                  <li className='truncate hover:bg-blue-400 w-full px-5 select-none'>Zoom in</li>
                  <li className='truncate hover:bg-blue-400 w-full px-5 select-none'>Zoom out</li>
                </ul>
              </DialogPanel>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
