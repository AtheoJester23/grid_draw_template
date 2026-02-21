import {motion} from 'framer-motion'
import { useState } from 'react'
import { Dialog, DialogPanel} from '@headlessui/react';

const Navbar = () => {
    const [openFile, setOpenFile] = useState<boolean>(false)


  return (
    <>
        <motion.div 
            className='h-[35px] py-1 px-3 flex items-center text-[rgb(234,231,230)] bg-gradient-to-t from-[rgb(77,77,77)] to-[rgb(85,85,85)]'
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 30, duration: 0.5 }}  
        >
            <img src="logo.png" className="w-5 h-5 me-2" alt="" />
            <div className='relative'>
                <button onClick={() => setOpenFile(true)} className={`gradientBtn leading-none px-3 py-1 rounded text-sm ${openFile && "bg-[rgb(50,50,50)]!"}`}>File</button>
                <Dialog open={openFile} onClose={setOpenFile} className={"absolute top-10 left-10"}>
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
                        <DialogPanel className="text-sm w-auto leading-none p-1 text-[rgb(23,23,23)] relative">
                            <button className='leading-none hover:bg-blue-500 hover:text-white px-5 py-1'>New</button>
                        </DialogPanel>
                    </motion.div>
                </Dialog>
            </div>
        </motion.div>
    </>
  )
}

export default Navbar
