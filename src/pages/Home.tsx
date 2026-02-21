import {motion} from 'framer-motion'
import { useSelector } from 'react-redux'
import type { RootState } from '../state/store'
import BottomNav from '../components/BottomNav';

const Home = () => {
  const fileManager = useSelector((state: RootState) => state.fileHolder.files);
  
  console.log(fileManager);

  return (
    <>
      <div className="grid place-items-center h-screen">
        <div className="bg-white h-[500px] w-[333px]">
          <motion.img drag dragMomentum={false} src="logo.png" className="w-50" />
        </div>
      </div>
      <BottomNav/>
    </>
  )
}

export default Home
