import { Dialog, DialogPanel } from '@headlessui/react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { AppDispatch, RootState } from '../../state/store'
import { useDispatch, useSelector } from 'react-redux'
import { setFiles, setNewFile } from '../../state/Files/FileSlice'
import { useRef, useState, type FormEvent } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

type possibleErrs = {
    name: boolean,
    size: boolean,
    border: boolean
}

const NewFile = () => {
    const [errors, setErrors] = useState<possibleErrs>({name: false, size: false, border: false})

    const openNew = useSelector((state: RootState) => state.fileHolder.newFile);
    const dispatch = useDispatch<AppDispatch>()

    const checkboxRef = useRef<HTMLInputElement>(null)
    const toggleCheckbox = () => {
        if (checkboxRef.current) {
        checkboxRef.current.checked = !checkboxRef.current.checked;
        }
    };

    const fileholder = useSelector((state: RootState) => state.fileHolder.files)
    const navigate = useNavigate();

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
            errs = {...errors}
            return;
        }

        const saveFile = {
            name,
            size,
            border: border == "on" ? true : false
        }
        
        dispatch((dispatch, getState) => {
            const currentFiles = getState().fileHolder.files;
            dispatch(setFiles([...currentFiles, saveFile]))
        })
        
        // toast.success("New file created!", {
        //     autoClose: 1000,
        // })
        dispatch(setNewFile(false))

        console.log(fileholder);

        navigate(`/tab/${fileholder.length}`)
    }

  return (
    <>
        <Dialog open={openNew} onClose={() => dispatch(setNewFile(false))}>
            {/* Draggable panel */}
            <motion.div
                drag
                dragMomentum={false}
                className="fixed top-20 left-1/2 -translate-x-1/2 max-sm:w-auto w-[50%] shadow-xl cursor-grab active:cursor-grabbing z-30"
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
                            onClick={() => dispatch(setNewFile(false))}
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
                                <button type='button' onClick={() => dispatch(setNewFile(false))} className='px-5 py-2 border border-gray-500 hover:border-blue-500 hover:bg-blue-100 w-full duration-300'>Cancel</button>
                            </div>
                        </motion.form>
                </DialogPanel>
            </motion.div>
        </Dialog> 
    </>
  )
}

export default NewFile
