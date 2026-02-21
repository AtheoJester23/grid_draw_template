import { Minus, Plus } from "lucide-react"

const BottomNav = () => {
  return (
    <div className='text-sm navbarStyle w-full absolute bottom-0'>
      <h1>Zoom</h1>
      <button>
        <Plus/>
      </button>
      <button>
        <Minus/>
      </button>
    </div>
  )
}

export default BottomNav
