import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import type { RootState } from "../state/store";
import { motion } from 'framer-motion';
import { useEffect, useRef } from "react";
import Download from "./Pops/Download";

const CurrentTab = () => {
    const {tabNum} = useParams();
    const navigate = useNavigate()

    const filesList = useSelector((state: RootState) => state.fileHolder.files);
    const grayScale = useSelector((state: RootState) => state.fileHolder.grayscale)

    const currentFile = tabNum ? filesList[Number(tabNum)] : undefined;

    const ref = useRef(null)

    useEffect(() => {
        if(!currentFile){
            navigate("/")
        }
    }, [currentFile, navigate]);

    if(!currentFile) return null;

    const selectedTab = useSelector((state: RootState) => state.fileHolder.currentTab);

    console.log("===============================================")
    console.log("This is the current Tab:")
    console.log(selectedTab);

  return (
    <>
        <motion.div 
            ref={ref}
            className={`frameSize${currentFile.size} ${grayScale == true && 'grayscale'} bg-green-500 flex justify-center items-center overflow-hidden`}
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
