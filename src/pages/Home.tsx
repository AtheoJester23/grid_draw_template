import {motion} from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../state/store'
import BottomNav from '../components/BottomNav';
import { useRef, useState } from 'react';
import { setFrame } from '../state/EditConfig/EditSlice';
import Download from '../components/Pops/Download';

const Home = () => {
  const currentPosition = useSelector((state: RootState) => state.editFile.frame);
  const zoomVal = useSelector((state: RootState) => state.editFile.zoom)
  const fileManager = useSelector((state: RootState) => state.fileHolder.files);
  const ref = useRef(null);

  const dispatch = useDispatch<AppDispatch>()
  
  console.log(fileManager);

  const [selected, setSelected] = useState("4x6")

  return (
    <>
      <div className='relative overflow-hidden'>
        <motion.div 
          ref={ref}
          drag
          dragMomentum={false}
          animate={{ scale: zoomVal, x: currentPosition.x, y: currentPosition.y }}
          onDragEnd={(e, info) => {
            dispatch((dispatch, getState) => {
              const currentPosition = getState().editFile.frame;
              dispatch(setFrame({
                x: currentPosition.x + info.offset.x,
                y:currentPosition.y + info.offset.y,
              }))
            })
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="grid place-items-center h-screen overflow-y-hidden hover:cursor-grab active:cursor-grabbing"
        >
          {selected == "4x6" && 
            <motion.div 
              className="mt-8 bg-white regular4x6 max-sm:phone4x6 flex justify-center items-center"
            >
              <motion.img drag dragMomentum={false} src="logo.png" className="w-50" />
            </motion.div>
          }
        </motion.div>
        <BottomNav/>
      </div>
      <Download theRef={ref}/>
    </>
  )
}

export default Home
