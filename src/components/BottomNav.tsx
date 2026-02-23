import { Minus, Plus, RotateCcw, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../state/store"
import { setFrame, setZoom } from "../state/EditConfig/EditSlice"
import { useRef } from "react"
import { setDelete, setDeleteTarget } from "../state/Files/FileSlice"
import { Link, NavLink } from "react-router-dom"

const BottomNav = () => {
  const dispatch = useDispatch<AppDispatch>()
  const intervalRef = useRef<number | null>(null);
  const currentZoomVal = useSelector((state: RootState) => state.editFile.zoom)

  const handleZoomIn = () => {
    if (intervalRef.current !== null) return;

    intervalRef.current = window.setInterval(() => {
      dispatch((dispatch, getState) => {
        const currentZoom = getState().editFile.zoom;
        if(currentZoom + 0.1 > 3.1) return;
        dispatch(setZoom(currentZoom + 0.1))
      })
    }, 50);
  };

  const handleStopZoom = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  const handleZoomOut = () => {
    if (intervalRef.current !== null) return;

    intervalRef.current = window.setInterval(() => {
      dispatch((dispatch, getState) => {
        let currentZoom = getState().editFile.zoom;
        if(currentZoom - 0.1 < 1) return;
        dispatch(setZoom(currentZoom - 0.1))
      })
    }, 50)
  }
  
  const handleResetFrame = () => {
     dispatch(setZoom(1))
     dispatch(setFrame({x: 0, y:0}))
  }

  const files = useSelector((state: RootState) => state.fileHolder.files)

  const activateDelete = (target: number) => {
    dispatch(setDeleteTarget(target))
    dispatch(setDelete(true))
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-[1.6px] bg-[rgb(23,23,23)]">
      {files.length > 0 && (
        <div className="px-2 flex gap-0.5 tabsContainer">
          {files.map((item, index) => (
            <div className="relative">
              <NavLink to={`tab/${index}`} key={index} className="tabsStyle inline-flex p-1 px-2 w-45 text-white rounded-t">
                <div className="w-full flex items-center justify-between">
                  <p className="truncate w-[80%]">{item.name}</p>
                </div>
              </NavLink>
              <button onClick={() => activateDelete(index)} className="cursor-pointer absolute right-1 top-2 text-white hover:text-red-500 duration-100">
                <X size={20}/>
              </button>
            </div>
          ))}
        </div>
      )}
      <div className='text-sm navbarStyle flex justify-end'>
        <div className="flex items-center gap-1">
          <button onClick={handleResetFrame} className="select-none gradientBtn px-2 hover:cursor-pointer duration-300" >
            <RotateCcw size={20}/>
          </button>
          <div className="select-none bg-white text-[rgb(23,23,23)] px-3 rounded">
              <p>{Math.floor(Math.min(Math.max(currentZoomVal, 1), 3) * 100)}%</p>
          </div>
          <div className="flex gap-1">
              <button 
                onMouseDown={handleZoomIn}
                onMouseUp={handleStopZoom}
                onMouseLeave={handleStopZoom}
                onTouchStart={handleZoomIn}
                onTouchEnd={handleStopZoom}
                className="hover:bg-[rgb(70,70,70)] border border-[rgb(50,50,50)] rounded hover:text-white cursor-pointer"
              >
                  <Plus size={18}/>
              </button>
              <button 
                onMouseDown={handleZoomOut} 
                onMouseUp={handleStopZoom}
                onMouseLeave={handleStopZoom}
                onTouchStart={handleZoomOut}
                onTouchEnd={handleStopZoom}
                className="hover:bg-[rgb(70,70,70)] border border-[rgb(50,50,50)] rounded hover:text-white cursor-pointer"
              >
                  <Minus size={18}/>
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomNav
