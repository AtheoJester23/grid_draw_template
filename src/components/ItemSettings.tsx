import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../state/store'
import { setFiles, setGraycale } from '../state/Files/FileSlice'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

const ItemSettings = () => {
    const dispatch = useDispatch<AppDispatch>()

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
        <div className='flex text-sm items-center gap-2'>
            <label htmlFor="grids">Grids:</label>
            <select value={currentFile?.grid} onChange={(e) => dispatch((dispatch, _) => {
                const updatedGrid = fileList.map((item, index) => index == currentTab ? ({...item, grid: e.currentTarget.value}) : ({...item}))
                dispatch(setFiles(updatedGrid));
            })} className='border border-[rgb(23,23,23)] max-sm:px-1 px-3 bg-[rgb(23,23,23)] rounded'>
                <option value="none" className='text-[rgb(23,23,23)] bg-[rgb(234,231,230)]'>None</option>
                <option value="1x1 inches" className='text-[rgb(23,23,23)] bg-[rgb(234,231,230)]'>1x1 inch boxes</option>
                <option value="2x2 inches" className='text-[rgb(23,23,23)] bg-[rgb(234,231,230)]'>2x2 inch boxes</option>
                <option value="3x3 inches" className='text-[rgb(23,23,23)] bg-[rgb(234,231,230)]'>3x3 inch boxes</option>
                <option value="4x4 inches" className='text-[rgb(23,23,23)] bg-[rgb(234,231,230)]'>4x4 inch boxes</option>
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
                <option value="none">None</option>
                <option value="0.5 cm">0.5 cm</option>
                <option value="1 cm">1 cm</option>
                <option value="0.5 inch">0.5 inch</option>
                <option value="1 inch">1 inch</option>
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
    </>
  )
}

export default ItemSettings
