import { Minus, Plus } from "lucide-react"

const BottomNav = () => {
  return (
    <div className='text-sm navbarStyle w-full absolute bottom-0 flex justify-end'>
      <div className="flex items-center gap-1">
        <div className="bg-white text-[rgb(23,23,23)] px-3 rounded">
            <p>100%</p>
        </div>
        <div className="flex gap-1">
            <button className="hover:bg-[rgb(70,70,70)] border border-[rgb(50,50,50)] rounded hover:text-white cursor-pointer">
                <Plus size={18}/>
            </button>
            <button className="hover:bg-[rgb(70,70,70)] border border-[rgb(50,50,50)] rounded hover:text-white cursor-pointer">
                <Minus size={18}/>
            </button>
        </div>
      </div>
    </div>
  )
}

export default BottomNav
