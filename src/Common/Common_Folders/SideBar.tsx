import React from 'react'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartArea, faHouse, faStore } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { faProductHunt } from '@fortawesome/free-brands-svg-icons'

function SideBar(props: any) {
    const { mainData } = props
    return (
        <>
            <Header />

            <div className="grid grid-cols-12 pt-[60px]">
                <div className="col-span-1 fixed left-0 top-16 h-[100vh] w-32 ">
                    <Link to='/'>
                        <h1 className="text-black mt-4">
                            <FontAwesomeIcon icon={faStore} className="mx-2 " /> <span className='font-semibold'>Store</span>
                        </h1>
                    </Link>
                    <Link to={"/sku"}>
                        <h1 className="text-black mt-2 ">
                            <FontAwesomeIcon icon={faProductHunt} className="mx-2 " /> <span className='font-semibold'>SKU</span>
                        </h1>
                    </Link>
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