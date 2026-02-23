import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import type { RootState } from "../state/store";
import { motion } from 'framer-motion';
import { useRef } from "react";
import Download from "./Pops/Download";

const CurrentTab = () => {
    const {tabNum} = useParams();
    const navigate = useNavigate()

    const filesList = useSelector((state: RootState) => state.fileHolder.files);

    const currentFile = tabNum ? filesList[Number(tabNum)] : undefined;

    if(!currentFile){
        navigate("/")
        return;
    }


    const ref = useRef(null)
    const grayScale = useSelector((state: RootState) => state.fileHolder.grayscale)


  return (
    <>
        <motion.div 
            ref={ref}
            className={`frameSize${currentFile.size} ${grayScale == true && 'grayscale'} bg-green-500 flex justify-center items-center overflow-hidden ${currentFile.border == true ? "regular4x6halfcm" : ""}`}
        >
            <div className={`content h-full w-full flex justify-center items-center ${currentFile.border && "border-[1.5px]"}`}>
                <p>{currentFile.name}</p>
            </div>
        </motion.div>
        <Download theRef={ref} defName={currentFile.name}/>
    </>
  )
}

export default CurrentTab
