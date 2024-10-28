import { useState } from "react"

interface DropAreaProps {
    onDrop: () => void;
  }
const DropArea = ({onDrop}:DropAreaProps) => {
    const [show, setShow] = useState(false);
    return <section className={`px-3 py-1 w-full border border-dashed border-black transition-all duration-200 ${show ? 'opacity-100 h-full mt-3' : 'opacity-0 h-0'}`}
        onDragEnter={() => setShow(true)}
        onDragLeave={() => setShow(false)}
        onDragOver={(e)=>e.preventDefault()}
        onDrop={()=>{onDrop();setShow(false)}}
        >
        Drop Here
    </section>
}

export default DropArea