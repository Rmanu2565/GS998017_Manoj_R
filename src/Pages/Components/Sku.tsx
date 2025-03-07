import React, { useReducer, useState, useEffect } from 'react';
import SideBar from '../../Common/Common_Folders/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faRemove, faMultiply } from '@fortawesome/free-solid-svg-icons';
import { skuData } from '../File/skuFile'; // Import static data
import { skuReducer, SkuItem, SkuAction } from '../Reducer/skuReducer'; // Import reducer and types

function ChildSku() {

    const [originalSku, dispatch] = useReducer(skuReducer, skuData); // Initialize state with reducer
    const [filteredSku, setFilteredSku] = useState(originalSku); // State for filtered results
    const [btn, setBtn] = useState(true);
    const [modalContent, setModalContent] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState<SkuItem>({ id: '', label: "", Department: "", price: 0, cost: 0 });
    const [inc, setInc] = useState(766);
    const [fil, setFil] = useState('');

    const openModal = (content: string) => {
        if (content === "Edit Store") {
            setBtn(false);
        } else {
            setBtn(true);
        }
        setModalContent(content);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setData({ id: "", label: "", Department: "", price: 0, cost: 0 });
    };

    useEffect(() => {
        setInc(inc + 1);
    }, []);

    useEffect(() => {
        const skuData = originalSku.filter((item) =>
            item.label.toLowerCase().includes(fil.toLowerCase())
        );
        setFilteredSku(skuData);
    }, [fil, originalSku]);

    function handleSubmit() {
        if (data.label && data.Department && data.price && data.cost) {
            if (data.price > data.cost) {
                setInc(inc + 1);
                const newSku = { ...data, id: `SK00${inc}` }; // Ensure id is set correctly
                dispatch({ type: 'ADD_SKU', payload: newSku }); // Add new SKU
                closeModal();
            } else {
                alert("Cost must be less than price");
            }
        } else {
            alert("Please fill in all fields.");
        }
    }


    function handleEdit(tr: SkuItem) {
        openModal("Edit Store");
        setData(tr);
    }

    function handleDelete(res: SkuItem) {
        dispatch({ type: 'DELETE_SKU', payload: { id: res.id } }); // Delete SKU
    }

    const handleUpdate = () => {
        if (data.price > data.cost) {
            dispatch({ type: 'EDIT_SKU', payload: data }); // Edit SKU
            closeModal();
        } else {
            alert("Cost must be less than price");
        }
    };

    return (
        <>
            <div className='flex justify-between mb-4 items-center'>
                <div>
                    <input
                        placeholder='Search Item'
                        type='text'
                        className='border-[1px] border-black px-2 h-8 w-80 rounded-md focus:border-[1px]'
                        value={fil}
                        onChange={(e) => setFil(e.target.value)}
                    />
                </div>
                <div className=''>
                    <button onClick={() => openModal("Add Store")} className="p-2 float-right px-2  border-[1px] bg-black text-white rounded-md font-semibold transition">
                        Add Store<FontAwesomeIcon className='pl-2' icon={faAdd} />
                    </button>
                </div>
            </div>

            <table className="w-full border-collapse mt-3">
                <thead>
                    <tr className="bg-gray-100 text-gray-700 text-left">
                        <th className="px-4 py-3 border-b border-gray-300">Item ID</th>
                        <th className="px-4 py-3 border-b border-gray-300">Item Label</th>
                        <th className="px-4 py-3 border-b border-gray-300">Department</th>
                        <th className="px-4 py-3 border-b border-gray-300">Price</th>
                        <th className="px-4 py-3 border-b border-gray-300 text-center">Cost</th>
                        <th className="px-4 py-3 border-b border-gray-300 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSku.map((item, index) => (
                        <tr key={item.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                            <td className="px-4 py-3 border-b border-gray-200">{item.id}</td>
                            <td className="px-4 py-3 border-b border-gray-200">{item.label}</td>
                            <td className="px-4 py-3 border-b border-gray-200">{item.Department}</td>
                            <td className="px-4 py-3 border-b border-gray-200">$ {item.price}</td>
                            <td className="px-4 py-3 border-b border-gray-200 text-center flex justify-center ">$ {item.cost}</td>
                            <td className="px-4 py-3 border-b border-gray-200 text-center  ">
                                <button onClick={() => handleEdit(item)} className="p-2  text-black rounded-md  transition">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDelete(item)} className="py-0 px-2 text-black rounded-md  transition">
                                    <FontAwesomeIcon icon={faRemove} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl w-1/3">
                        <div className='flex justify-between mb-4'>
                            <div></div>
                            <h2 className="text-xl font-semibold text-gray-800 text-center">{modalContent}</h2>
                            <button onClick={closeModal} className='bg-gray-400 px-3 rounded-md mb-4'>
                                <FontAwesomeIcon icon={faMultiply} />
                            </button>
                        </div>
                        <div className="space-y-3">
                            <input
                                placeholder="Enter Item Name"
                                value={data?.label}
                                onChange={(e) => setData({ ...data, label: e.target.value })}
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                placeholder="Enter Department"
                                value={data?.Department}
                                onChange={(e) => setData({ ...data, Department: e.target.value })}
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                placeholder="Enter Price"
                                value={data?.price}
                                onChange={(e) => setData({ ...data, price: Number(e.target.value) })}
                                type="number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                placeholder="Enter Cost"
                                value={data?.cost}
                                onChange={(e) => setData({ ...data, cost: Number(e.target.value) })}
                                type="number"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex justify-end mt-4 space-x-3">
                            <button
                                onClick={btn ? handleSubmit : handleUpdate}
                                className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
                            >
                                {btn ? "Submit" : "Update"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function Sku() {
    return (
        <>
            <SideBar mainData={<ChildSku />} />
        </>
    );
}

export default Sku;