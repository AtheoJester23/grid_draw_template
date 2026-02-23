import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import type { RootState } from "../state/store";
import { motion } from 'framer-motion';
import { useRef } from "react";

const CurrentTab = () => {
    const {tabNum} = useParams();

    const filesList = useSelector((state: RootState) => state.fileHolder.files);

    const currentFile = tabNum ? filesList[Number(tabNum)] : undefined;

    console.log(currentFile)

    const ref = useRef(null)
    const grayScale = useSelector((state: RootState) => state.fileHolder.grayscale)


  return (
    <motion.div 
        ref={ref}
        className={`${grayScale == true && 'grayscale'} bg-white regular${currentFile?.size} max-sm:phone4x6 flex justify-center items-center overflow-hidden`}
    >
        <p className="text-red-500">{currentFile?.size}</p>
    </motion.div>
  )
}

export default CurrentTab
