import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import type { AppDispatch, RootState } from "../state/store";
import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
import Download from "./Pops/Download";
import { setFiles } from "../state/Files/FileSlice";

const CurrentTab = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [touched, setTouched] = useState<boolean>(false)

    const dispatch = useDispatch<AppDispatch>()
    
    const { id } = useParams();

    const filesList = useSelector((state: RootState) => state.fileHolder.files);
    
    const currentFile = filesList.find(item => item.id == id);
    const width = useMotionValue(currentFile?.picState.width);
    const height = useMotionValue(currentFile?.picState.height);
    const x = useMotionValue(currentFile?.picState.x);
    const y = useMotionValue(currentFile?.picState.y);

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
        if(!currentFile) return;
        x.set(currentFile.picState.x);
        y.set(currentFile.picState.y);
    }, [currentFile?.picState.x, currentFile?.picState.y])
    
    useEffect(() => {
        if(!currentFile) return;
        width.set(currentFile.picState.width);
        height.set(currentFile.picState.height);
    }, [currentFile?.picState.width, currentFile?.picState.height])
    
    const handleUpdatePicPos = (newX: number, newY: number, newWidth: number, newHeigth: number) => {
        if(!currentFile) return;
        const updatedPic = filesList.map((item) => item.id === currentFile.id ? ({...item, picState: {...item.picState, x: newX, y: newY}}): ({...item}))
        
        dispatch(setFiles(updatedPic))
    }

    const handleUpdatePicSize = (newWidth: number, newHeigth: number, newX?: number, newY?: number) => {
        if(!currentFile) return;
        const updatedPic = filesList.map((item) => item.id == currentFile.id ? ({...item, picState: {width: newWidth, height: newHeigth, y: newY ?? item.picState.y, x: newX ?? item.picState.x}}) : ({...item}))
        
        dispatch(setFiles(updatedPic));
    }

    if(!currentFile) return null;

    return (
    <>
        <motion.div 
            ref={ref}
            className={`frameSize${currentFile.size}${currentFile.orientation} ${currentFile.bnw == true && 'grayscale'} bg-white flex justify-center items-center ${currentFile.border + currentFile.size} cursor-default`}
        >
            <div className={`relative ${touched ? "" : "overflow-hidden"} content grid h-full w-full flex justify-center items-center ${currentFile.border !== "noBorder" && "border-[1.5px]"}`}>
                <>
                    {currentFile.size == "4x6" && (
                        <>
                            {currentFile.grid == "oneInchGrid" ? (
                                <div className={`absolute top-0 left-0 right-0 bottom-0 grid${currentFile.grid}${currentFile.size}${currentFile.orientation} z-20 pointer-events-none`}>
                                    <div className="border-e"/>
                                    <div className="border-e"/>
                                    <div className="border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" && "border-e"}`}/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e" : "border-e border-t"}`}/>
                                    <div className={`${currentFile.orientation == "landscape" ? "" : "border-e border-t"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-t" : "border-e border-t"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t"/>
                                </div>
                            ): currentFile.grid == "twoInchGrid" ? (
                                <div className={`absolute top-0 left-0 right-0 bottom-0 grid${currentFile.grid}${currentFile.size}${currentFile.orientation} z-20 pointer-events-none`}>
                                    <div className="border-e"/>
                                    <div className=""/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t"/>
                                </div>
                            ): currentFile.grid == "threeInchGrid" ? (
                                <div className={`absolute top-0 left-0 right-0 bottom-0 grid${currentFile.grid}${currentFile.size}${currentFile.orientation} z-20 pointer-events-none`}>
                                    <div className="border-e"/>
                                    <div className=""/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t"/>
                                </div>
                            ): currentFile.grid == "fourInchGrid" ? (
                                <div className={`absolute top-0 left-0 right-0 bottom-0 grid${currentFile.grid}${currentFile.size}${currentFile.orientation} z-20 pointer-events-none`}>
                                    <div className="border-b"/>
                                </div>
                            ):(
                                null
                            )}
                        </>
                    )}

                    {currentFile.size == "6x8" ? (
                        <>
                            {currentFile.grid == "oneInchGrid" ? (
                                <div className={`absolute top-0 left-0 right-0 bottom-0 grid${currentFile.grid}${currentFile.size}${currentFile.orientation} z-20 pointer-events-none`}>
                                    <div className="border-e"/>
                                    <div className="border-e"/>
                                    <div className="border-e"/>
                                    <div className="border-e"/>
                                    <div className="border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" && "border-e"}`}/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e" : "border-e border-t"}`}/>
                                    <div className={`${currentFile.orientation == "landscape" ? "" : "border-e border-t"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-t" : "border-e border-t"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-t" : "border-e border-t"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-t" : "border-e border-t"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t"/>  
                                </div>
                            ): currentFile.grid == "twoInchGrid" ? (
                                <div className={`absolute top-0 left-0 right-0 bottom-0 grid${currentFile.grid}${currentFile.size}${currentFile.orientation} z-20 pointer-events-none`}>
                                    <div className="border-e"/>
                                    <div className="border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e" : ""}`}/>
                                    <div className={`${currentFile.orientation == "landscape" ? "" : "border-t border-e"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e "/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-t" : "border-e border-t"}`}/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e "/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t"/>
                                    
                                </div>
                            ): currentFile.grid == "threeInchGrid" ?(
                                <div className={`absolute top-0 left-0 right-0 bottom-0 grid${currentFile.grid}${currentFile.size}${currentFile.orientation} z-20 pointer-events-none`}>
                                    <div className="border-e"/>
                                    <div className="border-e"/>
                                    <div className="border-t border-e "/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e "/>
                                    <div className="border-t border-e"/>                                
                                </div>
                            ): currentFile.grid == "fourInchGrid" ?(
                                <div className={`absolute top-0 left-0 right-0 bottom-0 grid${currentFile.grid}${currentFile.size}${currentFile.orientation} z-20 pointer-events-none`}>
                                    <div className="border-e"/>
                                    <div className="border-e"/>
                                    <div className="border-t border-e "/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e "/>
                                    <div className="border-t border-e"/>                                
                                </div>
                            ):(
                                null
                            )}
                        </>
                    ):(
                        null
                    )}
                    
                    {currentFile.size == "A4" ? (
                        <>
                            {currentFile.grid == "oneInchGrid" ? (
                                <div className={`absolute top-0 left-0 right-0 bottom-0 grid${currentFile.grid}${currentFile.size}${currentFile.orientation} z-20 pointer-events-none`}>
                                    <div className="border-e"/>
                                    <div className="border-e"/>
                                    <div className="border-e "/>
                                    <div className="border-e"/>
                                    <div className="border-e "/>
                                    <div className="border-e "/>
                                    <div className="border-e "/>
                                    <div className="border-e "/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e" : ""}`}/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e" : "border-t border-e"}`}/>                                
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e" : "border-t border-e"}`}/>                                
                                    <div className={`${currentFile.orientation == "landscape" ? "" : "border-e border-t"}`}/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className={`${currentFile.orientation == "landscape" ? "border-t" : "border-t border-e"}`}/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t "/>
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className={`${currentFile.orientation == "landscape" ? "border-t" : "border-t border-e"}`}/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className={`${currentFile.orientation == "landscape" ? "border-t" : "border-t border-e"}`}/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t"/>
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className={`${currentFile.orientation == "landscape" ? "border-t" : "border-t border-e"}`}/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className={`${currentFile.orientation == "landscape" ? "border-t" : "border-t border-e"}`}/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t border-e"/>                                
                                    <div className="border-t"/>                               
                                </div>
                            ): currentFile.grid == "twoInchGrid" ? (
                                <div className={`absolute top-0 left-0 right-0 bottom-0 grid${currentFile.grid}${currentFile.size}${currentFile.orientation} z-20 pointer-events-none`}>
                                    <div className="border-e"/>
                                    <div className="border-e"/>
                                    <div className="border-e"/>
                                    <div className="border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e" : ""}`}/>
                                    <div className={`${currentFile.orientation == "landscape" ? "" : "border-t border-e"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t"/>
                                </div>
                            ): currentFile.grid == "threeInchGrid" ? (
                                <div className={`absolute top-0 left-0 right-0 bottom-0 grid${currentFile.grid}${currentFile.size}${currentFile.orientation} z-20 pointer-events-none`}>
                                    <div className="border-e"/>
                                    <div className="border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e" : ""}`}/>
                                    <div className={`${currentFile.orientation == "landscape" ? "" : "border-t border-e"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className={`${currentFile.orientation == "landscape" ? " border-t" : "border-e border-t"}`}/>
                                    <div className={`${currentFile.orientation == "landscape" ? "border-e border-t" : "border-t"}`}/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t"/>                      
                                </div>
                            ): currentFile.grid == "fourInchGrid" ? (
                                <div className={`absolute top-0 left-0 right-0 bottom-0 grid${currentFile.grid}${currentFile.size}${currentFile.orientation} z-20 pointer-events-none`}>
                                    <div className="border-e"/>
                                    <div className="border-e"/>
                                    <div className="border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>                              <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                    <div className="border-t border-e"/>
                                                    
                                </div>
                            ):(
                                null
                            )}
                        </>
                    ):(
                        null
                    )}
                </>

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
                    className={`z-10 overflow-hidden ${touched && "border border-2 border-dashed border-gray-500 cursor-grab active:cursor-grabbing"}`}
                    onMouseDown={() => setTouched(true)}  // click or hold starts here
                    onDragEnd={() => {
                        const newX = x.get();
                        const newY = y.get();
                        const newWidth = width.get();
                        const newHeight = width.get();

                        console.log(`width: ${typeof width.get()}`)

                        handleUpdatePicPos(newX, newY, newWidth, newHeight)
                    }}
                    transition={{
                        type: "spring"
                    }}
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
                        onDrag={(_, info) => {
                            const delta = info.delta.x
                            const aspectRatio = 1;
                            const newWidth = Math.max(100, width.get() + delta);
                            width.set(newWidth);
                            height.set(newWidth / aspectRatio)
                        }}
                        onDragEnd={() => {
                            const newWidth = width.get();
                            const newHeight = height.get();

                            handleUpdatePicSize(newWidth, newHeight);
                        }}
                        className={`${touched ? "visible" : "hidden"} w-2 h-2 absolute bottom-[0] right-[0] cursor-se-resize bg-black`}
                    />

                    {/* Resize Handle (bottom-left) */}
                    <motion.div
                        drag
                        dragMomentum={false}
                        dragElastic={0}
                        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }} // prevents visual movement
                        onDrag={(_, info) => {
                            const delta = info.delta.x
                            const aspectRatio = 1;
                            const newWidth = Math.max(100, width.get() - delta);
                            
                            x.set(x.get() + delta);
                            
                            width.set(newWidth);
                            height.set(newWidth / aspectRatio)
                        }}
                        onDragEnd={() => {
                            const newX = x.get();
                            const newWidth = width.get();
                            const newHeight = height.get();

                            handleUpdatePicSize(newWidth, newHeight, newX);
                        }}
                        className={`${touched ? "visible" : "hidden"} w-2 h-2 bg-black absolute bottom-[0] left-[0] cursor-sw-resize`}
                    />

                    {/* Resize Handle (top-left) */}
                    <motion.div
                        drag
                        dragMomentum={false}
                        dragElastic={0}
                        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }} // prevents visual movement
                        onDrag={(_, info) => {
                            const dx = info.delta.x
                            const dy = info.delta.y;
                            const aspectRatio = 1;
                            const newWidth = Math.max(100, width.get() - dx);
                        
                            x.set(x.get() + dx)
                            y.set(y.get() + dy)

                            width.set(newWidth);
                            height.set(newWidth / aspectRatio)
                        }}
                        onDragEnd={() => {
                            const newX = x.get();
                            const newY = y.get();
                            const newWidth = width.get();
                            const newHeight = height.get();

                            handleUpdatePicSize(newWidth, newHeight, newX, newY);
                        }}
                        className={`${touched ? "visible" : "hidden"} w-2 h-2 bg-black absolute top-[0] left-[0] cursor-nw-resize`}
                    />
                    
                    {/* Resize Handle (top-right) */}
                    <motion.div
                        drag
                        dragMomentum={false}
                        dragElastic={0}
                        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }} // prevents visual movement
                        onDrag={(_, info) => {
                            const dx = info.delta.x
                            const dy = info.delta.y;
                            const aspectRatio = 1;
                            const newWidth = Math.max(100, width.get() + dx);
                        
                            y.set(y.get() + dy)

                            width.set(newWidth);
                            height.set(newWidth / aspectRatio)
                        }}
                        onDragEnd={() => {
                            const newY = y.get();
                            const newWidth = width.get();
                            const newHeight = height.get();

                            handleUpdatePicSize(newWidth, newHeight, undefined, newY);
                        }}
                        className={`${touched ? "visible" : "hidden"} w-2 h-2 bg-black absolute top-[0] right-[0] cursor-ne-resize`}
                    />
                
                </motion.div>
                
            </div>
        </motion.div>
        <Download theRef={ref} defName={currentFile.name}/>
    </>
  )
}

export default CurrentTab
