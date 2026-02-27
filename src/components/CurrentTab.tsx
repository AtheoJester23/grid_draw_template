import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import type { AppDispatch, RootState } from "../state/store";
import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from "react";
import Download from "./Pops/Download";
import { setFiles } from "../state/Files/FileSlice";
import { CornerDownRight, CornerLeftDown, CornerRightUp, CornerUpLeft } from "lucide-react";

const CurrentTab = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [touched, setTouched] = useState<boolean>(false)

    const dispatch = useDispatch<AppDispatch>()
    
    const { id } = useParams();

    const filesList = useSelector((state: RootState) => state.fileHolder.files);
    
    const currentFile = filesList.find(item => item.id == id);
    const width = useMotionValue(currentFile?.picState.width ?? 300);
    const height = useMotionValue(currentFile?.picState.height ?? 300);
    const x = useMotionValue(currentFile?.picState.x ?? 0);
    const y = useMotionValue(currentFile?.picState.y ?? 0);
    const rotate = useMotionValue(0)

    useEffect(() => {
        if(!currentFile) return;

        rotate.set(currentFile?.picState.rotate);
    }, [currentFile])

    const ref = useRef(null)

    const getAngle = (clientX: number, clientY: number) => {
        const { x: centerX, y: centerY } = centerRef.current;

        const dx = clientX - centerX;
        const dy = clientY - centerY;

        return Math.atan2(dy, dx) * (180 / Math.PI);
    };

    const startMouseAngleRef = useRef(0);
    const startRotationRef = useRef(0);
    const centerRef = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        centerRef.current = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        };

        startMouseAngleRef.current = getAngle(e.clientX, e.clientY);
        startRotationRef.current = rotate.get();

        const moveHandler = (moveEvent: MouseEvent) => {
            const currentAngle = getAngle(moveEvent.clientX, moveEvent.clientY);

            const newRotation =
            startRotationRef.current +
            (currentAngle - startMouseAngleRef.current);

            rotate.set(newRotation);            
        };

        const upHandler = () => {
            window.removeEventListener("mousemove", moveHandler);
            window.removeEventListener("mouseup", upHandler);
        };

        window.addEventListener("mousemove", moveHandler);
        window.addEventListener("mouseup", upHandler);
    };

    const handleUpdateRotate = () => {
        const updatedThing = filesList.map(item =>
            item.id === id
            ? {
                ...item,
                picState: {
                    ...item.picState,  // spread existing picState
                    rotate: rotate.get() // get value from motion value
                }
                }
            : item
        );

        dispatch(setFiles(updatedThing));
        console.log(updatedThing);
    };

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
        width.set(currentFile.picState.width);
        height.set(currentFile.picState.height);
    }, [currentFile?.picState.width, currentFile?.picState.height])
    
    const handleUpdatePicPos = (newX: number, newY: number) => {
        if(!currentFile) return;
        const updatedPic = filesList.map((item) => item.id === currentFile.id ? ({...item, picState: {...item.picState, x: newX, y: newY}}): ({...item}))
        
        dispatch(setFiles(updatedPic))
    }

    const handleUpdatePicSize = (newWidth: number, newHeigth: number, newX?: number, newY?: number) => {
        if(!currentFile) return;
        const updatedPic = filesList.map((item) => item.id == currentFile.id ? ({...item, picState: {...item.picState, width: newWidth, height: newHeigth, y: newY ?? item.picState.y, x: newX ?? item.picState.x}}) : ({...item}))
        
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
                            rotate,
                            position: "relative",
                        }}
                        className={`z-10 ${touched && "border border-2 border-dashed border-gray-500 cursor-grab active:cursor-grabbing"}`}
                        onMouseDown={() => setTouched(true)}  // click or hold starts here
                        
                        onDragEnd={() => {
                            const newX = x.get();
                            const newY = y.get();
                            console.log(`width: ${typeof width.get()}`)

                            handleUpdatePicPos(newX, newY)
                        }}
                        animate={{ x: currentFile.picState.x, y: currentFile.picState.y }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
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

                        {/* Rotation handle br*/}
                        <motion.div 
                            drag
                            dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}
                            onMouseDown={(e) => {
                                e.stopPropagation(); 
                                handleMouseDown(e)
                            }}
                            onDragEnd={() => {
                                handleUpdateRotate()
                            }}
                            className="opacity-0 hover:opacity-100 w-[20px] h-[20px] rounded-full absolute bottom-[-30px] right-[-30px] cursor-none active:cursor-grabbing duration-300"
                        >
                            <CornerRightUp color="gray"/>
                        </motion.div>

                        {/* Rotation handle tr*/}
                        <motion.div 
                            drag
                            dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}
                            onMouseDown={(e) => {
                                e.stopPropagation(); 
                                handleMouseDown(e)
                            }}
                            onDragEnd={() => {
                                handleUpdateRotate()
                            }}
                            className="opacity-0 hover:opacity-100 w-[20px] h-[20px] rounded-full absolute top-[-30px] right-[-30px] cursor-none active:cursor-grabbing duration-300"
                        >
                            <CornerUpLeft color="gray"/>
                        </motion.div>

                        {/* Rotation handle tl*/}
                        <motion.div 
                            drag
                            dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}
                            onMouseDown={(e) => {
                                e.stopPropagation(); 
                                handleMouseDown(e)
                            }}
                            onDragEnd={() => {
                                handleUpdateRotate()
                            }}
                            className="opacity-0 hover:opacity-100 w-[20px] h-[20px] rounded-full absolute top-[-30px] left-[-30px] cursor-none active:cursor-grabbing duration-300"
                        >
                            <CornerLeftDown color="gray"/>
                        </motion.div>

                        {/* Rotation handle bl*/}
                        <motion.div 
                            drag
                            dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}
                            onMouseDown={(e) => {
                                e.stopPropagation(); 
                                handleMouseDown(e)
                            }}
                            onDragEnd={() => {
                                handleUpdateRotate()
                            }}
                            className="opacity-0 hover:opacity-100 w-[20px] h-[20px] rounded-full absolute bottom-[-30px] left-[-30px] cursor-none active:cursor-grabbing duration-300"
                        >
                            <CornerDownRight color="gray"/>
                        </motion.div>
                    </motion.div>
            </div>
        </motion.div>
        <Download theRef={ref} defName={currentFile.name}/>
    </>
  )
}

export default CurrentTab
