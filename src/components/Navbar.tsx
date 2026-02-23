import {motion} from 'framer-motion'
import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Dialog, DialogPanel} from '@headlessui/react';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../state/store';
import { setDownload, setFiles, setGraycale, setNewFile } from '../state/Files/FileSlice';
import { toast, ToastContainer } from 'react-toastify';

type possibleErrs = {
    name: boolean,
    size: boolean,
    border: boolean
}

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

    const handleBnW = () => {
        dispatch((dispatch, getState) => {
            const currentState = getState().fileHolder.grayscale;
            dispatch(setGraycale(!currentState))
        })
    }

  return (
    <div className='relative z-20'>
        <div className='absolute top-0 left-0 right-0 bg-[rgb(30,30,30)] flex flex-col gap-0.5'>
            <motion.div 
                className='navbarStyle'
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 30, duration: 0.5 }}  
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
                                <button onClick={()=> handleNew()} className='leading-none hover:bg-blue-500 hover:text-white px-5 py-1'>New...</button>
                                <button onClick={()=> handleDl()} className='leading-none hover:bg-blue-500 hover:text-white px-5 py-1 text-gray-500'>Download</button>
                            </DialogPanel>
                        </motion.div>
                    </Dialog>
                    <a href={"https://www.youtube.com/@AtheoCodes"} target='_blank' className={`gradientBtn leading-none px-3 py-[1.5px] ms-1 rounded text-sm`}>Tutorial</a>
                </div>
            </motion.div>
            <div className='navbarStyle flex gap-4'>
                <div className='flex text-sm items-center gap-2'>
                    <label htmlFor="grids">Grids:</label>
                    <select className='border border-[rgb(23,23,23)] max-sm:px-1 px-3 bg-[rgb(23,23,23)] rounded'>
                        <option value="1x1 inches" className='text-[rgb(23,23,23)] bg-[rgb(234,231,230)]'>1x1 inch boxes</option>
                        <option value="2x2 inches" className='text-[rgb(23,23,23)] bg-[rgb(234,231,230)]'>2x2 inch boxes</option>
                        <option value="3x3 inches" className='text-[rgb(23,23,23)] bg-[rgb(234,231,230)]'>3x3 inch boxes</option>
                        <option value="4x4 inches" className='text-[rgb(23,23,23)] bg-[rgb(234,231,230)]'>4x4 inch boxes</option>
                    </select>
                </div>

                <div className='w-[1.5px] h-full bg-[rgb(50,50,50)] rounded'/>

                <div className='flex items-center gap-1'>
                    <input type="checkbox" name='borderChkbx'/>
                    <label htmlFor="borderChkbx">Border</label>
                </div>

                <div className='w-[1.5px] h-full bg-[rgb(50,50,50)] rounded'/>
                
                <div className='flex items-center gap-1'>
                    <input type="checkbox" name='bnwChkbx' onChange={() => handleBnW()}/>
                    <label htmlFor="bnwChkbx" className='max-sm:hidden'>Black & White...</label>
                    <label htmlFor="bnwChkbx" className='min-md:hidden'>B&W</label>
                </div>
            </div>
        </div>

        <ToastContainer theme='dark'/>
    </div>
  )
}

export default Navbar
