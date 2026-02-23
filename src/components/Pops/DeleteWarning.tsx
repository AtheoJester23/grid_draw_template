import { Dialog, DialogPanel } from "@headlessui/react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../state/store"
import { setDelete, setDeleteTarget, setFiles } from "../../state/Files/FileSlice";
import { motion } from 'framer-motion'
import { TriangleAlert, X } from "lucide-react";

const DeleteWarning = () => {
    const isOpen = useSelector((state: RootState) => state.fileHolder.delete);
    const dispatch = useDispatch<AppDispatch>()

    const handleAbort = () => {
        dispatch(setDelete(false));
        dispatch(setDeleteTarget(null))     
    }

    const handleProceed = () => {
        dispatch((dispatch, getState) => {
            const currentFiles = getState().fileHolder.files;
            const selectedTab = getState().fileHolder.targetDelete
            dispatch(setFiles(currentFiles.filter((item, index) => index !== selectedTab)))
            dispatch(setDeleteTarget(null));
            dispatch(setDelete(false))
        })
    }

  return (
    <>
        <Dialog open={isOpen} onClose={() => dispatch(setDelete(false))}>
            <motion.div
                drag
                dragMomentum={false} 
                className="fixed top-75 left-1/2 -translate-x-1/2 max-sm:w-auto cursor-grab active:cursor-grabbing z-30"
            >                
                <motion.div
                    className={"text-sm w-auto leading-none text-[rgb(23,23,23)] relative bg-white"}
                >
                    <DialogPanel className="text-sm w-auto leading-none text-[rgb(23,23,23)] relative bg-white">
                        <motion.div className="flex flex-col justify-between text-sm cursor-grab active:cursor-grabbing">
                            <div className="flex justify-between items-center leading-none p-2">
                                <h1>Delete warning</h1>
                                <button type="button" onClick={handleAbort}>
                                    <X size={20}/>
                                </button>
                            </div>
                            <div className="p-2 bg-[rgb(240,240,240)]">
                                <div className="flex gap-3 items-center">
                                    <TriangleAlert/>
                                    <p>Are you sure you want to discard this tab?</p>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button onClick={handleProceed} className="border px-5 bg-[rgb(220,220,220)] border-[rgb(190,190,190)] hover:border-blue-500 hover:bg-blue-100 duration-300">Yes</button>
                                    <button onClick={handleAbort} className="border px-5 bg-[rgb(220,220,220)] border-[rgb(190,190,190)] hover:border-blue-500 hover:bg-blue-100 duration-300">Cancel</button>
                                </div>
                            </div>
                        </motion.div>
                    </DialogPanel>
                </motion.div>
            </motion.div>
        </Dialog> 
    </>
  )
}

export default DeleteWarning
