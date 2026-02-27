import { Dialog, DialogPanel } from '@headlessui/react'
import { motion } from 'framer-motion'
import { Upload, X } from 'lucide-react'
import type { AppDispatch, RootState } from '../../state/store'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentTab, setDeleteTarget, setFiles, setNewFile } from '../../state/Files/FileSlice'
import React, { useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'

type possibleErrs = {
    name: boolean,
    size: boolean,
    border: boolean,
    pic: boolean,
}

const NewFile = () => {
    const [errors, setErrors] = useState<possibleErrs>({name: false, size: false, border: false, pic: false})
    const [imagePrev, setImagePrev] = useState<string | null>(null)
    const [imageName, setImageName] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const openNew = useSelector((state: RootState) => state.fileHolder.newFile);
    const dispatch = useDispatch<AppDispatch>()

    const fileholder = useSelector((state: RootState) => state.fileHolder.files)
    const navigate = useNavigate();

    const handleNewFile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        
        const name = formData.get("name") as string;
        const size = formData.get("size") as string;
        const border = formData.get("border");
        const grid = formData.get("grid")
        const bnw = formData.get("bnw");
        const orientation = formData.get("orientation")

        let errs = {...errors};

        if(!name || name.replace(/[ ]/g, "") == ""){
            errs.name = true
        }

        if(!size || size.replace(/[ ]/g, "") == ""){
            errs.size = true
        }
        
        if(!imagePrev){
            errs.pic = true
        }

        if(Object.values(errs).includes(true)){
            setErrors(errs);
            errs = {...errors}
            return;
        }

        const id = nanoid();

        const saveFile = {
            id,
            name,
            size,
            border,
            grid,
            pic: imagePrev,
            picState: {
                x: 0,
                y: 0,
                width: size === "A4" ? 381 : 384,
                height: size === "A4" ? 381 : 384
            },
            bnw: bnw == "on" ? true : false,
            orientation
        }
        
        dispatch((dispatch, getState) => {
            const currentFiles = getState().fileHolder.files;
            dispatch(setFiles([...currentFiles, saveFile]))
            dispatch(setCurrentTab(currentFiles.length));
            dispatch(setDeleteTarget(id))
        })
        
        // toast.success("New file created!", {
        //     autoClose: 1000,
        // })
        
        console.log(fileholder);
        
        setImagePrev(null);
        setImageName(null);
        
        if(fileInputRef.current){
            fileInputRef.current!.value = "";
        }
        
        dispatch(setNewFile(false))
        navigate(`/tab/${id}`)
    }

    const handlePickPic = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0];
        if(!file) return;

        if(!file.type.startsWith('image/')){
            alert("Please select an image file!");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            const result = reader.result;
            if(typeof result === "string"){
                setImagePrev(result)
                setImageName(file.name)
                setErrors((prev) => ({...prev, pic: false}))
            }
        }
    }

    const handleRemovePic = () => {
        setImageName(null);
        setImagePrev(null);

        if(fileInputRef.current){
            fileInputRef.current.value = "";
        }
    }

  return (
    <>
        <Dialog open={openNew} onClose={() => dispatch(setNewFile(false))}>
            {/* Draggable panel */}
            <motion.div
                drag
                dragMomentum={false}
                className="fixed top-20 left-1/2 -translate-x-1/2 border border-gray-500 max-sm:w-[80%] w-[50%] shadow-xl cursor-grab active:cursor-grabbing z-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "tween", duration: 0.3 }}
            >
                <DialogPanel className="text-sm w-full leading-none p-1 text-[rgb(23,23,23)] relative bg-white">
                    
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
                                    <div className='w-full'>
                                        <input
                                            type="text"
                                            onChange={() => setErrors(prev => ({...prev, name: false}))}
                                            className={`p-2 border ${errors.name === false ? "border-gray-500" : "border-red-500"} w-full`}
                                            placeholder="Untitled"
                                            name='name'
                                        />
                                        {errors.name && (
                                            <small className='text-red-500'>Name is required</small>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-2 items-center">
                                    <label htmlFor="size">Size: </label>
                                    <select name='size' className="w-full border border-gray-500 p-2">
                                        <option value="A4">A4</option>
                                        <option value="6x8">6x8 inches</option>
                                        <option value="4x6">4x6 inches</option>
                                    </select>
                                </div>

                                <div className="flex gap-2 items-center">
                                    <label htmlFor='border'>Border: </label>
                                    <select name='border' className="w-full border border-gray-500 p-2">
                                        <option value="noBorder">None</option>
                                        <option value="halfCm">0.5 cm</option>
                                        <option value="oneCm">1 cm</option>
                                        <option value="halfInch">0.5 inch</option>
                                        <option value="oneInch">1 inch</option>
                                    </select>
                                </div>
                                
                                <div className="flex gap-2 items-center">
                                    <label htmlFor='grid'>Grid: </label>
                                    <select name='grid' className="w-full border border-gray-500 p-2">
                                        <option value="noGrid">None</option>
                                        <option value="oneInchGrid">1x1 inches</option>
                                        <option value="twoInchGrid">2x2 inches</option>
                                        <option value="threeInchGrid">3x3 inches</option>
                                        <option value="fourInchGrid">4x4 inches</option>
                                    </select>
                                </div>

                                {!imagePrev ? (
                                    <>
                                        <div className={`border-2 border-dashed ${errors.pic == true ? "border-red-500" : "border-gray-500"} text-gray-500 flex justify-center items-center h-40`}>
                                            <label
                                                htmlFor="pic"
                                                className="flex flex-col justify-center items-center text-gray-500 text-xl cursor-pointer w-full h-full rounded-md"
                                            >
                                                <Upload/>
                                                <span>Choose Picture</span>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    name="pic"
                                                    id="pic"
                                                    accept='image/*'
                                                    className="hidden"
                                                    onChange={(e) => handlePickPic(e)}
                                                />
                                            </label>
                                        </div>
                                        {errors.pic && (
                                            <small className='text-red-500 text-sm leading-none'>Image is requried*</small>
                                        )}
                                    </>
                                ):(
                                    <div className={`flex flex-col p-2 w-full justify-center items-center border border-dashed border-2 relative cursor-default`}>
                                        <div className='max-sm:h-[150px] max-sm:w-[300px] h-[200px] w-[400px] flex gap-2'> 
                                            <img src={imagePrev} alt="Preview" className='w-full h-full object-contain'/>
                                        </div>
                                        <div className='flex w-full items-center justify-center'>
                                            <p className='p-2 truncate'>{imageName}</p>
                                        </div>
                                        <button onClick={() => handleRemovePic()} className='absolute top-2 right-2 hover:translate-y-0.25 cursor-pointer duration-200'>
                                            <X/>
                                        </button>
                                    </div>
                                )}

                                <div className='flex gap-3'>
                                    <div className='flex gap-2'>
                                        <input type="checkbox" name="bnw" id="bnw" />
                                        <label htmlFor="bnw">Black & White...</label>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <label htmlFor="portrait">
                                            <input type="radio" name="orientation" id="portrait" value={"portrait"} defaultChecked/>
                                            Portrait
                                        </label>
                                        <label htmlFor="landscape">
                                            <input type="radio" name="orientation" id="landscape" value={"landscape"} />
                                            Landscape
                                        </label>
                                    </div>
                                </div>

                            </motion.div>


                            <div className='flex flex-col gap-2 '>
                                <button className='px-5 py-2 border w-full border-blue-500 hover:shadow-none shadow-[inset_0_0_10px_rgba(59,130,246,0.5)] duration-300'>Continue</button>
                                <button type='button' onClick={() => dispatch(setNewFile(false))} className={`px-5 py-2 border hover:border-blue-500 hover:bg-blue-100 w-full duration-300`}>Cancel</button>
                            </div>
                        </motion.form>
                </DialogPanel>
            </motion.div>
        </Dialog> 
    </>
  )
}

export default NewFile
