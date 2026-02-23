import {motion} from 'framer-motion'
import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Dialog, DialogPanel} from '@headlessui/react';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../state/store';
import { setFiles } from '../state/Files/FileSlice';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

type possibleErrs = {
    name: boolean,
    size: boolean,
    border: boolean
}

const Navbar = () => {
    const [openFile, setOpenFile] = useState<boolean>(false)
    const [openNew, setOpenNew] = useState<boolean>(false);
    const [errors, setErrors] = useState<possibleErrs>({name: false, size: false, border: false})
    
    const checkboxRef = useRef<HTMLInputElement>(null)
    const fileholder = useSelector((state: RootState) => state.fileHolder.files)
    const dispatch = useDispatch<AppDispatch>()

    const handleNew = () => {
        setOpenFile(false)
        setOpenNew(true)
    }

    const toggleCheckbox = () => {
        if (checkboxRef.current) {
        checkboxRef.current.checked = !checkboxRef.current.checked;
        }
    };

    const handleNewFile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const size = formData.get("size") as string;
        const border = formData.get("border");

        let errs = {...errors};

        if(!name || name.replace(/[ ]/g, "") == ""){
            errs.name = true
        }

        if(!size || size.replace(/[ ]/g, "") == ""){
            errs.size = true
        }

        if(Object.values(errs).includes(true)){
            setErrors(errs);
            toast.error("Failed to create new file!")
            errs = {...errors}
            return;
        }

        const saveFile = {
            name,
            size,
            border: border == "on" ? true : false
        }
        
        dispatch(setFiles([...fileholder, saveFile]))
        
        toast.success("New file created!")
        setOpenNew(false)
    }

    const handleTest = () => {
        console.log(errors.name)
    }

  return (
    <div className='relative z-20'>
        <motion.div 
            className='absolute top-0 left-0 right-0 navbarStyle'
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 30, duration: 0.5 }}  
        >
            <img src="logo.png" className="w-5 h-5 me-2" alt="" />
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
                            <button onClick={()=> handleNew()} className='leading-none hover:bg-blue-500 hover:text-white px-5 py-1 text-gray-500'>Download</button>
                        </DialogPanel>
                    </motion.div>
                </Dialog>
                <a href={"https://www.youtube.com/@AtheoCodes"} target='_blank' className={`gradientBtn leading-none px-3 py-1 rounded text-sm ${openFile && "bg-[rgb(50,50,50)]!"}`}>Tutorial</a>
            </div>
        </motion.div>
        <div className='absolute flex max-sm:gap-1 gap-3 top-9.25 left-0 right-0 h-[35px] bg-green-500 navbarStyle'>
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
                <input type="checkbox" name='bnwChkbx'/>
                <label htmlFor="bnwChkbx" className='max-sm:hidden'>Black & White...</label>
                <label htmlFor="bnwChkbx" className='min-md:hidden'>B&W</label>
            </div>
        </div>
        <Dialog open={openNew} onClose={setOpenNew}>
        {/* Draggable panel */}
        <motion.div
            drag
            dragMomentum={false}
            className="fixed top-20 left-1/2 -translate-x-1/2 max-sm:w-auto w-[50%] shadow-xl cursor-grab active:cursor-grabbing"
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
                        onSubmit={(e) => handleNewFile(e)}
                        className="flex max-sm:flex-col gap-3 p-5"
                    >
                        <motion.div className="flex flex-1 flex-col gap-3">
                            <div className="flex gap-2 items-center">
                                <label htmlFor="name">Name: </label>
                                <input
                                    type="text"
                                    onChange={() => setErrors(prev => ({...prev, name: false}))}
                                    className={`p-2 border ${errors.name === false ? "border-gray-500" : "border-red-500"} w-full`}
                                    placeholder="Untitled"
                                    name='name'
                                />
                            </div>

                            <div className="flex gap-2 items-center">
                                <label htmlFor="size">Size: </label>
                                <select name='size' className="w-full border border-gray-500 p-2">
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
                                <input name="border" type="checkbox" ref={checkboxRef} />
                                    <label>Border</label>
                                </button>
                            </div>
                        </motion.div>

                        <div className='flex flex-col gap-2 '>
                            <button className='px-5 py-2 border w-full border-blue-500 hover:shadow-none shadow-[inset_0_0_10px_rgba(59,130,246,0.5)] duration-300'>Continue</button>
                            <button type='button' onClick={() => setOpenNew(false)} className='px-5 py-2 border border-gray-500 hover:border-blue-500 hover:bg-blue-100 w-full duration-300'>Cancel</button>
                            <button type='button' onClick={() => handleTest()} className='px-5 py-2 border border-gray-500 hover:border-blue-500 hover:bg-blue-100 w-full duration-300'>Test</button>
                        </div>
                    </motion.form>
            </DialogPanel>
        </motion.div>
        </Dialog>
        <ToastContainer theme='dark'/>
    </div>
  )
}

export default Navbar
