import React, { useEffect } from 'react'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator, faChartArea, faHouse, faStore } from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { faProductHunt } from '@fortawesome/free-brands-svg-icons'

function SideBar(props: any) {
    const { mainData } = props

    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("login")) {
            console.log("")
        }
        else {
            navigate("/")
        }
    }, [])

    return (
        <>

            <Header />

            <div className="grid grid-cols-12 pt-[60px]">
                <div className="col-span-1 fixed left-0 top-20 h-[100vh] w-32 ">
                    <NavLink to='/store' className={({ isActive }) =>
                        `flex items-center  py-2 ${isActive ? "bg-[#DFDFDF]" : "bg-white"
                        }`
                    }>
                        <h1 className="text-black ">
                            <FontAwesomeIcon icon={faStore} className="mx-2 " /> <span className='font-semibold'>Store</span>
                        </h1>
                    </NavLink>
                    <NavLink to={"/sku"} className={({ isActive }) =>
                        `flex items-center  py-2  ${isActive ? "bg-[#DFDFDF]" : "bg-white"
                        }`
                    }>
                        <h1 className="text-black  " >
                            <FontAwesomeIcon icon={faProductHunt} className="mx-2 " /> <span className='font-semibold'>SKU</span>
                        </h1>
                    </NavLink>
                    <NavLink to={"/calculations"} className={({ isActive }) =>
                        `flex items-center  py-2  ${isActive ? "bg-[#DFDFDF]" : "bg-white"
                        }`}>
                        <h1 className="text-black  ">
                            <FontAwesomeIcon icon={faCalculator} className="mx-2 " /> <span className='font-semibold'>Calculation</span>
                        </h1>
                    </NavLink>
                </div>

                <div className="col-span-12 ml-32 ">
                    <div className='bg-[#DFDFDF] h-[100%] w-[100%] p-3'>
                        <div className="w-full h-[85vh] px-10 py-5 bg-white shadow-md rounded-lg overflow-auto">
                            {mainData}
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default SideBar