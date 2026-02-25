import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../state/store'
import { setFiles, setGraycale } from '../state/Files/FileSlice'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FileCog } from 'lucide-react'
import { Dialog, DialogPanel } from '@headlessui/react'

const ItemSettings = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [openFileSettings, setOpenFileSettings] = useState(false);

    const handleBnW = () => {
        dispatch((dispatch, getState) => {
            const currentState = getState().fileHolder.grayscale;
            dispatch(setGraycale(!currentState))
        })
    }

    const fileList = useSelector((state: RootState) => state.fileHolder.files);
    const currentTab = useSelector((state: RootState) => state.fileHolder.currentTab);

    const currentFile = currentTab != null ? fileList[currentTab] : undefined;

    console.log("-----------------------------------------------------")
    console.log(currentFile?.border);
    
  return (
    <>
        <div className='flex max-sm:hidden gap-2'>
            <div className='flex text-sm items-center gap-2'>
                <label htmlFor="grids">Grids:</label>
                <select 
                    value={currentFile?.grid} 
                    onChange={(e) => dispatch((dispatch, _) => {
                        const updatedGrid = fileList.map((item, index) => index == currentTab ? ({...item, grid: e.currentTarget.value}) : ({...item}))
                        dispatch(setFiles(updatedGrid));
                    })} 
                    className='border border-[rgb(23,23,23)] max-sm:px-1 px-3 bg-[rgb(23,23,23)] rounded'
                >
                        <option value="noGrid" className='text-[rgb(23,23,23)] bg-[rgb(234,231,230)]'>None</option>
                        <option value="oneInchGrid" className='text-[rgb(23,23,23)] bg-[rgb(234,231,230)]'>1x1 inch boxes</option>
                        <option value="twoInchGrid" className='text-[rgb(23,23,23)] bg-[rgb(234,231,230)]'>2x2 inch boxes</option>
                        <option value="threeInchGrid" className='text-[rgb(23,23,23)] bg-[rgb(234,231,230)]'>3x3 inch boxes</option>
                        <option value="fourInchGrid" className='text-[rgb(23,23,23)] bg-[rgb(234,231,230)]'>4x4 inch boxes</option>
                    </select>
                </div>

                <div className='w-[1.5px] h-full bg-[rgb(50,50,50)] rounded'/>

                <div className='flex items-center gap-1'>
                    <label htmlFor="borderChkbx">Border: </label>
                    <select 
                        value={currentFile?.border}
                        onChange={(e) => dispatch((dispatch, _) => {
                            const updateExactfile = fileList.map((item, index) => index == currentTab ? ({...item, border: e.currentTarget.value})  : ({...item})) 
                            dispatch(setFiles(updateExactfile));
                        })} 
                        className='border border-[rgb(23,23,23)] max-sm:px-1 px-3 bg-[rgb(23,23,23)] rounded'
                    >
                        <option value="noBorder">None</option>
                        <option value="halfCm">0.5 cm</option>
                        <option value="oneCm">1 cm</option>
                        <option value="halfInch">0.5 inch</option>
                        <option value="oneInch">1 inch</option>
                </select>
            </div>

            <div className='w-[1.5px] h-full bg-[rgb(50,50,50)] rounded'/>
            
            <div className='flex items-center gap-1'>
                <input type="checkbox" name='bnwChkbx' onChange={(e) => dispatch((dispatch, _) => {
                    const updatedBnw = fileList.map((item, index) => index == currentTab ? ({...item, bnw: e.currentTarget.checked}) : ({...item}) )
                    dispatch(setFiles(updatedBnw));
                })} checked={currentFile?.bnw}/>
                <label htmlFor="bnwChkbx" className='max-sm:hidden'>Black & White...</label>
                <label htmlFor="bnwChkbx" className='min-md:hidden'>B&W</label>
            </div> 

            <div className='w-[1.5px] h-full bg-[rgb(50,50,50)] rounded'/>

            <div className='flex gap-2'>
                <h1>Frame Size: </h1>
                <p>{currentFile?.size}</p>
            </div>
        </div>

        <button type='button' onClick={() => setOpenFileSettings(true)} className='min-md:hidden'>
            <FileCog/>
        </button>
        
        <Dialog open={openFileSettings} onClose={() => setOpenFileSettings(false)} className='absolute flex justify-center items-center left-0 right-0 bottom-0 top-0 z-30'>                
            <DialogPanel className={'bg-white p-5 rounded shadow-lg w-[80%] border border-gray-500'}>
                <div className='flex flex-col gap-2'>
                    <div className='flex text-sm items-center gap-2'>
                        <label htmlFor="grids">Grids:</label>
                        <select 
                            value={currentFile?.grid} 
                            onChange={(e) => dispatch((dispatch, _) => {
                                const updatedGrid = fileList.map((item, index) => index == currentTab ? ({...item, grid: e.currentTarget.value}) : ({...item}))
                                dispatch(setFiles(updatedGrid));
                            })} 
                            className='border py-2 px-5 border-[rgb(23,23,23)] max-sm:px-1 px-3 rounded-sm w-full border-gray-500'
                        >
                                <option value="noGrid" className='text-[rgb(23,23,23)] bg-[rgb(234,231,230)]'>None</option>
                                <option value="oneInchGrid" className='text-[rgb(23,23,23)] bg-[rgb(234,231,230)]'>1x1 inch boxes</option>
                                <option value="twoInchGrid" className='text-[rgb(23,23,23)] bg-[rgb(234,231,230)]'>2x2 inch boxes</option>
                                <option value="threeInchGrid" className='text-[rgb(23,23,23)] bg-[rgb(234,231,230)]'>3x3 inch boxes</option>
                                <option value="fourInchGrid" className='text-[rgb(23,23,23)] bg-[rgb(234,231,230)]'>4x4 inch boxes</option>
                        </select>
                    </div>

                    <div className='flex items-center gap-1'>
                        <label htmlFor="borderChkbx">Border: </label>
                        <select 
                            value={currentFile?.border}
                            onChange={(e) => dispatch((dispatch, _) => {
                                const updateExactfile = fileList.map((item, index) => index == currentTab ? ({...item, border: e.currentTarget.value})  : ({...item})) 
                                dispatch(setFiles(updateExactfile));
                            })} 
                            className='border py-2 px-5 border-[rgb(23,23,23)] max-sm:px-1 px-3 rounded-sm w-full border-gray-500'
                        >
                            <option value="noBorder">None</option>
                            <option value="halfCm">0.5 cm</option>
                            <option value="oneCm">1 cm</option>
                            <option value="halfInch">0.5 inch</option>
                            <option value="oneInch">1 inch</option>
                        </select>
                    </div>

                    <label htmlFor='checkbox' className="flex items-center gap-1 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={currentFile?.bnw}
                            onChange={(e) => dispatch((dispatch, _) => {
                            const updatedBnw = fileList.map((item, index) =>
                                index == currentTab ? { ...item, bnw: e.currentTarget.checked } : { ...item }
                            );
                            dispatch(setFiles(updatedBnw));
                            })}
                        />
                        <span className="max-sm:hidden">Black & White...</span>
                        <span className="min-md:hidden">B&W</span>
                    </label>

                    <div className='flex gap-2'>
                        <h1>Frame Size: </h1>
                        <p>{currentFile?.size}</p>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    </>
  )
}

export default ItemSettings
