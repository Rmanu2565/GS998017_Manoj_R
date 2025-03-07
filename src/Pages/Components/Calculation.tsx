import React from 'react'

const Calculation = () => {
  return (
    <div>Calculation</div>
  )
}

export default Calculation


// import { useSelector } from "react-redux";
// import SideBar from "../../Common/Common_Folders/SideBar";
// import { storesData } from "../File/store";
// import { RootStateOrAny } from "react-redux";

// interface SKUData {
//     id: string;
//     label: string;
//     Department: string;
//     price: number;
//     cost: number;
// }

// interface StoreData {
//     id: string;
//     Label: string;
//     City: string;
//     State: string;
// }

// interface CombinedData extends SKUData {
//     storeId: string;
//     storeLabel: string;
//     storeCity: string;
//     storeState: string;
// }

// interface TableRow extends CombinedData {
//     salesUnits: number;
//     salesDollars: number;
//     gmDollars: number;
//     gmPercentage: number;
// }

// const ChildFinancialTable: React.FC<{ combinedData: CombinedData[] }> = ({ combinedData }) => {
//     const generateTableData = (data: CombinedData[]): TableRow[] => {
//         return data.map((item) => {
//             const salesUnits = Math.floor(Math.random() * 100) + 1;
//             const salesDollars = salesUnits * item.price;
//             const gmDollars = salesDollars - (salesUnits * item.cost);
//             const gmPercentage = salesDollars > 0 ? (gmDollars / salesDollars) : 0;

//             return {
//                 ...item,
//                 salesUnits,
//                 salesDollars,
//                 gmDollars,
//                 gmPercentage,
//             };
//         });
//     };

//     const getGMColor = (percentage: number) => {
//         const value = percentage * 100;
//         if (value >= 40) return '#d4edda';
//         if (value >= 10) return '#fff3cd';
//         if (value > 5) return '#ffe5d0';
//         return '#f8d7da';
//     };

//     const tableData = generateTableData(combinedData);

//     return (
//         <div style={{ margin: '20px', overflowX: 'auto' }}>
//             <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                 <thead>
//                     <tr style={{ backgroundColor: '#f8f9fa' }}>
//                         {/* Store Columns */}
//                         <th style={tableHeaderStyle}>Store ID</th>
//                         <th style={tableHeaderStyle}>Store Label</th>
//                         <th style={tableHeaderStyle}>City</th>
//                         <th style={tableHeaderStyle}>State</th>
//                         {/* SKU Columns */}
//                         <th style={tableHeaderStyle}>SKU ID</th>
//                         <th style={tableHeaderStyle}>Label</th>
//                         <th style={tableHeaderStyle}>Department</th>
//                         <th style={tableHeaderStyle}>Price</th>
//                         <th style={tableHeaderStyle}>Cost</th>
//                         <th style={tableHeaderStyle}>Sales Units</th>
//                         <th style={tableHeaderStyle}>Sales Dollars</th>
//                         <th style={tableHeaderStyle}>GM Dollars</th>
//                         <th style={tableHeaderStyle}>GM%</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         tableData.map((row) => (
//                             <tr key={`${row.storeId}-${row.id}`} style={{ borderBottom: '1px solid #dee2e6' }}>
//                                 {/* Store Data */}
//                                 <td style={tableCellStyle}>{row.storeId}</td>
//                                 <td style={tableCellStyle}>{row.storeLabel}</td>
//                                 <td style={tableCellStyle}>{row.storeCity}</td>
//                                 <td style={tableCellStyle}>{row.storeState}</td>
//                                 {/* SKU Data */}
//                                 <td style={tableCellStyle}>{row.id}</td>
//                                 <td style={tableCellStyle}>{row.label}</td>
//                                 <td style={tableCellStyle}>{row.Department}</td>
//                                 <td style={tableCellStyle}>{row.price.toFixed(2)}</td>
//                                 <td style={tableCellStyle}>{row.cost.toFixed(2)}</td>
//                                 <td style={tableCellStyle}>{row.salesUnits}</td>
//                                 <td style={tableCellStyle}>${row.salesDollars.toFixed(2)}</td>
//                                 <td style={tableCellStyle}>${row.gmDollars.toFixed(2)}</td>
//                                 <td style={{
//                                     ...tableCellStyle,
//                                     backgroundColor: getGMColor(row.gmPercentage),
//                                     fontWeight: 500
//                                 }}>
//                                     {(row.gmPercentage * 100).toFixed(2)}%
//                                 </td>
//                             </tr>
//                         ))
//                     }
//                 </tbody>
//             </table>
//         </div >
//     );
// };

// const FinancialTable = () => {
//     const skuData: SKUData[] = useSelector((state: RootStateOrAny) => state.skuData);

//     // Combine each store with all SKUs
//     const combinedData = storesData.flatMap(store =>
//         skuData.map((sku: SKUData) => ({
//             storeId: store.id,
//             storeLabel: store.Label,
//             storeCity: store.City,
//             storeState: store.State,
//             ...sku
//         }))
//     );

//     return (
//         <SideBar mainData={<ChildFinancialTable combinedData={combinedData} />} />
//     );
// };


// const tableHeaderStyle: React.CSSProperties = {
//     padding: '12px 15px',
//     textAlign: 'left',
//     fontSize: '14px',
//     fontWeight: 600,
//     color: '#495057',
// };

// const tableCellStyle: React.CSSProperties = {
//     padding: '10px 15px',
//     fontSize: '14px',
//     color: '#212529',
// };

// // Keep the style constants the same