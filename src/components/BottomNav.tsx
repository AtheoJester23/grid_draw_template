import { Minus, Plus, RotateCcw } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../state/store"
import { setFrame, setZoom } from "../state/EditConfig/EditSlice"
import { useRef } from "react"

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

  return (
    <div className='text-sm navbarStyle w-full absolute bottom-0 flex justify-end'>
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
  )
}

export default BottomNav
