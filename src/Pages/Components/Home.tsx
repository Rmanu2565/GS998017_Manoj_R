import React, { useReducer, useState, useEffect } from 'react';
import SideBar from '../../Common/Common_Folders/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faEdit, faRemove, faMultiply } from '@fortawesome/free-solid-svg-icons';
import { storesData } from '../File/store'; 
import { storeReducer, Store, StoreAction } from '../Reducer/storeReducer'; 

function ChildHome() {
    const [store, dispatch] = useReducer(storeReducer, storesData); 
    const [data, setData] = useState<Store>({ id: "", Label: "", City: "", State: "" });
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [btn, setBtn] = useState(true);

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
        setData({ id: "", Label: "", City: "", State: "" });
    };

    function handleSubmit() {
        if (data.Label && data.City && data.State) {
            dispatch({ type: 'ADD_STORE', payload: data });
            closeModal();
        } else {
            alert("Please fill in all fields.");
        }
    }

    function handleEdit(tr: Store) {
        openModal("Edit Store");
        setData(tr);
    }

    const handleUpdate = () => {
        dispatch({ type: 'EDIT_STORE', payload: data });
        closeModal();
    };

    const handleDelete = (res: Store) => {
        dispatch({ type: 'DELETE_STORE', payload: { id: res.id } });
    };

    const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

    const handleDragStart = (index: number) => {
        setDraggedItemIndex(index);
    };

    const handleDragOver = (event: React.DragEvent<HTMLTableRowElement>) => {
        event.preventDefault();
    };

    const handleDrop = (index: number) => {
        if (draggedItemIndex === null || draggedItemIndex === index) return;
        const newStore = [...store];
        const draggedItem = newStore.splice(draggedItemIndex, 1)[0];
        newStore.splice(index, 0, draggedItem);
        dispatch({ type: 'SET_STORES', payload: newStore });
        setDraggedItemIndex(null);
    };

    return (
        <>
            <div className='flex justify-end'>
                <button onClick={() => openModal("Add Store")} className="p-2 float-right px-2 border-[1px] bg-black text-white rounded-md font-semibold transition">
                    Add Store<FontAwesomeIcon className='pl-2' icon={faAdd} />
                </button>
            </div>
            <table className="w-full border-collapse mt-3">
                <thead>
                    <tr className="bg-gray-100 text-gray-700 text-left">
                        <th className="px-4 py-3 border-b border-gray-300">Store ID</th>
                        <th className="px-4 py-3 border-b border-gray-300">Store Name</th>
                        <th className="px-4 py-3 border-b border-gray-300">Location</th>
                        <th className="px-4 py-3 border-b border-gray-300">State</th>
                        <th className="px-4 py-3 border-b border-gray-300 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {store.map((item, index) => (
                        <tr
                            key={item.id}
                            className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(index)}
                        >
                            <td className="px-4 py-3 border-b border-gray-200">{item.id}</td>
                            <td className="px-4 py-3 border-b border-gray-200">{item.Label}</td>
                            <td className="px-4 py-3 border-b border-gray-200">{item.City}</td>
                            <td className="px-4 py-3 border-b border-gray-200">{item.State}</td>
                            <td className="px-4 py-3 border-b border-gray-200 text-center flex justify-center gap-3">
                                <button onClick={() => handleEdit(item)} className="p-2 text-black rounded-md transition">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button onClick={() => handleDelete(item)} className="py-0 px-2 text-black rounded-md transition">
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
                                placeholder="Enter Store ID"
                                value={data?.id}
                                disabled={!btn}
                                onChange={(e) => setData({ ...data, id: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                placeholder="Enter Store Name"
                                value={data?.Label}
                                onChange={(e) => setData({ ...data, Label: e.target.value })}
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                placeholder="Enter Store Location"
                                value={data?.City}
                                onChange={(e) => setData({ ...data, City: e.target.value })}
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                placeholder="Enter Store State"
                                value={data?.State}
                                onChange={(e) => setData({ ...data, State: e.target.value })}
                                type="text"
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

const Home = () => {
    return (
        <>
            <SideBar mainData={<ChildHome />} />
        </>
    );
};

export default Home;