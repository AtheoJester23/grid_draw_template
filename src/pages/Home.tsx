import {motion} from 'framer-motion'
import { useSelector } from 'react-redux'
import type { RootState } from '../state/store'
import BottomNav from '../components/BottomNav';
import { useState } from 'react';

const Home = () => {
  const fileManager = useSelector((state: RootState) => state.fileHolder.files);
  
  console.log(fileManager);

  const [selected, setSelected] = useState("4x6")

  return (
    <>
      <div className="grid place-items-center h-screen">
        {selected == "4x6" && 
          <div className="mt-8 bg-white h-[600px] w-[400px]">
            <motion.img drag dragMomentum={false} src="logo.png" className="w-50" />
          </div>
        }
      </div>
      <BottomNav/>
    </>
  )
}

export default Home
