import {motion} from 'framer-motion'
import { useRef, useState } from 'react'
import { Dialog, DialogPanel} from '@headlessui/react';
import { X } from 'lucide-react';

const Navbar = () => {
    const [openFile, setOpenFile] = useState<boolean>(false)
    const [openNew, setOpenNew] = useState<boolean>(false);
    const checkboxRef = useRef<HTMLInputElement>(null)

    const handleNew = () => {
        setOpenFile(false)
        setOpenNew(true)
    }

    const toggleCheckbox = () => {
        if (checkboxRef.current) {
        checkboxRef.current.checked = !checkboxRef.current.checked;
        }
    };

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
                            <button onClick={()=> handleNew()} className='leading-none hover:bg-blue-500 hover:text-white px-5 py-1'>New...</button>
                        </DialogPanel>
                    </motion.div>
                </Dialog>
            </div>
        </motion.div>
        <Dialog open={openNew} onClose={setOpenNew}>
            

            {/* Draggable panel */}
            <motion.div
                drag
                dragMomentum={false}
                className="fixed top-20 left-1/2 -translate-x-1/2 w-[50%] shadow-xl cursor-grab active:cursor-grabbing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "tween", duration: 0.3 }}
            >
                <DialogPanel className="text-sm w-auto leading-none p-1 text-[rgb(23,23,23)] relative bg-white">
                    
                    {/* Drag Handle */}
                    <motion.div
                        className="flex justify-between p-1 text-sm cursor-grab active:cursor-grabbing"
                        >
                        <p>New</p>
                        <button
                            className="cursor-pointer"
                            onClick={() => setOpenNew(false)}
                        >
                            <X size={20} />
                        </button>
                        </motion.div>

                        <motion.form
                            className="flex gap-3 p-5"
                        >
                            <motion.div className="flex flex-1 flex-col gap-3">
                                <div className="flex gap-2 items-center">
                                <label htmlFor="name">Name: </label>
                                <input
                                    type="text"
                                    className="p-2 border border-gray-500 w-full"
                                    placeholder="Untitled"
                                />
                                </div>

                                <div className="flex gap-2 items-center">
                                <label htmlFor="size">Size: </label>
                                <select className="w-full border border-gray-500 p-2">
                                    <option value="A4">A4</option>
                                    <option value="6x8">6x8 inches</option>
                                    <option value="4x6">4x6 inches</option>
                                </select>
                                </div>

                                <div>
                                    <button
                                        type="button"
                                        onClick={() => toggleCheckbox()}
                                        className="flex items-center gap-2 p-2"
                                    >
                                    <input type="checkbox" ref={checkboxRef} />
                                        <label>Border</label>
                                    </button>
                                </div>
                            </motion.div>

                            <div className='flex flex-col gap-2 '>
                                <button className='px-5 py-2 border w-full border-blue-500 hover:shadow-none shadow-[inset_0_0_10px_rgba(59,130,246,0.5)] duration-300'>Continue</button>
                                <button type='button' onClick={() => setOpenNew(false)} className='px-5 py-2 border border-gray-500 hover:border-blue-500 hover:bg-blue-100 w-full duration-300'>Cancel</button>
                            </div>
                        </motion.form>
                </DialogPanel>
            </motion.div>
            </Dialog>
    </>
  )
}

export default Navbar
