import React from 'react'
import img1 from "../../public/Screenshot 2025-03-06 205203.png";

function Header() {
    return (
        <>
            <div className=' fixed bg-white w-[100%]  '>
                <div className='flex justify-between items-center'>
                    <div><img className=' w-40  text-red-500 mx-2 my-auto' src={img1} /></div>
                    <div>
                        <h1 className='text-2xl font-semibold'>Data Viewer App</h1>
                    </div>
                    <div></div>
                </div>
            </div>

        </>
    )
}

export default Header