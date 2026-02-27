import {motion} from 'framer-motion'
import { useState } from 'react'
import { Dialog, DialogPanel} from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../state/store';
import { setDownload, setNewFile } from '../state/Files/FileSlice';
import { ToastContainer } from 'react-toastify';
import ItemSettings from './ItemSettings';
import { useLocation } from 'react-router-dom';


const Navbar = () => {
    const [openFile, setOpenFile] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>()

    const handleNew = () => {
        setOpenFile(false)
        dispatch(setNewFile(true))
    }

    const handleDl = () => {
        setOpenFile(false);
        dispatch(setDownload(true))
    }

    const fileList = useSelector((state: RootState) => state.fileHolder.files)

    const currentTab = useLocation()

  return (
    <div className='relative z-20'>
        <motion.div 
            className='absolute top-0 left-0 right-0 bg-[rgb(30,30,30)] flex flex-col gap-0.5'
            initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 30, duration: 0.5 }}
        >
            
            <motion.div 
                className='navbarStyle'  
            >
                <img src="/logo.png" className="w-5 h-5 me-2" alt="" />
                <div className='relative'>
                    <button onClick={() => setOpenFile(true)} className={`gradientBtn leading-none px-3 py-1 rounded text-sm ${openFile && "bg-[rgb(50,50,50)]!"}`}>File</button>
                    <Dialog open={openFile} onClose={setOpenFile} className={"absolute top-10 left-10 z-1000"}>
                        {/* Background overlay */}
                        <motion.div className="fixed inset-0" 
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                        />

                        {/* Slide-in panel */}
                        <motion.div className="overflow-y-auto bg-white"
                            initial={{y: "-10%"}}
                            animate={{y: 0}}
                            exit={{y: "-100%"}}
                            transition={{type: "tween", duration: 0.4, stiffness: 5}}
                        >
                            <DialogPanel className="flex flex-col gap-2 text-sm w-auto leading-none p-1 text-[rgb(23,23,23)] relative">
                                <button onClick={()=> handleNew()} className='leading-none hover:bg-blue-500 hover:text-white px-5 py-1 flex'>New...</button>
                                {fileList.length > 0 ? (
                                    <button onClick={()=> handleDl()} className='leading-none hover:bg-blue-500 hover:text-white px-5 py-1 text-[rgb(23,23,23)]'>Download</button>
                                ):(
                                    <div className='leading-none hover:bg-blue-500 px-5 py-1 text-gray-500 select-none flex justify-end'>Download</div>
                                )}
                            </DialogPanel>
                        </motion.div>
                    </Dialog>
                    <a href={"https://www.youtube.com/@AtheoCodes"} target='_blank' className={`gradientBtn leading-none px-3 py-[1.5px] ms-1 rounded text-sm`}>Tutorial</a>
                </div>
            </motion.div>
            
            
            <div className='navbarStyle flex gap-4 border-b-2 border-[rgb(23,23,23)]'>
                {fileList.length > 0 && currentTab.pathname.slice(0, 4) == "/tab" && (
                    <ItemSettings/>
                )}
            </div>
        </motion.div>

        <ToastContainer theme='dark'/>
    </div>
  )
}

export default Navbar
