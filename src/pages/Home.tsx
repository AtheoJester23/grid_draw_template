import {motion} from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../state/store'
import BottomNav from '../components/BottomNav';
import { setFrame } from '../state/EditConfig/EditSlice';
import { Plus } from 'lucide-react';
import NewFile from '../components/Pops/NewFile';
import DeleteWarning from '../components/Pops/DeleteWarning';
import { Outlet } from 'react-router-dom';
import { setNewFile } from '../state/Files/FileSlice';
import Navbar from '../components/Navbar';

const Home = () => {
  const currentPosition = useSelector((state: RootState) => state.editFile.frame);
  const zoomVal = useSelector((state: RootState) => state.editFile.zoom)
  const fileManager = useSelector((state: RootState) => state.fileHolder.files);

  const dispatch = useDispatch<AppDispatch>()
  
  console.log(fileManager);

  return (
    <>
      <div className='relative overflow-hidden'>
        <Navbar/>
        <motion.div 
          drag
          dragMomentum={false}
          animate={{ scale: zoomVal, x: currentPosition.x, y: currentPosition.y }}
          onDragEnd={(_, info) => {
            dispatch((dispatch, getState) => {
              const currentPosition = getState().editFile.frame;
              dispatch(setFrame({
                x: currentPosition.x + info.offset.x,
                y:currentPosition.y + info.offset.y,
              }))
            })
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="grid place-items-center h-screen hover:cursor-grab active:cursor-grabbing"
        >
          {fileManager.length < 1 ? (
            <div onClick={() => dispatch(setNewFile(true))} className='flex flex-col text-gray-500 justify-center items-center p-5 border border-3 border-gray-500 border-dashed rounded h-[70%] w-[70%] cursor-pointer'>
              <Plus className='' size="100"/>
              <p className='text-3xl font-bold'>New File</p>
            </div>
          ):(
            <Outlet/>
          )}
        </motion.div>
        <BottomNav/>
      </div>
      <NewFile/>
      <DeleteWarning/>
    </>
  )
}

export default Home
