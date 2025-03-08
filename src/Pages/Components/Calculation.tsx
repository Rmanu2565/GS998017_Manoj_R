import React, { useReducer, useState, useMemo, useEffect } from 'react';
import SideBar from '../../Common/Common_Folders/SideBar';
import { storesData } from '../File/store';
import { storeReducer } from '../Reducer/storeReducer';
import { skuReducer } from '../Reducer/skuReducer';
import { skuData } from '../File/skuFile';
import { planningReducer } from '../Reducer/planningReducer';
import { planningData } from '../File/planning';

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
  const [planning] = useReducer(planningReducer, planningData);
  const [planData, setPlanData] = useState(planning)
  // Generate an array of 5 random numbers only once
  const randomNumbers = useMemo(() => {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 100) + 1);
  }, []);

  useEffect(() => {
    let arr = [];

    for (let i = 0; i < planning.length; i++) {
      // Filter items that match the SKU
      let res = state.originalSku.filter(item => item.id === planning[i].SKU);

      if (res.length > 0) {
        arr.push({
          ...planning[i],
          price: res[0].price,
          cost: res[0].cost
        });
      }
    }
    setPlanData(arr);
  }, [planning]);

  useEffect(() => {
    console.log(planData, "planData")
  }, [planData])


  return (
    <>
      <h1>Child Calculation</h1>
      <table className="w-full border-collapse mt-3">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left">
            <th className="px-4 py-3 border-b border-gray-300 text-center">Store</th>
            <th className="px-4 py-3 border-b border-gray-300 text-center">SKU</th>
            <th className="px-4 py-3 border-b border-gray-300 text-center">Price</th>
            <th className="px-4 py-3 border-b border-gray-300 text-center">Week</th>
            <th className="px-4 py-3 border-b border-gray-300 text-center">Sales Units</th>
            <th className="px-4 py-3 border-b border-gray-300 text-center">Sales Dollars</th>
            <th className="px-4 py-3 border-b border-gray-300 text-center">GM Dollars</th>
            <th className="px-4 py-3 border-b border-gray-300 text-center">GM %</th>
          </tr>
        </thead>
        <tbody>
          {state.store.map((storeItem, index) => {

            const skuItem = state.originalSku[index]
            const plan = planData[index]

            return (
              <tr key={`row-${index}`} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-3 border-b border-gray-200 text-center">ST035</td>
                <td className="px-4 py-3 border-b border-gray-200 text-center">{plan.SKU}</td>
                <td className="px-4 py-3 border-b border-gray-200 text-center">{plan.price}</td>
                <td className="px-4 py-3 border-b border-gray-200 text-center">{plan.Week}</td>
                <td className="px-4 py-3 border-b border-gray-200 text-center">{plan.Sales}</td>
                <td className="px-4 py-3 border-b border-gray-200 text-center">{(plan.Sales * plan.price).toFixed(2)}</td>
                <td className="px-4 py-3 border-b border-gray-200 text-center">{((plan.Sales * plan.price) - (plan.cost * plan.Sales)).toFixed(2)}</td>
                <td
                  className={`px-4 py-3 border-b border-gray-200 text-center ${(((plan.Sales * plan.price - plan.cost * plan.Sales) / (plan.Sales * plan.price)) * 100) >= 40
                    ? "bg-green-400 text-white font-bold"
                    : (((plan.Sales * plan.price - plan.cost * plan.Sales) / (plan.Sales * plan.price)) * 100) >= 10
                      ? "bg-yellow-400 text-black font-bold"
                      : (((plan.Sales * plan.price - plan.cost * plan.Sales) / (plan.Sales * plan.price)) * 100) > 5
                        ? "bg-orange-400 text-white font-bold"
                        : "bg-red-400 text-white font-bold"
                    }`}
                >
                  {plan.Sales && plan.price
                    ? (((plan.Sales * plan.price - plan.cost * plan.Sales) / (plan.Sales * plan.price)) * 100).toFixed(2) + " %"
                    : 0}
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
