import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import type { RootState } from "../state/store";
import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
import Download from "./Pops/Download";

const CurrentTab = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [touched, setTouched] = useState<boolean>(false)

    const width = useMotionValue(200);
    const height = useMotionValue(200);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const {tabNum} = useParams();
    const navigate = useNavigate()

    const filesList = useSelector((state: RootState) => state.fileHolder.files);

    const currentFile = tabNum ? filesList[Number(tabNum)] : undefined;

    const ref = useRef(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            // if touched and click is NOT inside containerRef
            if (touched && containerRef.current && !containerRef.current.contains(e.target as Node)) {
            console.log("Clicked outside the picture");
            setTouched(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [touched]);

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
            className={`frameSize${currentFile.size} ${currentFile.bnw == true && 'grayscale'} bg-white flex justify-center items-center ${currentFile.border + currentFile.size} cursor-default`}
        >
            <div className={`${touched ? "" : "overflow-hidden"} content grid h-full w-full flex ${currentFile.border !== "noBorder" && "border-[1.5px]"}`}>
                {/* Grids here */}
                <motion.div
                    onClick={() => setTouched(true)}
                    drag
                    dragMomentum={false}
                    ref={containerRef}
                    style={{
                        width,
                        height,
                        x,
                        y,
                        position: "relative",
                    }}
                    className={`overflow-hidden ${touched && "border border-2 border-dashed border-gray-500 cursor-grab active:cursor-grabbing"}`}
                    onMouseDown={() => setTouched(true)}  // click or hold starts here
                >

                    {/* Image */}
                    <motion.img
                        src={currentFile.pic}
                        alt="Resizable"
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        draggable={false}
                        className={`${touched ? "opacity-80" : ""} pointer-events-none`}
                    />

                    {/* Resize Handle (bottom-right) */}
                    <motion.div
                        drag
                        dragMomentum={false}
                        dragElastic={0}
                        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }} // prevents visual movement
                        onDrag={(event, info) => {
                            const delta = info.delta.x
                            const aspectRatio = 1;
                            const newWidth = Math.max(100, width.get() + delta);
                            width.set(newWidth);
                            height.set(newWidth / aspectRatio)
                        }}
                        className={`w-4 h-4 absolute bottom-[0] right-[0] cursor-se-resize`}
                    />

                    {/* Resize Handle (bottom-left) */}
                    <motion.div
                        drag
                        dragMomentum={false}
                        dragElastic={0}
                        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }} // prevents visual movement
                        onDrag={(event, info) => {
                            const delta = info.delta.x
                            const aspectRatio = 1;
                            const newWidth = Math.max(100, width.get() - delta);
                            
                            x.set(x.get() + delta);
                            
                            width.set(newWidth);
                            height.set(newWidth / aspectRatio)
                        }}
                        className={`w-4 h-4 absolute bottom-[0] left-[0] cursor-sw-resize`}
                    />

                    {/* Resize Handle (top-left) */}
                    <motion.div
                        drag
                        dragMomentum={false}
                        dragElastic={0}
                        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }} // prevents visual movement
                        onDrag={(event, info) => {
                            const dx = info.delta.x
                            const dy = info.delta.y;
                            const aspectRatio = 1;
                            const newWidth = Math.max(100, width.get() - dx);
                        
                            x.set(x.get() + dx)
                            y.set(y.get() + dy)

                            width.set(newWidth);
                            height.set(newWidth / aspectRatio)
                        }}
                        className={`w-4 h-4 absolute top-[0] left-[0] cursor-nw-resize`}
                    />
                    
                    {/* Resize Handle (top-right) */}
                    <motion.div
                        drag
                        dragMomentum={false}
                        dragElastic={0}
                        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }} // prevents visual movement
                        onDrag={(event, info) => {
                            const dx = info.delta.x
                            const dy = info.delta.y;
                            const aspectRatio = 1;
                            const newWidth = Math.max(100, width.get() + dx);
                        
                            y.set(y.get() + dy)

                            width.set(newWidth);
                            height.set(newWidth / aspectRatio)
                        }}
                        className={`w-4 h-4 absolute top-[0] right-[0] cursor-ne-resize`}
                    />
                
                </motion.div>
            </div>
        </motion.div>
        <Download theRef={ref} defName={currentFile.name}/>
    </>
  )
}

export default CurrentTab
