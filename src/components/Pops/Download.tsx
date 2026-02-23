import { Dialog, DialogPanel } from '@headlessui/react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../state/store'
import { setDownload } from '../../state/Files/FileSlice'
import { useState, type FormEvent, type RefObject, type SubmitEventHandler } from 'react'
import { toJpeg, toPng } from 'html-to-image'

type possibleErrors = {
    name: boolean,
    fileType: boolean
}

const Download = ({theRef, defName}: {theRef: RefObject<HTMLDivElement> | RefObject<null>, defName: string | null | undefined}) => {
    const [errors, setErrors] = useState<possibleErrors>({name: false, fileType: false})
    const isDownload = useSelector((state: RootState) => state.fileHolder.download);
    const dispatch = useDispatch<AppDispatch>()

    const handleDownload = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const fileType = formData.get("fileType")

        console.log(name, fileType);

        if(!theRef.current) return;

        let dataUrl = "";

        if(fileType == "png"){
            dataUrl = await toPng(theRef.current)
        }
        if(fileType == "jpg"){
            dataUrl = await toJpeg(theRef.current)
        }
        
        const link = document.createElement("a")
        link.download = name ?? `Untitled.${fileType}`;
        link.href = dataUrl;
        link.click();
    };

  return (
    <>
        {/* Download file */}
        <Dialog open={isDownload} onClose={() => dispatch(setDownload(false))}>
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
                        <p>Download</p>
                        <button
                            className="cursor-pointer"
                            onClick={() => dispatch(setDownload(false))}
                        >
                            <X size={20} />
                        </button>
                        </motion.div>

                        <motion.form
                            onSubmit={(e) => handleDownload(e)}
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
                                        defaultValue={defName != undefined ? defName : "Idk"}
                                    />
                                </div>

                                <div className="flex gap-2 items-center">
                                    <label htmlFor="fileType" className='whitespace-nowrap'>File Type: </label>
                                    <select name='fileType' className="w-full border border-gray-500 p-2">
                                        <option value="png">.png</option>
                                        <option value="jpg">.jpg</option>
                                    </select>
                                </div>
                            </motion.div>

                            <div className='flex flex-col gap-2 '>
                                <button className='px-5 py-2 w-full bg-blue-500 text-white duration-300 hover:cursor-pointer hover:bg-blue-400'>Save</button>
                                <button type='button' onClick={() => dispatch(setDownload(false))} className='px-5 py-2 border border-gray-500 hover:border-blue-500 hover:bg-blue-100 w-full duration-300'>Cancel</button>
                            </div>
                        </motion.form>
                </DialogPanel>
            </motion.div>
        </Dialog>
    </>
  )
}

export default Download
