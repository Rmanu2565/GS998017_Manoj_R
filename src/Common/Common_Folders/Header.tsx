import React, { useEffect, useState } from 'react'
import img1 from "../../public/Screenshot 2025-03-06 205203.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faArrowDown, faImage, faLock, faPersonRifle, faPhotoFilm, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [act, setAct] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }
    return (
        <>
            <div className=' fixed bg-white w-[100%]  '>
                <div className='flex justify-between items-center'>
                    <div><img className=' w-40  text-red-500 mx-2 my-auto' src={img1} /></div>
                    <div>
                        <h1 className='text-2xl font-semibold'>Data Viewer App</h1>
                    </div>
                    <div className='relative mx-4' onMouseLeave={(e) => { setAct(false) }} onMouseEnter={(e) => setAct(true)}><FontAwesomeIcon className=' text-xl' icon={faUserCircle} /><FontAwesomeIcon className='mr-4 ml-1 text-[10px]' icon={faAngleDown} />
                        {
                            act
                                ?
                                <button onClick={(e) => { handleLogout() }} className='absolute bg-red-500 font-semibold  border-black py-1 px-2  top-6 right-0'>Logout</button>
                                :
                                ""
                        }

                    </div>

                </div>
            </div>

        </>
    )
}

export default Header