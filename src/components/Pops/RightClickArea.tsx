import { useState } from "react"

const RightClickArea = () => {
    const [menu, setMenu] = useState<{x: number, y: number} | null>(null)

    const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault();
        setMenu({x: e.clientX, y: e.clientY})
    }

    return (
        <div>
            
        </div>
    )
}
export default RightClickArea;
