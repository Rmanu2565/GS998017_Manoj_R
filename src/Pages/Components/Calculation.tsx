import React, { useReducer, useState, useMemo } from 'react';
import SideBar from '../../Common/Common_Folders/SideBar';
import { storesData } from '../File/store';
import { storeReducer } from '../Reducer/storeReducer';
import { skuReducer } from '../Reducer/skuReducer';
import { skuData } from '../File/skuFile';

// Root reducer combining store and SKU reducers
const rootReducer = (state: any, action: any) => {
  return {
    store: storeReducer(state.store, action),
    originalSku: skuReducer(state.originalSku, action),
  };
};

const initialState = {
  store: storesData,
  originalSku: skuData,
};

const ChildCalculation = () => {
  const [state] = useReducer(rootReducer, initialState);

  // Generate an array of 5 random numbers only once
  const randomNumbers = useMemo(() => {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 100) + 1);
  }, []);

  console.log(randomNumbers, "Random Numbers");

  return (
    <>
      <h1>Child Calculation</h1>
      <table className="w-full border-collapse mt-3">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left">
            <th className="px-4 py-3 border-b border-gray-300 text-center">Store</th>
            <th className="px-4 py-3 border-b border-gray-300 text-center">SKU</th>
            <th className="px-4 py-3 border-b border-gray-300 text-center">Price</th>
            <th className="px-4 py-3 border-b border-gray-300 text-center">Sales Units</th>
            <th className="px-4 py-3 border-b border-gray-300 text-center">Sales Dollars</th>
            <th className="px-4 py-3 border-b border-gray-300 text-center">GM Dollars</th>
            <th className="px-4 py-3 border-b border-gray-300 text-center">GM %</th>
          </tr>
        </thead>
        <tbody>
          {state.store.map((storeItem, index) => {
            const skuItem = state.originalSku[index] || {};
            const salesUnits = randomNumbers[index] || 0; // Ensure there's always a number

            return (
              <tr key={`row-${index}`} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-3 border-b border-gray-200 text-center">{storeItem.id}</td>
                <td className="px-4 py-3 border-b border-gray-200 text-center">{skuItem.id || 'N/A'}</td>
                <td className="px-4 py-3 border-b border-gray-200 text-center">{skuItem.price || 'N/A'}</td>
                <td className="px-4 py-3 border-b border-gray-200 text-center">{salesUnits}</td>
                <td className="px-4 py-3 border-b border-gray-200 text-center">{(salesUnits * skuItem.price).toFixed(2)}</td>
                <td className="px-4 py-3 border-b border-gray-200 text-center">{((salesUnits * skuItem.price) - (skuItem.cost * salesUnits)).toFixed(2)}</td>
                <td
                  className={`px-4 py-3 border-b border-gray-200 text-center ${ (((salesUnits * skuItem.price - skuItem.cost * salesUnits) / (salesUnits * skuItem.price)) * 100) >= 40
                        ? "bg-green-400 text-white font-bold" 
                        : (((salesUnits * skuItem.price - skuItem.cost * salesUnits) / (salesUnits * skuItem.price)) * 100) >= 10
                          ? "bg-yellow-400 text-black font-bold" 
                          : (((salesUnits * skuItem.price - skuItem.cost * salesUnits) / (salesUnits * skuItem.price)) * 100) > 5
                            ? "bg-orange-400 text-white font-bold" 
                            : "bg-red-400 text-white font-bold" 
                    }`}
                >
                  {salesUnits && skuItem.price
                    ? (((salesUnits * skuItem.price - skuItem.cost * salesUnits) / (salesUnits * skuItem.price)) * 100).toFixed(2) + " %"
                    : "N/A"}
                </td>

              </tr>
            );
          })}
        </tbody>
      </table >
    </>
  );
};

function Calculation() {
  return (
    <>
      <SideBar mainData={<ChildCalculation />} />
    </>
  );
}

export default Calculation;
